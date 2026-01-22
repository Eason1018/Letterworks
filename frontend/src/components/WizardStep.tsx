interface FactItem {
  id: string;
  label: string;
  value: string;
  required?: boolean;
}

interface FieldDescriptor {
  id: string;
  label: string;
  type: "text" | "textarea" | "date" | "number" | "email" | "phone";
  required: boolean;
}

interface WizardStepProps {
  field?: FieldDescriptor;
  value?: string;
  onChange?: (value: string) => void;
  compact?: boolean;
  notesValue?: string;
  onNotesChange?: (value: string) => void;
  facts?: FactItem[];
  missingInfo?: string[];
  ambiguities?: string[];
  warnings?: string[];
}

const WizardStep = ({
  field,
  value,
  onChange,
  compact,
  notesValue,
  onNotesChange,
  facts,
  missingInfo,
  ambiguities,
  warnings
}: WizardStepProps) => {
  if (typeof notesValue === "string" && onNotesChange) {
    return (
      <div className="wizard-step-panel">
        <label htmlFor="notes-input">Your notes</label>
        <textarea
          id="notes-input"
          value={notesValue}
          onChange={(event) => onNotesChange(event.target.value)}
          rows={8}
          placeholder="Paste your notes here. Include any names, dates, and requests you want to mention."
        />
        <p className="required-note">Required</p>
      </div>
    );
  }

  if (facts) {
    return (
      <div className="wizard-step-panel">
        <h2>Facts found</h2>
        {facts.length === 0 ? (
          <p>No clear facts were found. Please add more detail to your notes.</p>
        ) : (
          <ul className="fact-list" aria-live="polite">
            {facts.map((fact) => (
              <li key={fact.id}>
                <strong>{fact.label}:</strong> {fact.value}
              </li>
            ))}
          </ul>
        )}
        {missingInfo && missingInfo.length > 0 && (
          <div className="missing-info" aria-live="polite">
            <h3>Missing information</h3>
            <ul>
              {missingInfo.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        {ambiguities && ambiguities.length > 0 && (
          <div className="missing-info" aria-live="polite">
            <h3>Needs clarification</h3>
            <ul>
              {ambiguities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        {warnings && warnings.length > 0 && (
          <div className="missing-info" aria-live="polite">
            <h3>Notes to review</h3>
            <ul>
              {warnings.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  if (!field || !onChange) {
    return null;
  }

  const inputId = `field-${field.id}`;
  const fieldContent = (
    <>
      <label htmlFor={inputId}>{field.label}</label>
      {field.type === "textarea" ? (
        <textarea
          id={inputId}
          value={value ?? ""}
          onChange={(event) => onChange(event.target.value)}
          rows={5}
        />
      ) : (
        <input
          id={inputId}
          type={field.type === "date" ? "date" : "text"}
          value={value ?? ""}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
      {field.required && <p className="required-note">Required</p>}
    </>
  );

  if (compact) {
    return <div className="wizard-field">{fieldContent}</div>;
  }

  return <div className="wizard-step-panel">{fieldContent}</div>;
};

export default WizardStep;
