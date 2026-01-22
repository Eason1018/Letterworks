import type { FieldDescriptor } from "../types";

interface WizardStepProps {
  field: FieldDescriptor;
  value: string;
  onChange: (value: string) => void;
}

const WizardStep = ({ field, value, onChange }: WizardStepProps) => {
  const inputId = `field-${field.id}`;

  return (
    <div className="wizard-step-panel">
      <label htmlFor={inputId}>{field.label}</label>
      {field.type === "textarea" ? (
        <textarea
          id={inputId}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={5}
        />
      ) : (
        <input
          id={inputId}
          type={field.type === "date" ? "date" : "text"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
      {field.required && <p className="required-note">Required</p>}
    </div>
  );
};

export default WizardStep;
