import { Routes, Route } from "react-router-dom";

import SmartphoneHome from "./pages/SmartphoneHome";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CompareModels from "./pages/CompareModels";
import FlagshipModels from "./pages/FlagshipModels";
import CustomerReview from "./pages/CustomerReview";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SmartphoneHome />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/compare" element={<CompareModels />} />
      <Route path="/flagships" element={<FlagshipModels />} />
      <Route path="/reviews" element={<CustomerReview />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
    </Routes>
  );
}

export default App;