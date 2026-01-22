import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  listDrafts,
  listDraftVersions,
  updateDraft,
  type DraftResponse,
  type DraftVersionResponse
} from "../services/draftsService";
import VersionHistory from "../components/VersionHistory";
import EmptyState from "../components/EmptyState";

const DraftsPage = () => {
  const [drafts, setDrafts] = useState<DraftResponse[]>([]);
  const [selectedDraftId, setSelectedDraftId] = useState<string | null>(null);
  const [versions, setVersions] = useState<DraftVersionResponse[]>([]);

  useEffect(() => {
    listDrafts().then(setDrafts);
  }, []);

  const handleSelectDraft = async (draftId: string) => {
    setSelectedDraftId(draftId);
    const list = await listDraftVersions(draftId);
    setVersions(list);
  };

  const handleRestoreVersion = async (version: DraftVersionResponse) => {
    if (!selectedDraftId) {
      return;
    }
    await updateDraft(selectedDraftId, {
      previewText: version.previewText,
      toneSettings: version.toneSettings
    });
  };

  return (
    <main className="page">
      <h1>Your drafts</h1>
      {drafts.length === 0 ? (
        <EmptyState
          title="No drafts saved"
          description="Start a letter to save your first draft."
        />
      ) : (
        <div className="drafts-grid">
          {drafts.map((draft) => (
            <div key={draft.id} className="draft-card">
              <h2>{draft.title}</h2>
              <div className="draft-actions">
                <Link to={`/wizard?draftId=${draft.id}`}>Resume</Link>
                <button type="button" onClick={() => handleSelectDraft(draft.id)}>
                  View versions
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedDraftId && (
        <VersionHistory versions={versions} onRestore={handleRestoreVersion} />
      )}
    </main>
  );
};

export default DraftsPage;
