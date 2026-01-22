interface OutputConfirmDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const OutputConfirmDialog = ({ message, onConfirm, onCancel }: OutputConfirmDialogProps) => {
  return (
    <div className="confirm-dialog">
      <p>{message}</p>
      <div className="confirm-actions">
        <button type="button" onClick={onConfirm}>
          Confirm
        </button>
        <button type="button" onClick={onCancel} className="secondary">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OutputConfirmDialog;
