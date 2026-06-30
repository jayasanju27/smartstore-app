import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { smartphonesData } from "../data/smartphoneData";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import {FaStar} from "react-icons/fa";
import { toast } from "react-toastify";

function SmartphoneHome() {
  const [search, setSearch] = useState("");

  const filteredPhones = smartphonesData.filter(
    (phone) =>
      phone.name.toLowerCase().includes(search.toLowerCase()) ||
      phone.brand.toLowerCase().includes(search.toLowerCase())
  );

  const addWishlist = (phone) => {
    let wishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.find(
      (item) => item.id === phone.id
    );

    if (!exists) {
      wishlist.push(phone);
      localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
      );
      toast.success("❤️ Added to Wishlist");
    } else {
      toast.info("Already in Wishlist");
    }
  };

  return (
    <>
      <Navbar
        search={search}
        setSearch={setSearch}
      />

      <section className="hero">
        <h1>Welcome to SmartStore</h1>
        <p>Explore the Latest Smartphones at the Best Prices</p>
      </section>

      <section className="products">

        <h2>Latest Smartphones</h2>

        {filteredPhones.length === 0 && (
          <h2 style={{ textAlign: "center" }}>
            No smartphones found.
          </h2>
        )}

        <div className="product-grid">

          {filteredPhones.map((phone) => {

            const discount = Math.round(
              ((phone.originalPrice - phone.price) /
                phone.originalPrice) *
                100
            );

            return (

              <div
                className="product-card"
                key={phone.id}
              >

                {/* Discount Badge */}

                <div className="discount-badge">
                  {discount}% OFF
                </div>

                {/* Wishlist */}

                <div
                  className="heart"
                  onClick={() => addWishlist(phone)}
                >
                  <FaHeart />
                </div>

                {/* Phone Image */}

                <img
                  src={phone.image}
                  alt={phone.name}
                />

                {/* Name */}

                <h3>{phone.name}</h3>

                {/* Brand */}

                <p>{phone.brand}</p>

                <div className="rating">
  <FaStar />
  <FaStar />
  <FaStar />
  <FaStar />
  <FaStar />
  <span>{phone.rating}</span>
</div>

                {/* Price */}

                <p className="delivery">
🚚 Free Delivery Tomorrow
</p>

                <div className="price-box">

                  <span className="price">
                    ₹{phone.price.toLocaleString("en-IN")}
                  </span>

                  <span className="old-price">
                    ₹{phone.originalPrice.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>

                <Link
                  to={`/product/${phone.id}`}
                >
                  <button className="btn">
                    View Details
                  </button>
                </Link>

              </div>

            );
          })}

        </div>

      </section>

      <Footer />
    </>
  );
}

export default SmartphoneHome;