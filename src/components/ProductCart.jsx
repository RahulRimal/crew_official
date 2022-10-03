import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { getCartItems, calculateTotals } from "../features/cart/cartSlice";
import { getAmountWithTax, getTaxAmount } from "../utils/helpers";
import { CartItem } from "./index";

const ProductCart = () => {
  // const { pictures } = product;

  const dispatch = useDispatch();

  const { cartItems, cartTotal } = useSelector((store) => store.cart);

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

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
        <div className="cart-totals">
          <div>
            <p>Subtotal:</p>
            <span>Rs {cartTotal}</span>
          </div>
          <div>
            <p>Sales Tax:</p>
            <span>Rs {getTaxAmount(cartTotal)} </span>
          </div>
          <div>
            <p>Coupon code:</p>
            <span>Rs 109</span>
          </div>
          <div>
            <p>Grand Total:</p>
            <span>Rs {getAmountWithTax(cartTotal)}</span>
          </div>
          <button type="button">Checkout</button>
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
      margin-left: auto;

      div {
        display: flex;
        justify-content: space-between;
        font-size: 1.4rem;
        letter-spacing: 1px;

        padding-top: 0.8rem;

        p {
          font-weight: 600;
        }
      }

      div:not(:last-child) {
        padding-bottom: 0.8rem;
        border-bottom: 1px solid var(--border-gray);
      }
      div:last-child {
        font-size: 1.8rem;
        span {
          font-weight: 600;
          color: var(--primary-color);
        }
      }
    }

    button {
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
