import React, { useEffect, useState } from "react";

import styled from "styled-components";

import { MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginSignup from "./LoginSignup";

import { removeUser } from "../features/user/userSlice";
import ModalPopup from "./ModalPopup";

const HeaderNav = () => {
  const { id: userId } = useSelector((store) => store.user);
  const { cartItems } = useSelector((store) => store.cart);

  const [showLoginSignPopup, setShowLoginSignPopup] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userId !== 0) setShowLoginSignPopup(false);
  }, [userId]);

  return (
    <Wrapper>
      <div className="header-nav">
        {userId === 0 && (
          <button className="btn" onClick={() => setShowLoginSignPopup(true)}>
            Login/Signup
          </button>
        )}
        {userId !== 0 && (
          <button
            className="btn"
            onClick={() => {
              dispatch(removeUser());
            }}
          >
            Logout
          </button>
        )}
        <button className="btn">Studios</button>
        <Link className="btn cart-btn" to="/cart">
          <MdShoppingCart />
          <span>{cartItems.length}</span>
        </Link>
      </div>
      {showLoginSignPopup && (
        <ModalPopup handleFunc={() => setShowLoginSignPopup(false)}>
          <div className="login-signup-form">
            <LoginSignup />
          </div>
        </ModalPopup>
      )}
    </Wrapper>
  );
};

// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98
const Wrapper = styled.div`
  .header-nav {
    display: flex;
    gap: 1.2rem;

    .btn {
      padding: 0.4rem 0.8rem;
      background: none;
      color: var(--primary-white);
      border: 2px solid var(--primary-white);
      border-radius: 4px;
      cursor: pointer;
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 1px;
    }

    .btn:hover {
      background: var(--primary-white);
      color: var(--primary-color);
    }

    .cart-btn {
      font-size: 1.8rem;
      padding: 0 0.2rem;
      position: relative;
      display: flex;
      align-items: center;

      span {
        position: absolute;
        background-color: var(--primary-red);
        height: 15px;
        width: 15px;
        text-align: center;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        top: -10px;
        right: -5px;
        font-size: 1.2rem;
        color: var(--primary-white);
      }
    }
  }

  .modal {
    width: 100%;
  }

  .login-signup-form {
    background-color: var(--primary-white);
    padding: 2.4rem 1.2rem;
    border-radius: 5px;
    width: 25%;
    margin: auto;
  }

  #login form {
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 0.8rem;
  }

  /**************************/
  /* BELOW 1344px (Smaller desktops) */
  /**************************/

  @media (max-width: 84em) {
  }

  /**************************/
  /* BELOW 1200px (Landscape Tablets) */
  /**************************/

  @media (max-width: 75em) {
  }

  /**************************/
  /* BELOW 944px (Tablets) */
  /**************************/

  @media (max-width: 59em) {
  }

  /**************************/
  /* BELOW 704px (Smaller tablets) */
  /**************************/

  @media (max-width: 44em) {
  }

  /**************************/
  /* BELOW 544px (Phones) */
  /**************************/

  @media (max-width: 34em) {
    .login-signup-form {
      width: 95%;
    }
  }
`;

export default HeaderNav;
