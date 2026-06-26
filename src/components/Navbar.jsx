import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <div className="navbar-container">
        <h2 className="logo">📱 SmartStore</h2>

        <div
          className="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

        <div className={`menu ${menuOpen ? "active" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/compare" onClick={() => setMenuOpen(false)}>Compare</Link>
          <Link to="/flagships" onClick={() => setMenuOpen(false)}>Flagships</Link>
          <Link to="/reviews" onClick={() => setMenuOpen(false)}>Reviews</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link to="/faq" onClick={() => setMenuOpen(false)}>FAQ</Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)}>🛒 Cart</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;