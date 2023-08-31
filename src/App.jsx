import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Footer,
  GoToTop,
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
  Khalti,
  ArtistGallery,
  Studios,
  Casting,
  Dubbing,
} from "./pages";

import {
  getCartItems,
  calculateTotals,
  updateCart,
  getCartId,
} from "./features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";

import { useCookies, Cookies } from "react-cookie";

import { getCustomer } from "./features/user/userSlice";
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
  }, [dispatch]);

  useEffect(() => {
    if (cartCookies.cartId) {
      const name = "id";
      const value = cartCookies.cartId;
      dispatch(updateCart({ name, value }));
      dispatch(getCartItems(value));
    } else {
      dispatch(getCartId());
    }
  }, [cartCookies.cartId, setCartCookies, dispatch]);

  useEffect(() => {
    const userCookie = new Cookies();
    if (userCookie.get("access")) {
      // dispatch(getUser(userCookie.get("access")));
      dispatch(getCustomer(userCookie.get("access")));
    }
  }, [dispatch]);

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
  }, [showModal, dispatch]);

  return (
    <BrowserRouter>
      <AnimatePresence>{showModal && <NotificationModal />}</AnimatePresence>
      <TopbarHeader />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/equipments" element={<Products />} />
        <Route path="/equipment/:slug" element={<SingleProduct />} />
        <Route path="/studios" element={<Studios />} />
        {/* <Route path="/equipment/:id" element={<SingleProduct />} /> */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/dub" element={<Dubbing />} />
        <Route path="/cast" element={<Casting />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/esewa" element={<Esewa />} />
        <Route path="/khalti" element={<Khalti />} />
        <Route path="/artist-gallery" element={<ArtistGallery />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
      <GoToTop />
    </BrowserRouter>
  );
};
// 
export default App;
