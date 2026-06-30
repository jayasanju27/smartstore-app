import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackToHome from "../components/BackToHome";
import LoadingSpinner from "../components/LoadingSpinner";
import { smartphonesData } from "../data/smartphoneData";
import { FaStar, FaArrowRight, FaMobileAlt } from "react-icons/fa";

const brandIcons = {
  Apple: "🍎",
  Samsung: "📱",
  Google: "🔍",
  OnePlus: "➕",
  Vivo: "📷",
  Xiaomi: "⚡",
  Redmi: "💰",
  Sony: "🎮",
  Motorola: "📡",
  Nothing: "✨",
  OPPO: "🎨",
  Realme: "🚀",
};

function Category() {
  const { brandName } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [brandName]);

  const brands = [...new Set(smartphonesData.map((p) => p.brand))].sort();

  const brandCounts = brands.reduce((acc, brand) => {
    acc[brand] = smartphonesData.filter((p) => p.brand === brand).length;
    return acc;
  }, {});

  const selectedBrand = brandName ? decodeURIComponent(brandName) : null;
  const filteredPhones = selectedBrand
    ? smartphonesData.filter((p) => p.brand === selectedBrand)
    : [];

  if (loading) {
    return (
      <>
        <Navbar />
        <LoadingSpinner message="Loading categories..." fullPage />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="category-page">
        <BackToHome />

        <div className="category-header">
          <h1>
            <FaMobileAlt /> {selectedBrand ? `${selectedBrand} Phones` : "Browse by Category"}
          </h1>
          <p>
            {selectedBrand
              ? `${filteredPhones.length} model${filteredPhones.length !== 1 ? "s" : ""} available`
              : "Shop smartphones by your favourite brand"}
          </p>
        </div>

        {!selectedBrand ? (
          <div className="category-grid">
            {brands.map((brand) => (
              <Link
                key={brand}
                to={`/categories/${encodeURIComponent(brand)}`}
                className="category-card"
              >
                <span className="category-icon">{brandIcons[brand] || "📱"}</span>
                <h2>{brand}</h2>
                <p>{brandCounts[brand]} model{brandCounts[brand] !== 1 ? "s" : ""}</p>
                <span className="category-arrow">
                  View all <FaArrowRight />
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <>
            <div className="category-breadcrumb">
              <Link to="/categories">All Categories</Link>
              <span>/</span>
              <span>{selectedBrand}</span>
            </div>

            {filteredPhones.length === 0 ? (
              <div className="category-empty">
                <h2>No phones found for this brand</h2>
                <Link to="/categories" className="shop-btn">Browse All Categories</Link>
              </div>
            ) : (
              <div className="category-products-grid">
                {filteredPhones.map((phone) => {
                  const discount = Math.round(
                    ((phone.originalPrice - phone.price) / phone.originalPrice) * 100
                  );
                  return (
                    <div className="product-card category-product-card" key={phone.id}>
                      <div className="discount-badge">{discount}% OFF</div>
                      <img src={phone.image} alt={phone.name} />
                      <h2>{phone.name}</h2>
                      <p className="brand-tag">{phone.brand}</p>
                      <div className="rating">
                        <FaStar /> {phone.rating}
                      </div>
                      <p className="price">₹{phone.price.toLocaleString("en-IN")}</p>
                      <Link to={`/product/${phone.id}`}>
                        <button type="button" className="view-btn">View Details</button>
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Category;
