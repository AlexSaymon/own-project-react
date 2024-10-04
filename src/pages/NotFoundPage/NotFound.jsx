import { useRef } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const goBackRef = useRef(location.state);
  return (
    <div>
      <Link to={goBackRef.current ?? "/movies"}>Go back</Link>
      <h2>404.. this page is not found</h2>
    </div>
  );
};

export default NotFound;
