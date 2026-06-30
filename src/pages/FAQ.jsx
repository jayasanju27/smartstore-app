import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaQuestionCircle,
  FaShippingFast,
  FaCreditCard,
  FaBox,
  FaUndo,
  FaArrowRight,
  FaEnvelope,
} from "react-icons/fa";

function FAQ() {
  const faqs = [
    {
      category: "Orders",
      question: "How do I place an order?",
      answer:
        "Choose your favorite smartphone, click View Details, then Add to Cart or Buy Now and complete the checkout process.",
    },
    {
      category: "Payments",
      question: "What payment methods are available?",
      answer:
        "We support UPI, Credit Card, Debit Card, Net Banking and Cash on Delivery.",
    },
    {
      category: "Shipping",
      question: "How many days does delivery take?",
      answer:
        "Delivery usually takes 3 to 7 business days depending on your location.",
    },
    {
      category: "Returns",
      question: "Can I return a product?",
      answer:
        "Yes. Products can be returned within 7 days if they are eligible under our return policy.",
    },
    {
      category: "Shipping",
      question: "Is shipping free?",
      answer:
        "Yes. We provide free shipping on all smartphone orders.",
    },
    {
      category: "Orders",
      question: "Can I cancel my order after placing it?",
      answer:
        "You can cancel your order from the orders section as long as it has not been shipped yet.",
    },
    {
      category: "Payments",
      question: "Is my payment information secure?",
      answer:
        "Absolutely. We use industry-standard encryption protocols and secure payment gateways to safeguard your transactions.",
    },
    {
      category: "Returns",
      question: "How long does a refund take to process?",
      answer:
        "Once we receive and verify the returned product, your refund will be processed back to your original payment method within 3 to 5 business days.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Orders", "Payments", "Shipping", "Returns"];

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Orders":
        return <FaBox className="cat-icon" />;
      case "Payments":
        return <FaCreditCard className="cat-icon" />;
      case "Shipping":
        return <FaShippingFast className="cat-icon" />;
      case "Returns":
        return <FaUndo className="cat-icon" />;
      default:
        return <FaQuestionCircle className="cat-icon" />;
    }
  };

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === "All" || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Navbar />

      <div className="faq-page-wrapper">
        <div className="faq-header-banner">
          <h1>How can we help you?</h1>
          <p>Search our comprehensive FAQ section or select a category below</p>
          
          <div className="faq-search-wrapper">
            <FaSearch className="faq-search-icon" />
            <input
              type="text"
              placeholder="Search for questions, keywords, topics..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setOpenIndex(null); // Reset open accordion on search
              }}
            />
          </div>
        </div>

        <div className="faq-main-content">
          {/* Category Tabs */}
          <div className="faq-categories-tabs">
            {categories.map((category) => (
              <button
                key={category}
                className={`faq-tab-btn ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => {
                  setSelectedCategory(category);
                  setOpenIndex(null); // Reset open accordion on category change
                }}
              >
                {getCategoryIcon(category)}
                <span>{category}</span>
              </button>
            ))}
          </div>

          {/* Accordion list */}
          <div className="faq-accordion-container">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    className={`faq-accordion-card ${isOpen ? "active" : ""}`}
                    key={index}
                  >
                    <button
                      className="faq-accordion-header"
                      onClick={() => toggleAccordion(index)}
                      aria-expanded={isOpen}
                    >
                      <div className="faq-header-left">
                        <span className="faq-badge">{faq.category}</span>
                        <h3 className="faq-question-text">{faq.question}</h3>
                      </div>
                      <div className="faq-chevron-wrapper">
                        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                      </div>
                    </button>

                    <div className={`faq-accordion-body ${isOpen ? "open" : ""}`}>
                      <p className="faq-answer-text">{faq.answer}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="faq-no-results">
                <FaQuestionCircle className="no-results-icon" />
                <h3>No matching FAQs found</h3>
                <p>Try checking your spelling or searching for a different keyword.</p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Support Banner */}
        <div className="faq-support-banner">
          <div className="faq-support-content">
            <div className="faq-support-icon-box">
              <FaEnvelope />
            </div>
            <div className="faq-support-text">
              <h2>Still have questions?</h2>
              <p>Can't find the answer you're looking for? Our friendly team is here to help.</p>
            </div>
          </div>
          <Link to="/contact" className="faq-support-btn">
            Get In Touch <FaArrowRight />
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default FAQ;