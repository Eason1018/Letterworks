import UndoButton from "./UndoButton";

interface ToneControlsProps {
  onToneChange: (tone: "politer" | "firmer" | "shorter" | "timeline" | "deadline") => void;
  onUndo: () => void;
  canUndo: boolean;
}

const ToneControls = ({ onToneChange, onUndo, canUndo }: ToneControlsProps) => {
  return (
    <section className="tone-controls">
      <h2>Adjust tone</h2>
      <div className="tone-buttons">
        <button type="button" onClick={() => onToneChange("politer")}>Politer</button>
        <button type="button" onClick={() => onToneChange("firmer")}>Firmer</button>
        <button type="button" onClick={() => onToneChange("shorter")}>Shorter</button>
        <button type="button" onClick={() => onToneChange("timeline")}>Timeline focus</button>
        <button type="button" onClick={() => onToneChange("deadline")}>Deadline focus</button>
        <UndoButton onUndo={onUndo} disabled={!canUndo} />
      </div>
    </section>
  );
};

export default ToneControls;
