import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import {
  FaShoppingCart,
  FaTrash,
  FaEye,
  FaTruck,
  FaStar,
  FaTimes,
} from "react-icons/fa";

function Wishlist() {
  const wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter(
      (item) => item.id !== id
    );

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updated)
    );

    toast.error("Removed from Wishlist");

    window.location.reload();
  };

  const addToCart = (phone) => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find(
      (item) => item.id === phone.id
    );

    if (!exists) {
      cart.push(phone);

      localStorage.setItem(
        "cart",
        JSON.stringify(cart)
      );

      toast.success("Added to Cart");
    } else {
      toast.info("Already in Cart");
    }
  };

  return (
    <>
      <Navbar />

      <div className="wishlist-page">

        <h1 className="wishlist-title">
          ❤️ My Wishlist ({wishlist.length})
        </h1>

        {wishlist.length === 0 ? (

          <div className="empty-box">

            <h2>Your Wishlist is Empty</h2>

            <Link to="/">
              <button className="continue-btn">
                Continue Shopping
              </button>
            </Link>

          </div>

        ) : (

          wishlist.map((phone) => (

            <div
              className="wishlist-card"
              key={phone.id}
            >

              {/* Remove Icon */}

              <button
                className="remove-icon"
                onClick={() =>
                  removeFromWishlist(phone.id)
                }
              >
                <FaTimes />
              </button>

              {/* Image */}

              <div className="wishlist-image">

                <img
                  src={phone.image}
                  alt={phone.name}
                />

              </div>

              {/* Details */}

              <div className="wishlist-details">

                <h2>{phone.name}</h2>

                <p className="brand">
                  {phone.brand}
                </p>

                <div className="rating">

                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />

                  <span>{phone.rating}</span>

                </div>

                <div className="price-row">

                  <span className="price">
                    ₹{phone.price.toLocaleString("en-IN")}
                  </span>

                  {phone.originalPrice && (

                    <span className="old-price">
                      ₹{phone.originalPrice.toLocaleString("en-IN")}
                    </span>

                  )}

                </div>

                <p className="delivery">

                  <FaTruck />

                  Free Delivery by Tomorrow

                </p>

                <div className="wishlist-buttons">

                  <button
                    className="cart-btn"
                    onClick={() => addToCart(phone)}
                  >
                    <FaShoppingCart />

                    Add to Cart

                  </button>

                  <Link
                    to={`/product/${phone.id}`}
                  >
                    <button className="details-btn">

                      <FaEye />

                      View Details

                    </button>
                  </Link>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeFromWishlist(phone.id)
                    }
                  >
                    <FaTrash />

                    Remove

                  </button>

                </div>

              </div>

            </div>

          ))

        )}

        <div className="continue-shopping">

          <h2>
            🛍 Looking for more smartphones?
          </h2>

          <Link to="/">
            <button className="continue-btn">
              Continue Shopping →
            </button>
          </Link>

        </div>

      </div>

      <Footer />

    </>
  );
}

export default Wishlist;