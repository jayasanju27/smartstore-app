import { Routes, Route } from "react-router-dom";

import SmartphoneHome from "./pages/SmartphoneHome";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Category from "./pages/Category";
import CompareModels from "./pages/CompareModels";
import FlagshipModels from "./pages/FlagshipModels";
import CustomerReview from "./pages/CustomerReview";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Wishlist from "./pages/Wishlist";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SmartphoneHome />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="/categories" element={<Category />} />
      <Route path="/categories/:brandName" element={<Category />} />
      <Route path="/compare" element={<CompareModels />} />
      <Route path="/flagships" element={<FlagshipModels />} />
      <Route path="/reviews" element={<CustomerReview />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/wishlist" element={<Wishlist />} />
    </Routes>
  );
}

export default App;