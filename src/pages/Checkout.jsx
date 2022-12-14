import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { CartTotals, LoginSignup } from "../components";

import { TbTruckDelivery, TbPackage } from "react-icons/tb";
import { IoMdArrowBack } from "react-icons/io";

import Slider from "react-slick";

import ReactLoading from "react-loading";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { mainUrl } from "../constants";

import { getCustomer } from "../features/user/userSlice";
import { Cookies } from "react-cookie";
import axios from "axios";
import { updateNotification } from "../features/notification/notificationSlice";
import { getCartId, resetCart } from "../features/cart/cartSlice";
import { AnimatePresence, motion } from "framer-motion";

const Checkout = () => {
  const { cartItems } = useSelector((store) => store.cart);

  const [provideDelivery, setProvideDelivery] = useState(false);
  const [payByEsewa, setPayByEsewa] = useState(true);

  const [firstName, setFristName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [convenientLocation, setConvenientLocation] = useState("");
  const [sideNote, setSideNote] = useState("");

  const { id: userId, loading } = useSelector((store) => store.user);

  const refContainer = useRef(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    first_name: userFirstName,
    last_name: userLastName,
    email: userEmail,
    phone: userPhone,
  } = useSelector((store) => store.user);

  useEffect(() => {
    const userCookie = new Cookies();
    if (userCookie.get("access")) {
      const access = userCookie.get("access");
      dispatch(getCustomer(access));
    }
  }, [dispatch]);

  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 200,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  // const updateUserInfo = (e) => {
  //   let name = e.target.name;
  //   let value = e.target.value;
  //   dispatch(updateUser({ name, value }));
  // };

  useEffect(() => {
    setFristName(userFirstName);
    setLastName(userLastName);
    setEmail(userEmail);
    setPhone(userPhone);
  }, [userFirstName, userLastName, userEmail, userPhone]);

  const handleBooking = async (e) => {
    e.preventDefault();

    const cookies = new Cookies();
    const cartId = cookies.get("cartId");
    const accessToken = cookies.get("access");
    try {
      const response = await axios.post(
        `${mainUrl}orders/`,
        {
          cart_id: cartId,
          billing_info: {
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            email: email,
            convenient_location: convenientLocation || null,
            side_note: sideNote || null,
          },
        },
        {
          headers: {
            Authorization: `FC ` + accessToken,
          },
        }
      );
      if (response.status === 200) {
        cookies.remove("cartId", { path: "/" });
        dispatch(resetCart());
        dispatch(getCartId());

        let name = "message";
        let value = "Order Placed Successfully";
        dispatch(updateNotification({ name, value }));
        name = "showModal";
        value = true;
        dispatch(updateNotification({ name, value }));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <main>
        <button
          className="back-btn"
          onClick={() => navigate(-1, { replace: true })}
        >
          <IoMdArrowBack />
        </button>
        <h1 className="title">Checkout</h1>
        <div className="checkout-body">
          <form onSubmit={handleBooking} ref={refContainer}>
            <section>
              <h4>1. Contact Information</h4>
              <div className="contact-info">
                <div>
                  <label htmlFor="first_name">First Name</label>
                  <br />
                  <input
                    type="text"
                    name="first_name"
                    value={firstName}
                    onChange={(e) => setFristName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="last_name">Last Name</label>
                  <br />
                  <input
                    type="text"
                    name="last_name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone">Phone</label>
                  <br />
                  <span>+977</span>
                  <input
                    type="text"
                    name="phone"
                    prefix="+977"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email">E-mail</label>
                  <br />
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="sideNote">Side notes</label>
                  <br />
                  <textarea
                    name="sideNote"
                    rows={7}
                    cols={41}
                    value={sideNote}
                    onChange={(e) => setSideNote(e.target.value)}
                  />
                </div>
                <div>
                  <AnimatePresence>
                    {provideDelivery && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.4 }}
                        style={{ margin: 0 }}
                      >
                        <label htmlFor="deliveryLocaion">
                          Convenient Delivery Location
                        </label>
                        <br />
                        <input
                          type="text"
                          name="deliveryLocaion"
                          value={convenientLocation}
                          onChange={(e) =>
                            setConvenientLocation(e.target.value)
                          }
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </section>
            <section>
              <h4>2. Delivery Method</h4>
              <div className="delivery-method">
                <div className="delivery-pickup">
                  <button
                    type="button"
                    className={`${
                      !provideDelivery ? "pickup selected" : "pickup"
                    }`}
                    onClick={() => setProvideDelivery(false)}
                  >
                    {" "}
                    <TbPackage className="icon" /> Pickup{" "}
                  </button>
                  <button
                    type="button"
                    className={`${
                      provideDelivery ? "delivery selected" : "delivery"
                    }`}
                    onClick={() => setProvideDelivery(true)}
                  >
                    {" "}
                    <TbTruckDelivery className="icon" /> Delivery{" "}
                  </button>
                </div>
                {!provideDelivery && (
                  <div className="pickup-info">
                    <h2>
                      Pickup location will be provided at the contact
                      information 2 days prior
                    </h2>
                  </div>
                )}

                {provideDelivery && (
                  <div className="delivery-info">
                    <h2>Equipments will be delivered to provided location</h2>
                    <h3>Charges for the delivery will be applied</h3>
                  </div>
                )}
              </div>
            </section>
            <section>
              <h4>3. Payment Method</h4>
              <div className="payment-method">
                <button
                  type="button"
                  className={`${payByEsewa ? "esewa selected" : "esewa"}`}
                  onClick={() => setPayByEsewa(true)}
                >
                  e-Sewa
                </button>
                <button
                  type="button"
                  className={`${!payByEsewa ? "khalti selected" : "khalti"}`}
                  onClick={() => setPayByEsewa(false)}
                >
                  Khalti
                </button>
              </div>
            </section>
          </form>
        </div>
      </main>
      <aside>
        <h1 className="title">Orders</h1>
        <div className="checkout-items">
          <Slider {...settings}>
            {cartItems.map((item) => {
              const { id, equipment, location, quantity } = item;
              console.log(equipment);
              return (
                <div key={id} className="items-info">
                  <img
                    src={`${mainUrl}${equipment.featured_image}`}
                    alt="product"
                  />
                  <div>
                    <p className="qty">
                      <span>Quantity: </span>
                      {quantity}
                    </p>
                    <AnimatePresence>
                      {provideDelivery && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          exit={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.4 }}
                          style={{ margin: 0 }}
                          className="delivery-location"
                        >
                          <span>Location: </span>
                          {location}
                        </motion.p>
                      )}
                    </AnimatePresence>
                    {/* Can't add this because there is no price in cart item model */}
                    {/* <p className="price">
                      <span>Price: </span>
                      {price}
                    </p> */}
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
        <CartTotals payment_method={payByEsewa ? "esewa" : "khalti"} />

        {/* {userId && userId !== 0 ? ( */}
        {userId !== 0 ? (
          // <Link to="/checkout">
          <button
            type="button"
            className="checkout-btn"
            onClick={() => {
              if (refContainer.current.reportValidity()) {
                refContainer.current.dispatchEvent(
                  new Event("submit", { bubbles: true, cancelable: true })
                );
              }
            }}
          >
            Confirm booking
          </button>
        ) : (
          // </Link>
          <div className="login-signup-popup">
            {/* <h3 className="login-text" onClick={() => setShowLogin(true)}> */}
            <h3 className="login-text">Please login to checkout</h3>

            {loading ? (
              <ReactLoading
                type="spinningBubbles"
                color="blue"
                className="loading-spinner"
              />
            ) : (
              <LoginSignup />
            )}
          </div>
        )}
      </aside>
    </Wrapper>
  );
};

// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 4.8rem 12.8rem;

  /* form {
    display: grid;
    grid-template-columns: 3fr 1fr;
    padding: 4.8rem 12.8rem;
  } */

  main,
  aside {
    h1 {
      font-size: 2.4rem;
    }
  }

  main {
    .back-btn {
      border: none;
      background: none;
      float: left;
      font-size: 3rem;
      margin-right: 3rem;
    }
  }

  .checkout-body {
    section {
      padding: 1.6rem;

      h4 {
        font-size: 1.2rem;
        margin-bottom: 0.8rem;
      }
    }
    .contact-info {
      display: grid;
      grid-template-columns: 1fr 1fr;

      div {
        margin: 1.2rem 0;
      }

      label {
        color: var(--primary-color);
        font-weight: 600;
        font-size: 1.2rem;
        text-transform: uppercase;
      }

      input {
        border-radius: 4px;
        border: 2px solid var(--border-gray);
        padding: 0.4rem;
        margin: 0.4rem 0;
        margin-bottom: 0.8rem;
        width: 70%;
        height: 3rem;
        font-size: 1.2rem;
      }
      input:focus {
        outline: 2px solid var(--primary-black);
      }
      textarea {
        padding: 0.4rem;
      }

      span {
        font-weight: 600;
        font-size: 1.2rem;
        background-color: var(--primary-color);
        /* height: 3rem; */
        color: white;
        padding: 0.8rem 0.4rem;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        /* margin-right: -5px; */
      }

      span + input {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        width: 62%;
      }
    }

    .delivery-method {
      .delivery-pickup {
        display: flex;
        gap: 2.4rem;
        margin: 1.2rem 0;

        button {
          display: flex;
          align-items: center;
          border: none;
          color: var(--primary-black);
          background-color: var(--secondary-color);
          padding: 0.4rem 0.8rem;
          font-size: 1.4rem;
          border-radius: 5px;
          cursor: pointer;
          font-weight: 600;
        }
        .icon {
          font-size: 3rem;
          background-color: var(--primary-color);
          color: var(--primary-gray);
          padding: 0.4rem;
          border-radius: 50%;
          margin-right: 0.8rem;
        }

        .selected {
          border: 2px solid var(--primary-color);

          .icon {
            color: var(--primary-white);
          }
        }
      }

      .pickup-info {
        h2 {
          margin-top: 0.4rem;
          font-style: italic;
        }
      }

      .delivery-info {
        h3 {
          margin-top: 0.4rem;
          font-style: italic;
        }
      }
    }

    .payment-method {
      display: flex;
      justify-content: flex-start;

      button {
        border: none;
        background-color: none;
        padding: 0.8rem 1.2rem;
        border-radius: 4px;
        margin: 0 0.8rem;
        color: white;
        font-size: 1.4rem;
        letter-spacing: 1px;
        cursor: pointer;
      }

      .esewa {
        background-color: #4cae30;
      }

      .khalti {
        background-color: #5d2e8e;
      }

      .selected {
        border: 3px solid var(--primary-color);
      }
    }
  }

  aside {
    overflow: hidden;
    padding: 1.2rem 1.6rem;
    border: 2px solid var(--primary-color);
    border-radius: 5px;

    .checkout-items {
      margin-bottom: 3.2rem;

      .items-info {
        text-align: center;
        img {
          /* width: 9.8rem; */
          margin: auto;
          width: 100%;
          /* height: 20rem; */
        }
        div {
          margin: auto;
          p {
            font-size: 1.4rem;
            font-weight: 500;
            margin: 0.4rem 0;

            span {
              color: var(--primary-gray);
            }
          }
        }
      }
      .slick-arrow {
        background-color: var(--primary-black);
        color: var(--primary-white);
        margin: 0 1.2rem;
      }
      .slick-arrow::before {
        opacity: 1;
      }
    }

    .loading-spinner {
      margin: 1.6rem auto;
    }

    .checkout-btn {
      border: none;
      background-color: var(--primary-color);
      color: white;
      width: 100%;
      padding: 0.8rem 1.2rem;
      border-radius: 4px;
      margin-top: 1.6rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 600;
      cursor: pointer;
    }
  }

  .slick-slider {
    margin-top: 1.2rem;
    .slick-slide {
      display: flex;
      justify-content: center;
      align-items: center;

      div {
        width: 70%;
      }
    }
  }

  /**************************/
  /* BELOW 1344px (Smaller desktops) */
  /**************************/

  @media (max-width: 84em) {
    padding: 5.8rem 9rem;
  }

  /**************************/
  /* BELOW 1200px (Landscape Tablets) */
  /**************************/

  @media (max-width: 75em) {
    grid-template-columns: 2fr 1fr;

    .checkout-body {
      .contact-info {
        input {
          width: 85%;
        }

        span + input {
          width: 70%;
        }
      }
    }
  }

  /**************************/
  /* BELOW 944px (Tablets) */
  /**************************/

  @media (max-width: 59em) {
    padding: 5.8rem 1rem;
  }

  /**************************/
  /* BELOW 704px (Smaller tablets) */
  /**************************/

  @media (max-width: 44em) {
    grid-template-columns: 1fr;
    padding: 5.8rem 0.2rem;

    aside {
      /* padding: 1.2rem 15rem; */
      margin: 1.2rem 15rem;
    }

    .checkout-body {
      .contact-info {
        input {
          width: 90%;
        }

        span + input {
          width: 79%;
        }
      }
    }
  }

  .login-text {
    font-size: 1.8rem;
    color: var(--primary-color);
    text-align: center;
    margin: 3.2rem 0 2.4rem 0;
  }

  .login-signup-btns {
    display: none;
  }

  /**************************/
  /* BELOW 544px (Phones) */
  /**************************/

  @media (max-width: 34em) {
    aside {
      margin: 0 0.8rem;
    }

    .slick-list {
      /* width: 256px; */
      width: 80%;
      margin: auto;
    }

    .checkout-body {
      .contact-info {
        grid-template-columns: 1fr;
        input {
          width: 90%;
        }

        span + input {
          width: 80%;
        }
      }
    }
  }
`;

export default Checkout;
