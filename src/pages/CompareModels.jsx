import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { smartphonesData } from "../data/smartphoneData";

function CompareModels() {
  const [phone1Id, setPhone1Id] = useState("");
  const [phone2Id, setPhone2Id] = useState("");

  const phone1 = smartphonesData.find((p) => p.id === phone1Id);
  const phone2 = smartphonesData.find((p) => p.id === phone2Id);

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "1200px",
          margin: "40px auto",
          padding: "20px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#1565c0",
            marginBottom: "30px",
          }}
        >
          📱 Compare Smartphones
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
            marginBottom: "40px",
          }}
        >
          <select
            value={phone1Id}
            onChange={(e) => setPhone1Id(e.target.value)}
            style={{
              width: "280px",
              padding: "12px",
              borderRadius: "8px",
            }}
          >
            <option value="">Select First Phone</option>

            {smartphonesData.map((phone) => (
              <option key={phone.id} value={phone.id}>
                {phone.name}
              </option>
            ))}
          </select>

          <h2>VS</h2>

          <select
            value={phone2Id}
            onChange={(e) => setPhone2Id(e.target.value)}
            style={{
              width: "280px",
              padding: "12px",
              borderRadius: "8px",
            }}
          >
            <option value="">Select Second Phone</option>

            {smartphonesData.map((phone) => (
              <option key={phone.id} value={phone.id}>
                {phone.name}
              </option>
            ))}
          </select>
        </div>

        {phone1 && phone2 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "30px",
            }}
          >
            {/* Phone 1 */}
            <div
              style={{
                background: "white",
                borderRadius: "15px",
                padding: "20px",
                textAlign: "center",
                boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
              }}
            >
              <img
                src={phone1.image}
                alt={phone1.name}
                style={{
                  width: "220px",
                  height: "220px",
                  objectFit: "contain",
                }}
              />

              <h2>{phone1.name}</h2>
              <h3 style={{ color: "blue" }}>
                ₹{phone1.price.toLocaleString("en-IN")}
              </h3>

              <p><b>Processor:</b> {phone1.specs.processor}</p>
              <p><b>Display:</b> {phone1.specs.display}</p>
              <p><b>Camera:</b> {phone1.specs.camera}</p>
              <p><b>Battery:</b> {phone1.specs.battery}</p>
              <p><b>Storage:</b> {phone1.specs.storage}</p>
              <p><b>OS:</b> {phone1.specs.os}</p>
            </div>

            {/* Phone 2 */}
            <div
              style={{
                background: "white",
                borderRadius: "15px",
                padding: "20px",
                textAlign: "center",
                boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
              }}
            >
              <img
                src={phone2.image}
                alt={phone2.name}
                style={{
                  width: "220px",
                  height: "220px",
                  objectFit: "contain",
                }}
              />

              <h2>{phone2.name}</h2>
              <h3 style={{ color: "blue" }}>
                ₹{phone2.price.toLocaleString("en-IN")}
              </h3>

              <p><b>Processor:</b> {phone2.specs.processor}</p>
              <p><b>Display:</b> {phone2.specs.display}</p>
              <p><b>Camera:</b> {phone2.specs.camera}</p>
              <p><b>Battery:</b> {phone2.specs.battery}</p>
              <p><b>Storage:</b> {phone2.specs.storage}</p>
              <p><b>OS:</b> {phone2.specs.os}</p>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default CompareModels;