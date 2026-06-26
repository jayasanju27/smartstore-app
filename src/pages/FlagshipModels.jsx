import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { smartphonesData } from "../data/smartphoneData";
import { Link } from "react-router-dom";

function FlagshipModels() {
  const flagshipPhones = smartphonesData.filter(
    (phone) => phone.price >= 60000
  );

  return (
    <>
      <Navbar />

      <div className="flagship-container">
        <h1>Flagship Smartphones</h1>

        <div className="product-grid">
          {flagshipPhones.map((phone) => (
            <div className="product-card" key={phone.id}>
              <img src={phone.image} alt={phone.name} />

              <h3>{phone.name}</h3>
              <p>{phone.brand}</p>

              <h2>₹{phone.price.toLocaleString("en-IN")}</h2>

              <Link to={`/product/${phone.id}`}>
                <button className="btn">View Details</button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default FlagshipModels;