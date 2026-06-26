import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Contact() {
  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "1100px",
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
          Contact Us
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px",
          }}
        >
          {/* Contact Information */}
          <div
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "10px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            }}
          >
            <h2>SmartStore</h2>

            <p><b>📍 Address:</b><br />
            123, Anna Salai,<br />
            Chennai - 600002,<br />
            Tamil Nadu, India
            </p>

            <p><b>📞 Phone:</b> +91 98765 43210</p>

            <p><b>📧 Email:</b> support@smartstore.com</p>

            <p><b>🕒 Working Hours:</b><br />
            Monday - Saturday<br />
            9:00 AM - 7:00 PM
            </p>
          </div>

          {/* Contact Form */}
          <div
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "10px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            }}
          >
            <input
              type="text"
              placeholder="Your Name"
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "15px",
              }}
            />

            <input
              type="email"
              placeholder="Your Email"
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "15px",
              }}
            />

            <textarea
              rows="6"
              placeholder="Your Message"
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "15px",
              }}
            ></textarea>

            <button
              style={{
                width: "100%",
                padding: "15px",
                background: "#1565c0",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              Send Message
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Contact;