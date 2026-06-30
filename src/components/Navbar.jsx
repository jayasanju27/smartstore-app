import { Link } from "react-router-dom";
import { useState } from "react";
import {
  FaSearch,
  FaShoppingCart,
  FaHome,
  FaExchangeAlt,
  FaCrown,
  FaStar,
  FaPhoneAlt,
  FaQuestionCircle,
  FaHeart,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
  FaThLarge,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const navLinks = [
  { to: "/", label: "Home", icon: FaHome },
  { to: "/categories", label: "Categories", icon: FaThLarge },
  { to: "/compare", label: "Compare", icon: FaExchangeAlt },
  { to: "/flagships", label: "Flagships", icon: FaCrown },
  { to: "/reviews", label: "Reviews", icon: FaStar },
  { to: "/contact", label: "Contact", icon: FaPhoneAlt },
  { to: "/faq", label: "FAQ", icon: FaQuestionCircle },
];

function Navbar({ search = "", setSearch }) {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const wishlistCount =
    JSON.parse(localStorage.getItem("wishlist"))?.length || 0;

  const cartCount =
    JSON.parse(localStorage.getItem("cart"))?.length || 0;

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <Link to="/" className="logo" onClick={closeMobile}>
          📱 <span>SmartStore</span>
        </Link>

        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search smartphones..."
            value={search}
            onChange={(e) => {
              if (setSearch) {
                setSearch(e.target.value);
              }
            }}
          />
        </div>

        <div className="navbar-actions">
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            aria-label="Toggle dark mode"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>

          <Link to="/wishlist" className="wishlist-icon" onClick={closeMobile}>
            <FaHeart />
            {wishlistCount > 0 && (
              <span className="wishlist-count">{wishlistCount}</span>
            )}
          </Link>

          <Link to="/cart" className="cart" onClick={closeMobile}>
            <FaShoppingCart />
            <span className="cart-label">Cart</span>
            {cartCount > 0 && (
              <span className="cart-count">{cartCount}</span>
            )}
          </Link>

          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      <div className={`navbar-menu ${mobileOpen ? "mobile-open" : ""}`}>
        {navLinks.map(({ to, label, icon: Icon }) => (
          <Link key={to} to={to} onClick={closeMobile}>
            <Icon /> {label}
          </Link>
        ))}
      </div>

      {mobileOpen && (
        <button
          type="button"
          className="mobile-menu-overlay"
          onClick={closeMobile}
          aria-label="Close menu"
        />
      )}
    </nav>
  );
}

export default Navbar;
