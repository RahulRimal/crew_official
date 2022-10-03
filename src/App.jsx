import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer, TopbarHeader } from "./components";
import {
  Home,
  About,
  Contact,
  Error,
  Products,
  SingleProduct,
  Cart,
} from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <TopbarHeader />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product" element={<SingleProduct />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
