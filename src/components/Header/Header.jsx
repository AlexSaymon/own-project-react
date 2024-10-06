import Navigation from "../Navigation/Navigation";
import s from "./Header.module.css";

const Header = ({ handleChangeQuery }) => {
  return (
    <div className={s.container}>
      <Navigation handleChangeQuery={handleChangeQuery} />
    </div>
  );
};

export default Header;
