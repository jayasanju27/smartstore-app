import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackToHome from "../components/BackToHome";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
import { FaShoppingBag, FaCreditCard, FaQrcode, FaTrashAlt, FaTicketAlt, FaTruck, FaLock, FaShieldAlt, FaArrowLeft, FaCalendarAlt } from "react-icons/fa";

function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form states
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  
  // Payment states
  const [paymentMethod, setPaymentMethod] = useState("card"); // card, upi, cod
  const [cardDetails, setCardDetails] = useState({
    holder: "",
    number: "",
    expiry: "",
    cvv: "",
  });
  const [upiId, setUpiId] = useState("");

  // Promo code states
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  // Redirect stores order in sessionStorage
  const [saveAddress, setSaveAddress] = useState(false);

  const estimatedDelivery = (() => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
  })();

  const shippingComplete =
    form.name && form.email && form.phone && form.address && form.city && form.state && form.zip;

  const paymentComplete =
    paymentMethod === "cod" ||
    (paymentMethod === "card" &&
      cardDetails.holder &&
      cardDetails.number &&
      cardDetails.expiry &&
      cardDetails.cvv) ||
    (paymentMethod === "upi" && upiId.includes("@"));

  useEffect(() => {
    const timer = setTimeout(() => {
      const items = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(items);

      const saved = JSON.parse(localStorage.getItem("checkout-address"));
      if (saved) {
        setForm(saved);
        setSaveAddress(true);
      }
      setPageLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Price calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const gstTax = Math.round((subtotal - discountAmount) * 0.18); // 18% GST
  const shipping = subtotal > 0 ? 0 : 0; // Free delivery as promised
  const total = subtotal - discountAmount + gstTax + shipping;

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCardChange = (e) => {
    let { name, value } = e.target;
    
    // Format card number with spaces
    if (name === "number") {
      value = value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (value.length > 19) return;
    }
    // Format expiry MM/YY
    if (name === "expiry") {
      value = value.replace(/\//g, '');
      if (value.length > 2) {
        value = value.substring(0, 2) + "/" + value.substring(2, 4);
      }
      if (value.length > 5) return;
    }
    // CVV max 3 digits
    if (name === "cvv") {
      value = value.replace(/\D/g, "");
      if (value.length > 3) return;
    }

    setCardDetails({ ...cardDetails, [name]: value });
  };

  const applyPromo = () => {
    const code = promoCode.toUpperCase().trim();
    if (code === "SMART20") {
      setDiscountPercent(20);
      setAppliedPromo("SMART20 (20% OFF)");
      toast.success("Promo code SMART20 applied! 20% discount added.");
    } else if (code === "WELCOME10") {
      setDiscountPercent(10);
      setAppliedPromo("WELCOME10 (10% OFF)");
      toast.success("Promo code WELCOME10 applied! 10% discount added.");
    } else {
      toast.error("Invalid coupon code. Try 'SMART20' or 'WELCOME10'");
    }
    setPromoCode("");
  };

  const removePromo = () => {
    setDiscountPercent(0);
    setAppliedPromo("");
    toast.info("Coupon code removed");
  };

  const validateForm = () => {
    if (!form.name || !form.email || !form.phone || !form.address || !form.city || !form.state || !form.zip) {
      toast.error("Please fill in all shipping fields");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (form.phone.replace(/\D/g, "").length < 10) {
      toast.error("Please enter a valid 10-digit phone number");
      return false;
    }
    if (form.zip.replace(/\D/g, "").length !== 6) {
      toast.error("Please enter a valid 6-digit ZIP code");
      return false;
    }

    if (paymentMethod === "card") {
      if (!cardDetails.holder || !cardDetails.number || !cardDetails.expiry || !cardDetails.cvv) {
        toast.error("Please fill in card payment details");
        return false;
      }
      if (cardDetails.number.replace(/\s/g, "").length < 16) {
        toast.error("Invalid credit card number length");
        return false;
      }
      if (cardDetails.cvv.length < 3) {
        toast.error("Invalid CVV");
        return false;
      }
    } else if (paymentMethod === "upi") {
      if (!upiId.includes("@")) {
        toast.error("Please enter a valid UPI ID (e.g., username@okaxis)");
        return false;
      }
    }

    return true;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (saveAddress) {
      localStorage.setItem("checkout-address", JSON.stringify(form));
    } else {
      localStorage.removeItem("checkout-address");
    }

    const randomId = "OD" + Math.floor(100000000 + Math.random() * 900000000);

    const options = { year: "numeric", month: "long", day: "numeric" };
    const dateObj = new Date();
    dateObj.setDate(dateObj.getDate() + 3);
    const delivery = dateObj.toLocaleDateString("en-IN", options);

    const orderData = {
      orderId: randomId,
      deliveryDate: delivery,
      customerName: form.name,
      email: form.email,
      address: form.address,
      city: form.city,
      zip: form.zip,
      total,
      paymentMethod,
      itemCount: cartItems.length,
      items: cartItems,
    };

    sessionStorage.setItem("last-order", JSON.stringify(orderData));
    localStorage.removeItem("cart");
    toast.success("Order Placed Successfully!");
    navigate("/order-success");
  };

  const handleRemoveItem = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.info("Item removed from Checkout");
  };

  if (pageLoading) {
    return (
      <>
        <Navbar />
        <LoadingSpinner message="Preparing secure checkout..." fullPage />
      </>
    );
  }

  return (
    <>
      <Navbar />

      {isSubmitting && (
        <div className="checkout-loading-overlay">
          <LoadingSpinner message="Processing your payment securely..." />
        </div>
      )}

      <div className="checkout-page-wrapper">
        <div className="checkout-nav-links">
          <BackToHome />
          <button type="button" className="checkout-back-link" onClick={() => navigate("/cart")}>
            <FaArrowLeft /> Back to Cart
          </button>
        </div>

        <div className="checkout-header">
          <div className="checkout-header-badge">
            <FaLock /> SSL Encrypted
          </div>
          <h1>Secure Checkout</h1>
          <p>Provide your delivery information and payment details to complete the purchase.</p>
          <div className="checkout-steps">
            <span className={`checkout-step ${shippingComplete ? "active done" : "active"}`}>
              <span className="step-num">{shippingComplete ? "✓" : "1"}</span> Shipping
            </span>
            <span className="checkout-step-divider" />
            <span className={`checkout-step ${paymentComplete ? "active done" : shippingComplete ? "active" : ""}`}>
              <span className="step-num">{paymentComplete ? "✓" : "2"}</span> Payment
            </span>
            <span className="checkout-step-divider" />
            <span className={`checkout-step ${shippingComplete && paymentComplete ? "active" : ""}`}>
              <span className="step-num">3</span> Review
            </span>
          </div>
        </div>

        {cartItems.length > 0 ? (
          <div className="checkout-grid">
            {/* Left Side: Address and Payment */}
            <form className="checkout-billing-form" onSubmit={handlePlaceOrder}>
              <div className="checkout-section-card">
                <div className="section-card-header">
                  <h2>1. Shipping Address</h2>
                  <span className="delivery-chip">
                    <FaCalendarAlt /> Arrives by {estimatedDelivery}
                  </span>
                </div>
                <div className="form-group-grid">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleInputChange}
                      placeholder="9876543210"
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Delivery Address</label>
                    <textarea
                      name="address"
                      value={form.address}
                      onChange={handleInputChange}
                      placeholder="Apartment, Suite, Street name"
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleInputChange}
                      placeholder="Mumbai"
                    />
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <input
                      type="text"
                      name="state"
                      value={form.state}
                      onChange={handleInputChange}
                      placeholder="Maharashtra"
                    />
                  </div>
                  <div className="form-group">
                    <label>ZIP / Postal Code</label>
                    <input
                      type="text"
                      name="zip"
                      value={form.zip}
                      onChange={handleInputChange}
                      placeholder="400001"
                    />
                  </div>
                </div>

                <label className="save-address-toggle">
                  <input
                    type="checkbox"
                    checked={saveAddress}
                    onChange={(e) => setSaveAddress(e.target.checked)}
                  />
                  <span>Save address for future orders</span>
                </label>
              </div>

              <div className="checkout-section-card">
                <h2>2. Payment Method</h2>
                <div className="payment-brands-strip">
                  <span>VISA</span>
                  <span>Mastercard</span>
                  <span>UPI</span>
                  <span>RuPay</span>
                </div>
                <div className="payment-method-selector">
                  <div
                    className={`payment-tab ${paymentMethod === "card" ? "active" : ""}`}
                    onClick={() => setPaymentMethod("card")}
                  >
                    <FaCreditCard />
                    <span>Card</span>
                  </div>
                  <div
                    className={`payment-tab ${paymentMethod === "upi" ? "active" : ""}`}
                    onClick={() => setPaymentMethod("upi")}
                  >
                    <FaQrcode />
                    <span>UPI ID</span>
                  </div>
                  <div
                    className={`payment-tab ${paymentMethod === "cod" ? "active" : ""}`}
                    onClick={() => setPaymentMethod("cod")}
                  >
                    <FaTruck />
                    <span>Cash on Delivery</span>
                  </div>
                </div>

                <div className="payment-details-box">
                  {paymentMethod === "card" && (
                    <div className="card-payment-layout">
                      <div className="card-preview">
                        <div className="card-preview-top">
                          <span className="card-preview-brand">SmartStore</span>
                          <FaCreditCard className="card-preview-icon" />
                        </div>
                        <div className="card-preview-number">
                          {cardDetails.number || "•••• •••• •••• ••••"}
                        </div>
                        <div className="card-preview-bottom">
                          <span>{cardDetails.holder || "YOUR NAME"}</span>
                          <span>{cardDetails.expiry || "MM/YY"}</span>
                        </div>
                      </div>

                      <div className="card-payment-form">
                      <div className="form-group">
                        <label>Cardholder Name</label>
                        <input
                          type="text"
                          name="holder"
                          value={cardDetails.holder}
                          onChange={handleCardChange}
                          placeholder="JOHN DOE"
                        />
                      </div>
                      <div className="form-group">
                        <label>Card Number</label>
                        <input
                          type="text"
                          name="number"
                          value={cardDetails.number}
                          onChange={handleCardChange}
                          placeholder="4111 2222 3333 4444"
                        />
                      </div>
                      <div className="form-group-row">
                        <div className="form-group">
                          <label>Expiry Date</label>
                          <input
                            type="text"
                            name="expiry"
                            value={cardDetails.expiry}
                            onChange={handleCardChange}
                            placeholder="MM/YY"
                          />
                        </div>
                        <div className="form-group">
                          <label>CVV</label>
                          <input
                            type="password"
                            name="cvv"
                            value={cardDetails.cvv}
                            onChange={handleCardChange}
                            placeholder="***"
                          />
                        </div>
                      </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "upi" && (
                    <div className="upi-payment-form">
                      <div className="upi-qr-simulation">
                        <div className="qr-box">QR Code Simulation</div>
                        <p>Scan with Google Pay, PhonePe, Paytm, or BHIM UPI app</p>
                      </div>
                      <div className="form-group">
                        <label>Or enter UPI ID</label>
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="username@okaxis"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "cod" && (
                    <div className="cod-payment-info">
                      <p>💵 Pay with Cash/Card upon delivery of your products.</p>
                      <p>Extra charge: <b>₹0</b></p>
                    </div>
                  )}
                </div>
              </div>

              <button type="submit" className="place-order-submit-btn" disabled={isSubmitting}>
                <FaLock /> {isSubmitting ? "Processing..." : `Complete Purchase • ₹${total.toLocaleString("en-IN")}`}
              </button>

              <div className="checkout-trust-bar">
                <span><FaShieldAlt /> 256-bit SSL encryption</span>
                <span><FaLock /> Secure payment gateway</span>
                <span><FaTruck /> Free & fast delivery</span>
              </div>
            </form>

            {/* Right Side: Order Summary */}
            <div className="checkout-summary-panel">
              <div className="checkout-section-card checkout-summary-card">
                <div className="section-card-header">
                  <h2>Order Summary</h2>
                  <span className="item-count-badge">{cartItems.length} item{cartItems.length !== 1 ? "s" : ""}</span>
                </div>

                <div className="order-protection-banner">
                  <FaShieldAlt />
                  <div>
                    <strong>Order Protection</strong>
                    <p>7-day easy returns &amp; 1-year warranty on all devices</p>
                  </div>
                </div>

                <div className="checkout-items-list">
                  {cartItems.map((item, index) => (
                    <div key={index} className="checkout-item-row">
                      <div className="item-thumbnail">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="item-info">
                        <h3>{item.name}</h3>
                        <p>Brand: {item.brand}</p>
                        <span className="price">₹{item.price.toLocaleString("en-IN")}</span>
                      </div>
                      <button
                        type="button"
                        className="item-remove-btn"
                        onClick={() => handleRemoveItem(index)}
                        title="Remove product"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Promo Code Input */}
                <div className="checkout-promo-box">
                  <div className="promo-input-row">
                    <FaTicketAlt className="promo-icon" />
                    <input
                      type="text"
                      placeholder="Coupon (SMART20, WELCOME10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <button type="button" onClick={applyPromo}>Apply</button>
                  </div>
                  {appliedPromo && (
                    <div className="applied-promo-badge">
                      <span>{appliedPromo}</span>
                      <button type="button" onClick={removePromo}>×</button>
                    </div>
                  )}
                </div>

                {/* Total breakdowns */}
                <div className="checkout-totals-sheet">
                  <div className="total-row">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="total-row discount">
                      <span>Discount ({discountPercent}%)</span>
                      <span>- ₹{discountAmount.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  <div className="total-row">
                    <span>GST (18% included)</span>
                    <span>₹{gstTax.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="total-row">
                    <span>Delivery Charge</span>
                    <span className="free">FREE</span>
                  </div>
                  <div className="total-row grand-total">
                    <span>Total Amount</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {discountAmount > 0 && (
                  <div className="summary-savings-note">
                    You save ₹{discountAmount.toLocaleString("en-IN")} on this order
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="checkout-empty-cart">
            <FaShoppingBag className="empty-icon animate-pulse" />
            <h2>Your cart is currently empty</h2>
            <p>You cannot check out without placing any smartphones in your cart first.</p>
            <button className="go-home-btn" onClick={() => navigate("/")}>
              Explore Smartphones
            </button>
            <BackToHome className="back-to-home-inline" />
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Checkout;