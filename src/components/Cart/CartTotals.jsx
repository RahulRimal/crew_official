import React from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";

import {
  formatPrice,
  getAmountWithTax,
  getBookingAmount,
  getTaxAmount,
} from "../../utils/helpers";
// import LoginSignup from "./LoginSignup";

const CartTotals = ({ payment_method }) => {
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
        <div>
          <p>Total Booking Amount:</p>
          <span>Rs. {formatPrice(getBookingAmount(cartTotal))} </span>
        </div>
        {/* <div>
          <p>Coupon code:</p>
          <span>Rs 109</span>
        </div> */}
        <div className="grand-total">
          <p>Grand Total:</p>
          <span>Rs. {formatPrice(getAmountWithTax(cartTotal))}</span>
        </div>
      </div>
    </Wrapper>
  );
};

// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

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
`;

export default CartTotals;
