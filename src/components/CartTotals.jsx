import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { formatPrice, getAmountWithTax, getTaxAmount } from "../utils/helpers";

const CartTotals = () => {
  const { cartTotal } = useSelector((store) => store.cart);

  return (
    <Wrapper>
      <div className="cart-totals">
        <div>
          <p>Subtotal:</p>
          <span>Rs. {formatPrice(cartTotal)}</span>
        </div>
        <div>
          <p>Sales Tax:</p>
          <span>Rs. {formatPrice(getTaxAmount(cartTotal))} </span>
        </div>
        {/* <div>
          <p>Coupon code:</p>
          <span>Rs 109</span>
        </div> */}
        <div className="grand-total">
          <p>Grand Total:</p>
          <span>Rs. {formatPrice(getAmountWithTax(cartTotal))}</span>
        </div>
        <Link to="/checkout">
          <button type="button">Checkout</button>
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .cart-totals {
    /* width: 35%; */
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

    .grand-total {
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
`;

export default CartTotals;
