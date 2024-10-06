import clsx from "clsx";
import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
import SearchBar from "../SearchBar/SearchBar";

const Navigation = ({ handleChangeQuery }) => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.activeLink);
  };

  return (
    <div className={s.wrapper}>
      <NavLink to="/" className={buildLinkClass}>
        Home
      </NavLink>
      <SearchBar handleChangeQuery={handleChangeQuery} />
    </div>
  );
};

export default Navigation;
