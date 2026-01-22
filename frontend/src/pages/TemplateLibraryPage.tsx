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
      {error && <p>{error}</p>}
      {templates.length === 0 ? (
        <EmptyState
          title="No templates yet"
          description="Templates will appear here once loaded."
        />
      ) : (
        <div className="template-grid">
          {templates.map((template) => (
            <div key={template.id} className="template-card">
              <h2>{template.name}</h2>
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
