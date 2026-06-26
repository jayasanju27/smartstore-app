import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Checkout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const [ordered, setOrdered] = useState(false);

  const placeOrder = () => {
    localStorage.removeItem("cart");
    setOrdered(true);
  };

  if (ordered) {
    return (
      <>
        <Navbar />

        <div
          style={{
            minHeight: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#f5f7fa",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "40px",
              borderRadius: "15px",
              textAlign: "center",
              boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
            }}
          >
            <h1 style={{ color: "green" }}>🎉 Order Successful!</h1>

            <h3>Thank you for shopping with SmartStore.</h3>

            <p>Your order has been placed successfully.</p>

            <button
              onClick={() => (window.location.href = "/")}
              style={{
                marginTop: "20px",
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "12px 30px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Continue Shopping
            </button>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          background: "#f4f7fc",
          padding: "40px",
          minHeight: "80vh",
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            margin: "auto",
            background: "white",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
          }}
        >
          <h1 style={{ textAlign: "center", color: "#2563eb" }}>
            Checkout
          </h1>

          <h3>Delivery Details</h3>

          <input
            type="text"
            placeholder="Full Name"
            style={inputStyle}
          />

          <input
            type="email"
            placeholder="Email"
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Phone Number"
            style={inputStyle}
          />

          <textarea
            placeholder="Delivery Address"
            rows="4"
            style={inputStyle}
          ></textarea>

          <h3>Payment Method</h3>

          <select style={inputStyle}>
            <option>Cash on Delivery</option>
            <option>UPI</option>
            <option>Credit Card</option>
            <option>Debit Card</option>
          </select>

          <h3>Order Summary</h3>

          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <span>{item.name}</span>

              <span>₹{item.price.toLocaleString("en-IN")}</span>
            </div>
          ))}

          <hr />

          <h2>Total: ₹{total.toLocaleString("en-IN")}</h2>

          <button
            onClick={placeOrder}
            style={{
              width: "100%",
              marginTop: "20px",
              padding: "15px",
              background: "green",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            Place Order
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

export default Checkout;