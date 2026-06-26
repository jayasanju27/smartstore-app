import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Cart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const removeItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.location.reload();
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <Navbar />

      <div className="cart-container">
        <div className="cart-card">
        <h1 className="page-title">My Cart</h1>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <h2>Your Cart is Empty</h2>

            <Link to="/">
              <button className="btn">Continue Shopping</button>
            </Link>
          </div>
        ) : (
          <>
            {cart.map((item, index) => (
              <div className="cart-item" key={index}>
                <img src={item.image} alt={item.name} />

                <div className="cart-info">
                  <h2>{item.name}</h2>
                  <p>{item.brand}</p>
                  <h3>₹{item.price.toLocaleString("en-IN")}</h3>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(index)}
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="cart-total">
              <h2>
                Total: ₹{total.toLocaleString("en-IN")}
              </h2>

              <Link to="/checkout">
                <button className="btn">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
      </div>
      <Footer />
    </>
  );
}

export default Cart;