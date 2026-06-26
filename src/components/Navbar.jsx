import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        <h2 className="logo">📱 SmartStore</h2>

        <div className="menu">
          <Link to="/">Home</Link>
          <Link to="/compare">Compare</Link>
          <Link to="/flagships">Flagships</Link>
          <Link to="/reviews">Reviews</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/cart">🛒 Cart</Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;