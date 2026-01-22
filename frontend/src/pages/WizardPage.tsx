import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import WizardShell from "../components/WizardShell";
import WizardStep from "../components/WizardStep";
import LetterPreview from "../components/LetterPreview";
import OutputActions from "../components/OutputActions";
import ToneControls from "../components/ToneControls";
import TrustSafetyNote from "../components/TrustSafetyNote";
import { getTemplate, type TemplateResponse } from "../services/templatesService";
import { createWizardSession, updateWizardSession } from "../services/wizardService";
import { fetchWizardPreviewWithTone } from "../services/previewService";
import {
  createDraft,
  createDraftVersion,
  getDraft,
  requestOutput,
  updateDraft
} from "../services/draftsService";
import { composeDraft } from "../services/apiClient";
import type { ToneControl } from "../types";

const WizardPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const templateId = searchParams.get("templateId");
  const draftIdParam = searchParams.get("draftId");

  const [template, setTemplate] = useState<TemplateResponse | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [flowStep, setFlowStep] = useState(0);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [facts, setFacts] = useState<Record<string, string>>({});
  const [missingInfo, setMissingInfo] = useState<string[]>([]);
  const [ambiguities, setAmbiguities] = useState<string[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [subjectLine, setSubjectLine] = useState<string>("");
  const [previewText, setPreviewText] = useState<string>("");
  const [previewHistory, setPreviewHistory] = useState<string[]>([]);
  const [draftId, setDraftId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [outputMessage, setOutputMessage] = useState<string | null>(null);

  const requiredFields = useMemo(() => template?.requiredFields ?? [], [template]);
  const allFields = useMemo(
    () => [...requiredFields, ...(template?.optionalFields ?? [])],
    [requiredFields, template]
  );

  const factItems = useMemo(
    () =>
      allFields
        .filter((field) => facts[field.id])
        .map((field) => ({
          id: field.id,
          label: field.label,
          value: facts[field.id],
          required: field.required
        })),
    [allFields, facts]
  );

  useEffect(() => {
    const load = async () => {
      try {
        if (draftIdParam) {
          const draft = await getDraft(draftIdParam);
          const templateResponse = await getTemplate(draft.templateId);
          setTemplate(templateResponse);
          setDraftId(draft.id);

          const draftData = draft.data as Record<string, unknown>;
          const extractedFacts =
            (draftData.extractedFacts as Record<string, string> | undefined) ?? {};
          const fallbackFacts: Record<string, string> = {};
          for (const field of [...templateResponse.requiredFields, ...templateResponse.optionalFields]) {
            const value = draftData[field.id];
            if (typeof value === "string" && value.trim()) {
              fallbackFacts[field.id] = value;
            }
          }

          const resolvedFacts =
            Object.keys(extractedFacts).length > 0 ? extractedFacts : fallbackFacts;

          setFacts(resolvedFacts);
          setFieldValues(() => {
            const nextValues: Record<string, string> = {};
            for (const field of templateResponse.requiredFields) {
              const value = resolvedFacts[field.id];
              if (value) {
                nextValues[field.id] = value;
              }
            }
            return nextValues;
          });
          setMissingInfo(
            Array.isArray(draftData.missingInfo)
              ? (draftData.missingInfo as string[])
              : []
          );
          setAmbiguities(
            Array.isArray(draftData.ambiguities)
              ? (draftData.ambiguities as string[])
              : []
          );
          setWarnings(
            Array.isArray(draftData.warnings) ? (draftData.warnings as string[]) : []
          );
          setSubjectLine(
            typeof draftData.subjectLine === "string" ? draftData.subjectLine : ""
          );
          setFlowStep(1);

          const session = await createWizardSession(draft.templateId);
          setSessionId(session.id);
          await updateWizardSession(session.id, {
            data: {
              extractedFacts: resolvedFacts,
              missingInfo: Array.isArray(draftData.missingInfo)
                ? (draftData.missingInfo as string[])
                : [],
              ambiguities: Array.isArray(draftData.ambiguities)
                ? (draftData.ambiguities as string[])
                : [],
              warnings: Array.isArray(draftData.warnings)
                ? (draftData.warnings as string[])
                : [],
              subjectLine:
                typeof draftData.subjectLine === "string" ? draftData.subjectLine : "",
              draftBody:
                typeof draftData.draftBody === "string" ? draftData.draftBody : "",
              ...resolvedFacts
            },
            currentStep: 2,
            status: "in_progress"
          });

          if (draft.previewText) {
            setPreviewText(draft.previewText);
            setPreviewHistory([draft.previewText]);
          }
          return;
        }

        if (!templateId) {
          return;
        }

        const templateResponse = await getTemplate(templateId);
        setTemplate(templateResponse);
        const session = await createWizardSession(templateId);
        setSessionId(session.id);
      } catch {
        setError("Unable to start the wizard. Please try again.");
      }
    };

    load();
  }, [templateId, draftIdParam]);

  const stepLabel = previewText
    ? "Draft ready"
    : `Step ${flowStep + 1} of 2`;

  const handleGenerateFacts = async () => {
    if (!template || !sessionId) {
      return;
    }

    const collectedFacts: Record<string, string> = {};
    const missing: string[] = [];

    for (const field of requiredFields) {
      const value = fieldValues[field.id]?.trim() ?? "";
      if (!value) {
        missing.push(field.label);
      } else {
        collectedFacts[field.id] = value;
      }
    }

    if (missing.length > 0) {
      setError("Please fill out all required fields before continuing.");
    } else {
      setError(null);
    }

    setFacts(collectedFacts);
    setMissingInfo(missing);
    setAmbiguities([]);
    setWarnings([]);
    setFlowStep(1);

    await updateWizardSession(sessionId, {
      currentStep: 2,
      data: {
        extractedFacts: collectedFacts,
        missingInfo: missing,
        ambiguities: [],
        warnings: [],
        ...collectedFacts
      }
    });
  };

  const handleComposeDraft = async () => {
    if (!template || !sessionId) {
      return;
    }

    const composition = await composeDraft(template.id, facts, "none");
    setSubjectLine(composition.subjectLine);
    setPreviewText(composition.previewText);
    setPreviewHistory([composition.previewText]);

    await updateWizardSession(sessionId, {
      status: "completed",
      data: {
        extractedFacts: facts,
        missingInfo,
        ambiguities,
        warnings,
        subjectLine: composition.subjectLine,
        draftBody: composition.body,
        ...facts
      }
    });

    const draftData = {
      ...facts,
      extractedFacts: facts,
      missingInfo,
      ambiguities,
      warnings,
      subjectLine: composition.subjectLine,
      draftBody: composition.body
    };

    if (draftId) {
      await updateDraft(draftId, {
        data: draftData,
        previewText: composition.previewText
      });
    } else {
      const draft = await createDraft({
        templateId: template.id,
        title: `${template.name} - ${new Date().toLocaleDateString()}`,
        data: draftData,
        previewText: composition.previewText
      });
      setDraftId(draft.id);
    }
  };

  const handleOutput = async (method: "print" | "pdf" | "copy" | "email") => {
    setOutputMessage(null);
    if (!draftId) {
      return;
    }

    if (method === "print" || method === "pdf") {
      window.print();
      await requestOutput(draftId, method);
      setOutputMessage("Print dialog opened. Please complete the print or save.");
      return;
    }

    if (method === "copy") {
      await navigator.clipboard.writeText(previewText);
      await requestOutput(draftId, method);
      setOutputMessage("Copied to clipboard.");
      return;
    }

    if (method === "email") {
      const destination = window.prompt("Enter the email address to send to:") ?? "";
      if (!destination.trim()) {
        setOutputMessage("Email address is required for sending.");
        return;
      }
      const response = await requestOutput(draftId, method, destination);
      setOutputMessage(
        response.status === "success"
          ? `Email queued to ${destination}.`
          : "Email failed. Please try another output method."
      );
    }
  };

  const handleToneChange = async (tone: Exclude<ToneControl, "none">) => {
    if (!sessionId) {
      return;
    }
    const preview = await fetchWizardPreviewWithTone(sessionId, tone);
    setPreviewHistory((prev) => [...prev, preview.previewText]);
    setPreviewText(preview.previewText);
    if (draftId) {
      await updateDraft(draftId, { previewText: preview.previewText });
    }
  };

  const handleUndo = () => {
    setPreviewHistory((prev) => {
      if (prev.length <= 1) {
        return prev;
      }
      const nextHistory = prev.slice(0, -1);
      setPreviewText(nextHistory[nextHistory.length - 1]);
      return nextHistory;
    });
  };

  if (!templateId && !draftIdParam) {
    return (
      <main className="page">
        <h1>Letter wizard</h1>
        <p>Please choose a letter type to begin.</p>
        <Link to="/templates">Go to templates</Link>
      </main>
    );
  }

  if (!template) {
    return (
      <main className="page">
        <h1>Letter wizard</h1>
        <p>Loading template...</p>
      </main>
    );
  }

  return (
    <main className="page">
      <WizardShell
        title={template.name}
        stepLabel={stepLabel}
      >
        {error && <p>{error}</p>}
        {!previewText && flowStep === 0 && (
          <div className="wizard-step-panel">
            <h2>Required information</h2>
            {requiredFields.map((field) => (
              <WizardStep
                key={field.id}
                field={field}
                value={fieldValues[field.id] ?? ""}
                onChange={(value) =>
                  setFieldValues((prev) => ({
                    ...prev,
                    [field.id]: value
                  }))
                }
                compact
              />
            ))}
          </div>
        )}
        {!previewText && flowStep === 1 && (
          <WizardStep
            facts={factItems}
            missingInfo={missingInfo}
            ambiguities={ambiguities}
            warnings={warnings}
          />
        )}
        {!previewText && (
          <div className="wizard-actions">
            <button type="button" onClick={() => navigate("/templates")}>Cancel</button>
            {flowStep > 0 && (
              <button type="button" onClick={() => setFlowStep((step) => step - 1)}>
                Back
              </button>
            )}
            {flowStep === 0 ? (
              <button type="button" onClick={handleGenerateFacts}>
                Generate facts
              </button>
            ) : (
              <button type="button" onClick={handleComposeDraft}>
                Draft letter
              </button>
            )}
          </div>
        )}
        {previewText && (
          <>
            <LetterPreview previewText={previewText} subjectLine={subjectLine} />
            <ToneControls
              onToneChange={handleToneChange}
              onUndo={handleUndo}
              canUndo={previewHistory.length > 1}
            />
            <TrustSafetyNote />
            <OutputActions
              onOutput={handleOutput}
              onSaveVersion={
                draftId
                  ? async () => {
                      await createDraftVersion(draftId);
                      setOutputMessage("Version saved.");
                    }
                  : undefined
              }
            />
            {outputMessage && <p>{outputMessage}</p>}
            <button
              type="button"
              onClick={() => {
                setPreviewText("");
                setPreviewHistory([]);
                setOutputMessage(null);
                setFlowStep(1);
              }}
            >
              Edit details
            </button>
          </>
        )}
      </WizardShell>
    </main>
  );
};

export default WizardPage;
