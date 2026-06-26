import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { smartphonesData } from "../data/smartphoneData";

function SmartphoneHome() {
  return (
    <>
      <Navbar />

      <section className="hero">
        <h1>Welcome to SmartStore</h1>
        <p>Explore the Latest Smartphones at the Best Prices</p>
      </section>

      <section className="products">

        <h2>Latest Smartphones</h2>

        <div className="product-grid">

          {smartphonesData.map((phone) => (

            <div className="product-card" key={phone.id}>

              <img src={phone.image} alt={phone.name} />

              <h3>{phone.name}</h3>

              <p>{phone.brand}</p>

              <p className="price">
                ₹{phone.price.toLocaleString("en-IN")}
              </p>

              <Link to={`/product/${phone.id}`}>
                <button className="btn">
                  View Details
                </button>
              </Link>

            </div>

          ))}

        </div>

      </section>

      <Footer />
    </>
  );
}

export default SmartphoneHome;