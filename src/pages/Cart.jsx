import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackToHome from "../components/BackToHome";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
import {
  FaTrash,
  FaTruck,
  FaShoppingCart,
  FaStar,
  FaShieldAlt,
  FaTag,
  FaHeart,
} from "react-icons/fa";

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCart(JSON.parse(localStorage.getItem("cart")) || []);
      setLoading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  const persistCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    persistCart(updatedCart);
    toast.error("Removed from Cart");
  };

  const clearCart = () => {
    persistCart([]);
    toast.info("Cart cleared");
  };

  const moveToWishlist = (phone) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (!wishlist.find((item) => item.id === phone.id)) {
      wishlist.push(phone);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      toast.success("Moved to Wishlist");
    } else {
      toast.info("Already in Wishlist");
    }
    removeItem(phone.id);
  };

  const subtotal = cart.reduce((sum, phone) => sum + phone.price, 0);
  const savings = cart.reduce(
    (sum, phone) => sum + (phone.originalPrice ? phone.originalPrice - phone.price : 0),
    0
  );
  const total = subtotal;

  if (loading) {
    return (
      <>
        <Navbar />
        <LoadingSpinner message="Loading your cart..." fullPage />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="cart-page">
        <div className="cart-page-top">
          <BackToHome />
          <h1 className="cart-title">🛒 My Cart ({cart.length})</h1>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart cart-empty-state">
            <FaShoppingCart className="empty-cart-icon" />
            <h2>Your Cart is Empty</h2>
            <p>Looks like you have not added any smartphones yet.</p>
            <div className="empty-cart-actions">
              <Link to="/">
                <button type="button" className="shop-btn">Continue Shopping</button>
              </Link>
              <Link to="/categories">
                <button type="button" className="category-link-btn">Browse Categories</button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-products">
              <div className="cart-toolbar">
                <span>{cart.length} item{cart.length !== 1 ? "s" : ""} in cart</span>
                <button type="button" className="clear-cart-btn" onClick={clearCart}>
                  Clear Cart
                </button>
              </div>

              {cart.map((phone) => {
                const discount = phone.originalPrice
                  ? Math.round(((phone.originalPrice - phone.price) / phone.originalPrice) * 100)
                  : 0;

                return (
                  <div className="cart-item-card" key={phone.id}>
                    <div className="cart-item-image">
                      <img src={phone.image} alt={phone.name} />
                      {discount > 0 && (
                        <span className="cart-discount-tag">{discount}% OFF</span>
                      )}
                    </div>

                    <div className="cart-item-details">
                      <h2>{phone.name}</h2>
                      <p className="brand">{phone.brand}</p>

                      <div className="rating">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < Math.floor(phone.rating) ? "star-filled" : "star-empty"} />
                        ))}
                        <span>({phone.rating})</span>
                      </div>

                      <div className="price-row">
                        <span className="price">₹{phone.price.toLocaleString("en-IN")}</span>
                        {phone.originalPrice && (
                          <span className="old-price">
                            ₹{phone.originalPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>

                      <p className="delivery">
                        <FaTruck /> Free Delivery · Arrives in 2–3 days
                      </p>

                      <div className="cart-item-actions">
                        <button
                          type="button"
                          className="details-btn"
                          onClick={() => navigate(`/product/${phone.id}`)}
                        >
                          View Details
                        </button>
                        <button
                          type="button"
                          className="wishlist-move-btn"
                          onClick={() => moveToWishlist(phone)}
                        >
                          <FaHeart /> Save for Later
                        </button>
                        <button
                          type="button"
                          className="remove-btn"
                          onClick={() => removeItem(phone.id)}
                        >
                          <FaTrash /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="summary-box cart-summary-panel">
              <h2>Order Summary</h2>

              <div className="cart-trust-strip">
                <span><FaShieldAlt /> Secure checkout</span>
                <span><FaTag /> Best price guarantee</span>
              </div>

              <div className="summary-row">
                <span>Items ({cart.length})</span>
                <span>{cart.length}</span>
              </div>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              {savings > 0 && (
                <div className="summary-row discount-row">
                  <span>You Save</span>
                  <span>- ₹{savings.toLocaleString("en-IN")}</span>
                </div>
              )}

              <div className="summary-row">
                <span>GST (18%)</span>
                <span>Included</span>
              </div>

              <div className="summary-row">
                <span>Delivery</span>
                <span className="free">FREE</span>
              </div>

              <hr />

              <div className="summary-total">
                <span>Total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>

              <button
                type="button"
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                <FaShoppingCart /> Proceed to Checkout
              </button>

              <Link to="/categories" className="continue-link">
                Continue browsing categories
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Cart;
