import { NavLink } from "react-router-dom";

const MenuBar = () => {
  return (
    <header className="menu-bar">
      <div className="menu-title">LetterWorks</div>
      <nav className="menu-links">
        <NavLink to="/templates">Templates</NavLink>
        <NavLink to="/drafts">Drafts</NavLink>
      </nav>
    </header>
  );
};

export default MenuBar;
