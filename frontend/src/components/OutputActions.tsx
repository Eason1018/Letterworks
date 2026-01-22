import { useState } from "react";
import OutputConfirmDialog from "./OutputConfirmDialog";

interface OutputActionsProps {
  onOutput: (method: "print" | "pdf" | "copy" | "email") => void;
  onSaveVersion?: () => void;
}

const OutputActions = ({ onOutput, onSaveVersion }: OutputActionsProps) => {
  const [pendingMethod, setPendingMethod] = useState<
    "print" | "pdf" | "copy" | "email" | null
  >(null);

  return (
    <section className="output-actions">
      <h2>Finish</h2>
      <div className="output-buttons">
        {(["print", "pdf", "copy", "email"] as const).map((method) => (
          <button key={method} type="button" onClick={() => setPendingMethod(method)}>
            {method.toUpperCase()}
          </button>
        ))}
        {onSaveVersion && (
          <button type="button" onClick={onSaveVersion}>
            Save version
          </button>
        )}
      </div>
      {pendingMethod && (
        <OutputConfirmDialog
          message={`Confirm ${pendingMethod.toUpperCase()} output?`}
          onConfirm={() => {
            onOutput(pendingMethod);
            setPendingMethod(null);
          }}
          onCancel={() => setPendingMethod(null)}
        />
      )}
    </section>
  );
};

export default OutputActions;
