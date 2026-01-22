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
import { fetchWizardPreviewWithTone, type ToneControl } from "../services/previewService";
import {
  createDraft,
  createDraftVersion,
  getDraft,
  requestOutput,
  updateDraft
} from "../services/draftsService";

const WizardPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const templateId = searchParams.get("templateId");
  const draftIdParam = searchParams.get("draftId");

  const [template, setTemplate] = useState<TemplateResponse | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<Record<string, string>>({});
  const [previewText, setPreviewText] = useState<string>("");
  const [previewHistory, setPreviewHistory] = useState<string[]>([]);
  const [draftId, setDraftId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [outputMessage, setOutputMessage] = useState<string | null>(null);

  const requiredFields = useMemo(() => template?.requiredFields ?? [], [template]);

  useEffect(() => {
    const load = async () => {
      try {
        if (draftIdParam) {
          const draft = await getDraft(draftIdParam);
          const templateResponse = await getTemplate(draft.templateId);
          setTemplate(templateResponse);
          setData(draft.data as Record<string, string>);
          setDraftId(draft.id);

          const firstMissingIndex = templateResponse.requiredFields.findIndex(
            (field) => !(draft.data as Record<string, string>)[field.id]
          );
          setCurrentStep(firstMissingIndex === -1 ? 0 : firstMissingIndex);

          const session = await createWizardSession(draft.templateId);
          setSessionId(session.id);
          await updateWizardSession(session.id, {
            data: draft.data,
            currentStep: 1,
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

  const currentField = requiredFields[currentStep];
  const isLastStep = currentStep >= requiredFields.length - 1;

  const handleNext = async () => {
    if (!currentField) {
      return;
    }

    const value = data[currentField.id] ?? "";
    if (currentField.required && value.trim() === "") {
      setError("Please enter the required information before continuing.");
      return;
    }

    setError(null);
    const nextStep = Math.min(currentStep + 1, requiredFields.length - 1);

    if (sessionId) {
      await updateWizardSession(sessionId, {
        currentStep: nextStep + 1,
        data
      });
    }

    if (isLastStep) {
      await finishWizard();
    } else {
      setCurrentStep(nextStep);
    }
  };

  const finishWizard = async () => {
    if (!sessionId || !template) {
      return;
    }

    await updateWizardSession(sessionId, {
      status: "completed",
      data
    });

    const preview = await fetchWizardPreviewWithTone(sessionId, "none");
    setPreviewText(preview.previewText);
    setPreviewHistory([preview.previewText]);

    if (draftId) {
      await updateDraft(draftId, {
        data,
        previewText: preview.previewText
      });
    } else {
      const draft = await createDraft({
        templateId: template.id,
        title: `${template.name} - ${new Date().toLocaleDateString()}`,
        data,
        previewText: preview.previewText
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
        stepLabel={`Step ${Math.min(currentStep + 1, requiredFields.length)} of ${
          requiredFields.length
        }`}
      >
        {error && <p>{error}</p>}
        {currentField && !previewText && (
          <WizardStep
            field={currentField}
            value={data[currentField.id] ?? ""}
            onChange={(value) =>
              setData((prev) => ({
                ...prev,
                [currentField.id]: value
              }))
            }
          />
        )}
        {!previewText && (
          <div className="wizard-actions">
            <button type="button" onClick={() => navigate("/templates")}>Cancel</button>
            {currentStep > 0 && (
              <button type="button" onClick={() => setCurrentStep((step) => step - 1)}>
                Back
              </button>
            )}
            <button type="button" onClick={handleNext}>
              {isLastStep ? "Finish" : "Next"}
            </button>
          </div>
        )}
        {previewText && (
          <>
            <LetterPreview previewText={previewText} />
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
