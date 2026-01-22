interface LetterPreviewProps {
  previewText: string;
}

const LetterPreview = ({ previewText }: LetterPreviewProps) => {
  return (
    <section className="letter-preview">
      <h2>Preview</h2>
      <pre>{previewText}</pre>
    </section>
  );
};

export default LetterPreview;
