import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function FAQ() {
  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "Choose your favorite smartphone, click View Details, then Add to Cart or Buy Now and complete the checkout process.",
    },
    {
      question: "What payment methods are available?",
      answer:
        "We support UPI, Credit Card, Debit Card, Net Banking and Cash on Delivery.",
    },
    {
      question: "How many days does delivery take?",
      answer:
        "Delivery usually takes 3 to 7 business days depending on your location.",
    },
    {
      question: "Can I return a product?",
      answer:
        "Yes. Products can be returned within 7 days if they are eligible under our return policy.",
    },
    {
      question: "Is shipping free?",
      answer:
        "Yes. We provide free shipping on all smartphone orders.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      <Navbar />

      <div className="faq-container">

        <h1>Frequently Asked Questions</h1>

        {faqs.map((faq, index) => (
          <div className="faq-item" key={index}>

            <button
              className="faq-question"
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            >
              {faq.question}
            </button>

            {openIndex === index && (
              <p className="faq-answer">
                {faq.answer}
              </p>
            )}

          </div>
        ))}

      </div>

      <Footer />
    </>
  );
}

export default FAQ;