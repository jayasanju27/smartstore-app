import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackToHome from "../components/BackToHome";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  FaCheckCircle,
  FaBox,
  FaTruck,
  FaReceipt,
  FaShoppingBag,
} from "react-icons/fa";

function OrderSuccess() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem("last-order");
    if (saved) {
      setOrder(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <LoadingSpinner message="Loading your order..." fullPage />
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Navbar />
        <div className="order-success-page">
          <div className="order-success-card order-success-empty">
            <FaReceipt className="order-success-icon muted" />
            <h1>No Order Found</h1>
            <p>We could not find a recent order. Start shopping to place a new one.</p>
            <BackToHome />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="order-success-page">
        <BackToHome />

        <div className="order-success-card">
          <div className="order-success-header">
            <FaCheckCircle className="order-success-icon success" />
            <h1>Order Placed Successfully!</h1>
            <p>Thank you for shopping with SmartStore. A confirmation has been sent to your email.</p>
          </div>

          <div className="order-success-grid">
            <div className="order-info-card">
              <FaReceipt />
              <div>
                <span className="label">Order ID</span>
                <strong>{order.orderId}</strong>
              </div>
            </div>
            <div className="order-info-card">
              <FaTruck />
              <div>
                <span className="label">Estimated Delivery</span>
                <strong className="text-green">{order.deliveryDate}</strong>
              </div>
            </div>
            <div className="order-info-card">
              <FaBox />
              <div>
                <span className="label">Items</span>
                <strong>{order.itemCount} smartphone{order.itemCount !== 1 ? "s" : ""}</strong>
              </div>
            </div>
          </div>

          <div className="invoice-receipt-box">
            <div className="invoice-row">
              <span className="label">Customer Name:</span>
              <span className="value">{order.customerName}</span>
            </div>
            <div className="invoice-row">
              <span className="label">Email:</span>
              <span className="value">{order.email}</span>
            </div>
            <div className="invoice-row">
              <span className="label">Delivery Address:</span>
              <span className="value address-val">
                {order.address}, {order.city}, {order.zip}
              </span>
            </div>
            <div className="invoice-row divider" />
            <div className="invoice-row total">
              <span className="label">Amount Paid:</span>
              <span className="value">₹{order.total.toLocaleString("en-IN")}</span>
            </div>
            <div className="invoice-row">
              <span className="label">Payment Method:</span>
              <span className="value uppercase">{order.paymentMethod}</span>
            </div>
          </div>

          {order.items?.length > 0 && (
            <div className="order-success-items">
              <h3>Ordered Items</h3>
              {order.items.map((item) => (
                <div key={item.id} className="checkout-item-row">
                  <div className="item-thumbnail">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p>{item.brand}</p>
                    <span className="price">₹{item.price.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="order-success-actions">
            <button type="button" className="go-home-btn" onClick={() => navigate("/")}>
              <FaShoppingBag /> Continue Shopping
            </button>
            <Link to="/categories" className="category-link-btn">
              Browse Categories
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default OrderSuccess;
