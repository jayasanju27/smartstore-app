import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { smartphonesData } from "../data/smartphoneData";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const phone = smartphonesData.find((p) => p.id === id);

  if (!phone) {
    return (
      <>
        <Navbar />
        <h1 style={{ textAlign: "center", margin: "50px" }}>
          Phone Not Found
        </h1>
        <Footer />
      </>
    );
  }

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(phone);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Phone added to cart!");
  };

  const buyNow = () => {
    addToCart();
    navigate("/checkout");
  };

  return (
    <>
      <Navbar />

      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="product-page">

        <div className="product-box">

          <img
            src={phone.image}
            alt={phone.name}
            className="product-image"
          />

          <h1>{phone.name}</h1>

          <h2 className="price">
            ₹{phone.price.toLocaleString("en-IN")}
          </h2>

          <p className="description">
            {phone.description}
          </p>

        </div>

        <div className="specifications">

          <h2 className="spec-title">
            Specifications
          </h2>

          <ul>

      <li>
              <b>⚙ Processor:</b> {phone.specs.processor}
            </li>

            <li>
              <b>📱 Display:</b> {phone.specs.display}
            </li>

            <li>
              <b>📷 Camera:</b> {phone.specs.camera}
            </li>

            <li>
              <b>🔋 Battery:</b> {phone.specs.battery}
            </li>

            <li>
              <b>💾 Storage:</b> {phone.specs.storage}
            </li>

            <li>
              <b>🤖 OS:</b> {phone.specs.os}
            </li>

          </ul>

        </div>

        <div className="buttons">

          <button
            className="cart-btn"
            onClick={addToCart}
          >
            Add to Cart
          </button>

          <button
            className="buy-btn"
            onClick={buyNow}
          >
            Buy Now
          </button>

        </div>

      </div>

      <Footer />

    </>
  );
}

export default ProductDetails;