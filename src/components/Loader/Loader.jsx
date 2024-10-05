import { ColorRing } from "react-loader-spinner";
import s from "./Loader.module.css";
const Loader = () => {
  return (
    <div className={s.loaderWrapper}>
      <ColorRing
        visible={true}
        height="140"
        width="140"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#ff0000", "#000000", "#ff0000", "#000000", "#ff0000"]}
      />
    </div>
  );
};

export default Loader;
