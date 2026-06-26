import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { smartphonesData } from "../data/smartphoneData";
import { useNavigate } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const phone = smartphonesData.find((p) => p.id === id);

  if (!phone) {
    return (
      <>
        <Navbar />
        <div className="container" style={{ padding: "50px", textAlign: "center" }}>
          <h1>Phone Not Found</h1>
        </div>
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

  <button
   className="back-btn"
   onclick={() => navigate(-1)}
   >
   ← Back, 
   </button>

  return (
    <>
      <Navbar />

      <div
        className="container"
        style={{ marginTop: "40px", marginBottom: "40px" }}
      >
        <div className="details">


          <div className="details-image">
            <img src={phone.image} alt={phone.name} />
          </div>

          <div className="details-info">
 
          {/* Wrap the pnone image*/}

          <div className="image-Wrapper">

            <img src={phone.image} alt={phone.name} />
            
          </div>

            <h1>{phone.name}</h1>

            <h2 style={{ color: "blue" }}>
              ₹{phone.price.toLocaleString("en-IN")}
            </h2>

            <p>{phone.description}</p>

            <div className="specifications">
              <h3>Specifications</h3>

              <ul>
                <li><b>Processor:</b> {phone.specs.processor}</li>
                <li><b>Display:</b> {phone.specs.display}</li>
                <li><b>Camera:</b> {phone.specs.camera}</li>
                <li><b>Battery:</b> {phone.specs.battery}</li>
                <li><b>Storage:</b> {phone.specs.storage}</li>
                <li><b>OS:</b> {phone.specs.os}</li>
              </ul>
            </div>

            <div className="buttons">
              <button className="cart-btn" onClick={addToCart}>
                Add to Cart
              </button>

              <button className="buy-btn" onClick={buyNow}>
                Buy Now
              </button>
            </div>

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProductDetails;
