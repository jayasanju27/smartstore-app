import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { smartphonesData } from "../data/smartphoneData";
import { toast } from "react-toastify";
import { FaSearch, FaExchangeAlt, FaShoppingCart, FaHeart, FaTrophy, FaChevronDown } from "react-icons/fa";

function CompareModels() {
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  
  // Search dropdown states
  const [search1, setSearch1] = useState("");
  const [search2, setSearch2] = useState("");
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);

  const firstPhone = smartphonesData.find((phone) => phone.id === phone1);
  const secondPhone = smartphonesData.find((phone) => phone.id === phone2);

  const filteredPhones1 = smartphonesData.filter((phone) =>
    phone.name.toLowerCase().includes(search1.toLowerCase())
  );

  const filteredPhones2 = smartphonesData.filter((phone) =>
    phone.name.toLowerCase().includes(search2.toLowerCase())
  );

  const getNumericValue = (str) => {
    if (!str) return 0;
    const match = str.toString().match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  const getCompareResult = (key, val1, val2) => {
    if (!firstPhone || !secondPhone) return null;
    
    let v1 = val1;
    let v2 = val2;

    if (key === "battery" || key === "camera" || key === "storage") {
      v1 = getNumericValue(val1);
      v2 = getNumericValue(val2);
    }

    if (v1 === v2) return "tie";

    if (key === "price") {
      // Lower price is better
      return v1 < v2 ? "phone1" : "phone2";
    }

    // Default: Higher is better (rating, battery, camera, storage, etc.)
    return v1 > v2 ? "phone1" : "phone2";
  };

  const addToCart = (phone) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(phone);
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success(`🛒 Added ${phone.name} to Cart!`);
  };

  const addToWishlist = (phone) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = wishlist.find((item) => item.id === phone.id);
    if (!exists) {
      wishlist.push(phone);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      toast.success(`❤️ Added ${phone.name} to Wishlist!`);
    } else {
      toast.info("Already in Wishlist");
    }
  };

  return (
    <>
      <Navbar />

      <div className="compare-page-wrapper">
        <div className="compare-header">
          <h1>Compare Smartphones</h1>
          <p>Analyze specifications side-by-side and find the winner</p>
        </div>

        <div className="compare-selectors-grid">
          {/* Selector 1 */}
          <div className="compare-search-dropdown-container">
            <div className="search-input-wrapper">
              <FaSearch className="input-search-icon" />
              <input
                type="text"
                placeholder="Search first smartphone..."
                value={search1}
                onFocus={() => setShowDropdown1(true)}
                onChange={(e) => {
                  setSearch1(e.target.value);
                  setShowDropdown1(true);
                }}
              />
              <FaChevronDown className="input-dropdown-arrow" />
            </div>
            
            {showDropdown1 && (
              <div className="compare-search-dropdown">
                {filteredPhones1.length > 0 ? (
                  filteredPhones1.map((phone) => (
                    <div
                      key={phone.id}
                      className="dropdown-item"
                      onClick={() => {
                        setPhone1(phone.id);
                        setSearch1(phone.name);
                        setShowDropdown1(false);
                      }}
                    >
                      {phone.name}
                    </div>
                  ))
                ) : (
                  <div className="dropdown-item-empty">No results found</div>
                )}
              </div>
            )}
          </div>

          <div className="compare-vs-badge">VS</div>

          {/* Selector 2 */}
          <div className="compare-search-dropdown-container">
            <div className="search-input-wrapper">
              <FaSearch className="input-search-icon" />
              <input
                type="text"
                placeholder="Search second smartphone..."
                value={search2}
                onFocus={() => setShowDropdown2(true)}
                onChange={(e) => {
                  setSearch2(e.target.value);
                  setShowDropdown2(true);
                }}
              />
              <FaChevronDown className="input-dropdown-arrow" />
            </div>
            
            {showDropdown2 && (
              <div className="compare-search-dropdown">
                {filteredPhones2.length > 0 ? (
                  filteredPhones2.map((phone) => (
                    <div
                      key={phone.id}
                      className="dropdown-item"
                      onClick={() => {
                        setPhone2(phone.id);
                        setSearch2(phone.name);
                        setShowDropdown2(false);
                      }}
                    >
                      {phone.name}
                    </div>
                  ))
                ) : (
                  <div className="dropdown-item-empty">No results found</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Click outside to close dropdowns */}
        {(showDropdown1 || showDropdown2) && (
          <div
            className="dropdown-backdrop"
            onClick={() => {
              setShowDropdown1(false);
              setShowDropdown2(false);
            }}
          />
        )}

        {firstPhone && secondPhone ? (
          <>
            {/* Visual Cards */}
            <div className="compare-cards-section">
              <div className="compare-visual-card">
                <div className="compare-visual-image-box">
                  <img src={firstPhone.image} alt={firstPhone.name} />
                </div>
                <h2>{firstPhone.name}</h2>
                <div className="compare-card-specs">
                  <p className="brand">{firstPhone.brand}</p>
                  <p className="price">₹{firstPhone.price.toLocaleString("en-IN")}</p>
                  <p className="rating">⭐ {firstPhone.rating} / 5</p>
                </div>
                <div className="compare-card-actions">
                  <button className="cart-action-btn" onClick={() => addToCart(firstPhone)}>
                    <FaShoppingCart /> Add to Cart
                  </button>
                  <button className="wishlist-action-btn" onClick={() => addToWishlist(firstPhone)}>
                    <FaHeart /> Wishlist
                  </button>
                </div>
              </div>

              <div className="compare-vs-divider">
                <div className="line"></div>
                <span>VS</span>
                <div className="line"></div>
              </div>

              <div className="compare-visual-card">
                <div className="compare-visual-image-box">
                  <img src={secondPhone.image} alt={secondPhone.name} />
                </div>
                <h2>{secondPhone.name}</h2>
                <div className="compare-card-specs">
                  <p className="brand">{secondPhone.brand}</p>
                  <p className="price">₹{secondPhone.price.toLocaleString("en-IN")}</p>
                  <p className="rating">⭐ {secondPhone.rating} / 5</p>
                </div>
                <div className="compare-card-actions">
                  <button className="cart-action-btn" onClick={() => addToCart(secondPhone)}>
                    <FaShoppingCart /> Add to Cart
                  </button>
                  <button className="wishlist-action-btn" onClick={() => addToWishlist(secondPhone)}>
                    <FaHeart /> Wishlist
                  </button>
                </div>
              </div>
            </div>

            {/* Spec Matrix Table */}
            <div className="compare-matrix-container">
              <h2>Specification Comparison</h2>
              <table className="compare-matrix-table">
                <thead>
                  <tr>
                    <th>Specification</th>
                    <th>{firstPhone.name}</th>
                    <th>{secondPhone.name}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={getCompareResult("price", firstPhone.price, secondPhone.price) === "phone1" ? "winner-row-p1" : getCompareResult("price", firstPhone.price, secondPhone.price) === "phone2" ? "winner-row-p2" : ""}>
                    <td className="spec-label">Price (Lower is Better)</td>
                    <td>
                      ₹{firstPhone.price.toLocaleString("en-IN")}
                      {getCompareResult("price", firstPhone.price, secondPhone.price) === "phone1" && <span className="winner-tag"><FaTrophy /> Best Value</span>}
                    </td>
                    <td>
                      ₹{secondPhone.price.toLocaleString("en-IN")}
                      {getCompareResult("price", firstPhone.price, secondPhone.price) === "phone2" && <span className="winner-tag"><FaTrophy /> Best Value</span>}
                    </td>
                  </tr>

                  <tr className={getCompareResult("rating", firstPhone.rating, secondPhone.rating) === "phone1" ? "winner-row-p1" : getCompareResult("rating", firstPhone.rating, secondPhone.rating) === "phone2" ? "winner-row-p2" : ""}>
                    <td className="spec-label">User Rating</td>
                    <td>
                      ⭐ {firstPhone.rating}
                      {getCompareResult("rating", firstPhone.rating, secondPhone.rating) === "phone1" && <span className="winner-tag"><FaTrophy /> Top Rated</span>}
                    </td>
                    <td>
                      ⭐ {secondPhone.rating}
                      {getCompareResult("rating", firstPhone.rating, secondPhone.rating) === "phone2" && <span className="winner-tag"><FaTrophy /> Top Rated</span>}
                    </td>
                  </tr>

                  <tr>
                    <td className="spec-label">Processor</td>
                    <td>{firstPhone.specs.processor}</td>
                    <td>{secondPhone.specs.processor}</td>
                  </tr>

                  <tr>
                    <td className="spec-label">Display</td>
                    <td>{firstPhone.specs.display}</td>
                    <td>{secondPhone.specs.display}</td>
                  </tr>

                  <tr className={getCompareResult("camera", firstPhone.specs.camera, secondPhone.specs.camera) === "phone1" ? "winner-row-p1" : getCompareResult("camera", firstPhone.specs.camera, secondPhone.specs.camera) === "phone2" ? "winner-row-p2" : ""}>
                    <td className="spec-label">Camera MP</td>
                    <td>
                      {firstPhone.specs.camera}
                      {getCompareResult("camera", firstPhone.specs.camera, secondPhone.specs.camera) === "phone1" && <span className="winner-tag"><FaTrophy /> Winner</span>}
                    </td>
                    <td>
                      {secondPhone.specs.camera}
                      {getCompareResult("camera", firstPhone.specs.camera, secondPhone.specs.camera) === "phone2" && <span className="winner-tag"><FaTrophy /> Winner</span>}
                    </td>
                  </tr>

                  <tr className={getCompareResult("battery", firstPhone.specs.battery, secondPhone.specs.battery) === "phone1" ? "winner-row-p1" : getCompareResult("battery", firstPhone.specs.battery, secondPhone.specs.battery) === "phone2" ? "winner-row-p2" : ""}>
                    <td className="spec-label">Battery</td>
                    <td>
                      {firstPhone.specs.battery}
                      {getCompareResult("battery", firstPhone.specs.battery, secondPhone.specs.battery) === "phone1" && <span className="winner-tag"><FaTrophy /> Longest Life</span>}
                    </td>
                    <td>
                      {secondPhone.specs.battery}
                      {getCompareResult("battery", firstPhone.specs.battery, secondPhone.specs.battery) === "phone2" && <span className="winner-tag"><FaTrophy /> Longest Life</span>}
                    </td>
                  </tr>

                  <tr className={getCompareResult("storage", firstPhone.specs.storage, secondPhone.specs.storage) === "phone1" ? "winner-row-p1" : getCompareResult("storage", firstPhone.specs.storage, secondPhone.specs.storage) === "phone2" ? "winner-row-p2" : ""}>
                    <td className="spec-label">Storage / RAM</td>
                    <td>
                      {firstPhone.specs.storage}
                      {getCompareResult("storage", firstPhone.specs.storage, secondPhone.specs.storage) === "phone1" && <span className="winner-tag"><FaTrophy /> Winner</span>}
                    </td>
                    <td>
                      {secondPhone.specs.storage}
                      {getCompareResult("storage", firstPhone.specs.storage, secondPhone.specs.storage) === "phone2" && <span className="winner-tag"><FaTrophy /> Winner</span>}
                    </td>
                  </tr>

                  <tr>
                    <td className="spec-label">Operating System</td>
                    <td>{firstPhone.specs.os}</td>
                    <td>{secondPhone.specs.os}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="compare-empty-state">
            <FaExchangeAlt className="empty-icon animate-pulse" />
            <h3>Select two smartphones to begin comparing</h3>
            <p>Use the search selectors above to select devices and analyze detailed specification breakdowns.</p>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default CompareModels;