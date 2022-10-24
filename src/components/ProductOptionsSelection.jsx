import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import ProductOptionsSelectionForm from "./ProductOptionsSelectionForm";

const ProductOptionsSelection = ({ product }) => {
  const { id, name } = product;

  const cartItemOptionsFormRef = useRef();

  const [itemInCart, setItemInCart] = useState(false);
  const { cartItems } = useSelector((store) => store.cart);
  const {
    startDate,
    endDate,
    selectedQuantity,
    selectedLocation,
    agreedToSubmitDocument,
  } = useSelector((store) => store.productOptions);

  useEffect(() => {
    let selectedTenure = `${startDate}-${endDate}`;
    const check = cartItems.map((item) => {
      if (
        id === item.equipment.id &&
        selectedLocation === item.location &&
        selectedQuantity === item.quantity &&
        selectedTenure === item.tenure
      )
        return true;
      return false;
    });
    setItemInCart(check[check.length - 1]);
  }, [cartItems, id, selectedLocation, selectedQuantity, startDate, endDate]);

  return (
    <Wrapper>
      <h1 className="title">{name}</h1>
      <ProductOptionsSelectionForm
        product={product}
        cartItemOptionsFormRef={cartItemOptionsFormRef}
      />
      {!itemInCart && (
        <div className="login-addcart-btns">
          {/* <Link to="/cart"> */}
          {/* <button type="submit" className="add-to-cart-btn"> */}
          <button
            type="button"
            className="add-to-cart-btn"
            disabled={!agreedToSubmitDocument}
            onClick={() => {
              if (cartItemOptionsFormRef.current.reportValidity()) {
                cartItemOptionsFormRef.current.dispatchEvent(
                  new Event("submit", { bubbles: true, cancelable: true })
                );
              }
            }}
          >
            Add to cart
          </button>
          {/* </Link> */}
          <button disabled={!agreedToSubmitDocument} className="book-now-btn">
            Book now
          </button>
        </div>
      )}

      {itemInCart && (
        <div className="continueshop-checkoutt-btns">
          <h1>Equipment is already in the cart</h1>
          <div>
            <Link to="/products">
              <button
                className="add-to-cart-btn"
                // onClick={(e) => {

                //   console.log(newItem);
                // }}
              >
                Continue shopping
              </button>
            </Link>
            <Link to="/cart">
              <button className="checkout-btn">Go to Cart</button>
            </Link>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

const Wrapper = styled.div`
  padding: 2.4rem;

  h1 {
    margin-bottom: 1.6rem;
  }

  .login-addcart-btns,
  .continueshop-checkoutt-btns div {
    display: flex;
    justify-content: space-evenly;
    margin-top: 1.2rem;

    button {
      border: none;
      background: var(--primary-color);
      color: var(--primary-white);
      padding: 1.2rem;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1.4rem;
      font-weight: 500;
      text-transform: uppercase;
    }

    button:disabled {
      opacity: 0.6;
      cursor: default;
    }
  }

  .continueshop-checkoutt-btns {
    margin-top: 5.2rem;
    h1 {
      text-align: center;
    }
  }
`;

export default ProductOptionsSelection;
