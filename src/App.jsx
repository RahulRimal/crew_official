import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Footer,
  LoginSignup,
  NotificationModal,
  TopbarHeader,
} from "./components";
import {
  Home,
  About,
  Contact,
  Error,
  Products,
  SingleProduct,
  Cart,
  Checkout,
  Esewa,
} from "./pages";

import {
  getCartItems,
  calculateTotals,
  updateCart,
} from "./features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";

import { useCookies, Cookies } from "react-cookie";
import axios from "axios";
import { mainUrl } from "./constants";

import { getUser } from "./features/user/userSlice";
import { AnimatePresence } from "framer-motion";
import {
  clearNotification,
  updateNotification,
} from "./features/notification/notificationSlice";

const App = () => {
  const dispatch = useDispatch();

  const [cartCookies, setCartCookies] = useCookies(["user"]);

  const { showModal } = useSelector((store) => store.notification);

  // const { loading } = useSelector((store) => store.user);

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

  useEffect(() => {
    const userCookie = new Cookies();
    if (userCookie.get("access")) {
      dispatch(getUser(userCookie.get("access")));
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (showModal) {
        const name = "showModal";
        const value = false;

        dispatch(updateNotification({ name, value }));

        setTimeout(() => {
          dispatch(clearNotification());
        }, 1000);
      }
    }, 4000);
  }, [showModal]);

  return (
    <BrowserRouter>
      <AnimatePresence>{showModal && <NotificationModal />}</AnimatePresence>
      <TopbarHeader />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/esewa" element={<Esewa />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
