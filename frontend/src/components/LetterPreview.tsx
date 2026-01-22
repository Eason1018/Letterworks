interface LetterPreviewProps {
  previewText: string;
  subjectLine?: string;
}

const stripSubjectLine = (previewText: string, subjectLine?: string) => {
  if (!subjectLine) {
    return previewText;
  }
  const subjectPrefix = `Subject: ${subjectLine}`;
  if (previewText.startsWith(subjectPrefix)) {
    return previewText.slice(subjectPrefix.length).replace(/^\s+/, "");
  }
  return previewText;
};

const LetterPreview = ({ previewText, subjectLine }: LetterPreviewProps) => {
  const bodyText = stripSubjectLine(previewText, subjectLine);
  return (
    <section className="letter-preview">
      <h2>Preview</h2>
      {subjectLine && <p className="subject-line">Subject: {subjectLine}</p>}
      <pre>{bodyText}</pre>
    </section>
  );
};

export default LetterPreview;
