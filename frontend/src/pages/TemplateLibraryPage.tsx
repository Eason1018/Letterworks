import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listTemplates, type TemplateResponse } from "../services/templatesService";
import EmptyState from "../components/EmptyState";
import { helpText } from "../content/helpText";

const TemplateLibraryPage = () => {
  const [templates, setTemplates] = useState<TemplateResponse[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listTemplates()
      .then(setTemplates)
      .catch(() => setError("Unable to load templates."));
  }, []);

  return (
    <main className="page">
      <h1>Choose a letter type</h1>
      <p>{helpText.welcome}</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {templates.length === 0 && !error ? (
        <EmptyState
          title="Loading templates..."
          description="Please wait while we load the available templates."
        />
      ) : (
        <div className="template-grid">
          {templates.map((template) => (
            <div key={template.id} className="template-card">
              <h2>{template.name}</h2>
              {template.category && <span className="category">{template.category}</span>}
              {template.description && <p>{template.description}</p>}
              <Link to={`/wizard?templateId=${template.id}`}>Start</Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default TemplateLibraryPage;
