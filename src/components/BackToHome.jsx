import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

function BackToHome({ className = "" }) {
  return (
    <Link to="/" className={`back-to-home ${className}`}>
      <FaHome /> Back to Home
    </Link>
  );
}

export default BackToHome;
