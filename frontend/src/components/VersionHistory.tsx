import type { DraftVersionResponse } from "../services/draftsService";

interface VersionHistoryProps {
  versions: DraftVersionResponse[];
  onRestore: (version: DraftVersionResponse) => void;
}

const VersionHistory = ({ versions, onRestore }: VersionHistoryProps) => {
  if (versions.length === 0) {
    return <p>No versions saved yet.</p>;
  }

  return (
    <section className="version-history">
      <h3>Versions</h3>
      <ul>
        {versions.map((version) => (
          <li key={version.id}>
            <span>Version {version.versionNumber}</span>
            <button type="button" onClick={() => onRestore(version)}>
              Restore
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default VersionHistory;
