import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { getCartItems, calculateTotals } from "../features/cart/cartSlice";
import { CartItem, CartTotals } from "./index";

const ProductCart = () => {
  // const { pictures } = product;

  const dispatch = useDispatch();

  const { cartItems, cartTotal, totalCartItems } = useSelector(
    (store) => store.cart
  );

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  if (totalCartItems < 1) {
    return (
      <Wrapper>
        <div className="empty-cart">
          <h4>Your cart is empty !!</h4>
          <Link to="/" className="btn">
            Continue Shopping
          </Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h1 className="cart-title">Your Cart Items {`(${cartItems.length})`}</h1>
      <div className="cart-table">
        <div className="cart-headings">
          <h3>Name</h3>
          <h3>Quantity</h3>
          <h3>Total Rent Price</h3>
          <h3>Booking Amount</h3>
        </div>

        <div className="cart-body">
          {cartItems.map((item) => {
            return <CartItem item={item} key={item.id} />;
          })}
        </div>
      </div>
      <footer className="cart-footer">
        <div>
          <CartTotals />
          <Link to="/checkout" className="to-checkout">
            <button type="button">Go to checkout</button>
          </Link>
        </div>
      </footer>
    </Wrapper>
  );
};

// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

const Wrapper = styled.section`
  padding: 4.8rem 15rem;

  .empty-cart {
    text-align: center;
    height: 50vh;
    font-size: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .btn {
      border: none;
      background-color: var(--primary-color);
      padding: 0.8rem 1.2rem;
      color: var(--primary-white);
      font-size: 1.6rem;
      font-weight: 600;
      letter-spacing: 1px;
      margin-top: 2.4rem;
      border-radius: 0.4rem;
    }
  }

  .cart-title {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 3.2rem;
  }

  .cart-table {
    text-align: center;
    color: var(--primary-black);
    border: 2px solid var(--primary-color);
    border-radius: 5px;
    .cart-headings {
      display: block;
      display: grid;
      grid-template-columns: 2fr repeat(3, 1fr);
      /* grid-template-columns: repeat(4, 1fr); */
      justify-items: left;
      padding: 1.2rem 0;
      background-color: var(--primary-color);
      color: var(--primary-white);
      font-size: 1.4rem;
      text-transform: uppercase;

      h3:first-child {
        padding-left: 3rem;
      }
    }
  }

  .cart-footer {
    margin-bottom: 3.2rem;
    .cart-totals {
      width: 35%;
    }

    .to-checkout {
      display: block;
      text-align: end;
      button {
        border: none;
        background-color: var(--primary-color);
        color: white;
        width: 35%;
        padding: 0.8rem 1.2rem;
        border-radius: 4px;
        margin-top: 1.6rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: 600;
        cursor: pointer;
      }
    }
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
    padding: 4.8rem 2rem;
  }

  /**************************/
  /* BELOW 944px (Tablets) */
  /**************************/

  @media (max-width: 59em) {
    .cart-table {
      .cart-headings {
        grid-template-columns: 3fr 1fr 1fr 1fr;
      }
    }
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
    padding: 2rem;

    .cart-table {
      .cart-headings {
        display: none;
      }
    }

    .cart-footer {
      .cart-totals {
        width: 50%;

        div {
          font-size: 1.2rem;
        }

        div:last-child {
          font-size: 1.4rem;
        }
      }
    }
  }
`;

export default ProductCart;
