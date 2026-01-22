interface UndoButtonProps {
  onUndo: () => void;
  disabled: boolean;
}

const UndoButton = ({ onUndo, disabled }: UndoButtonProps) => {
  return (
    <button type="button" onClick={onUndo} disabled={disabled}>
      Undo
    </button>
  );
};

export default UndoButton;
