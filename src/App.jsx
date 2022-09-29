import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TopbarHeader } from "./components";
import { Home, About, Contact, Error, Products } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <TopbarHeader />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
