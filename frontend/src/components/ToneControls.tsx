import UndoButton from "./UndoButton";

interface ToneControlsProps {
  onToneChange: (tone: "more_polite" | "more_firm" | "make_shorter" | "fix_spelling") => void;
  onUndo: () => void;
  canUndo: boolean;
}

const ToneControls = ({ onToneChange, onUndo, canUndo }: ToneControlsProps) => {
  return (
    <section className="tone-controls">
      <h2>Adjust tone</h2>
      <div className="tone-buttons">
        <button type="button" onClick={() => onToneChange("more_polite")}>More polite</button>
        <button type="button" onClick={() => onToneChange("more_firm")}>More firm</button>
        <button type="button" onClick={() => onToneChange("make_shorter")}>Make shorter</button>
        <button type="button" onClick={() => onToneChange("fix_spelling")}>Fix spelling</button>
        <UndoButton onUndo={onUndo} disabled={!canUndo} />
      </div>
    </section>
  );
};

export default ToneControls;
