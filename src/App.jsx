import React, { useEffect } from "react";
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
  Checkout,
} from "./pages";

import {
  getCartItems,
  calculateTotals,
  updateCart,
} from "./features/cart/cartSlice";
import { useDispatch } from "react-redux";

import { useCookies } from "react-cookie";
import axios from "axios";
import { mainUrl } from "./constants";

const App = () => {
  const dispatch = useDispatch();

  const [cartCookies, setCartCookies] = useCookies(["user"]);

  // useEffect(() => {
  //   dispatch(getCartItems());
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch(calculateTotals());
    }, 1000);
  }, []);

  useEffect(() => {
    if (cartCookies.cartId) {
      const name = "id";
      const value = cartCookies.cartId;
      dispatch(updateCart({ name, value }));
      dispatch(getCartItems(value));
    } else {
      axios.post(`${mainUrl}carts/`).then((response) => {
        setCartCookies("cartId", response.data.id, { path: "/" });
        const name = "id";
        const value = cartCookies.cartId;
        dispatch(updateCart({ name, value }));
      });
    }
  }, []);

  return (
    <BrowserRouter>
      <TopbarHeader />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
