import { Routes, Route, Navigate } from "react-router-dom";
import TemplateLibraryPage from "./pages/TemplateLibraryPage";
import WizardPage from "./pages/WizardPage";
import DraftsPage from "./pages/DraftsPage";
import MenuBar from "./components/MenuBar";

const App = () => {
  return (
    <div className="app-shell">
      <MenuBar />
      <Routes>
        <Route path="/" element={<Navigate to="/templates" replace />} />
        <Route path="/templates" element={<TemplateLibraryPage />} />
        <Route path="/wizard" element={<WizardPage />} />
        <Route path="/drafts" element={<DraftsPage />} />
      </Routes>
    </div>
  );
};

export default App;
