import React, { useEffect } from "react";
import styled from "styled-components";

import {
  getBookingAmount,
  getFormattedTenure,
  getSelectedIndexAndPrice,
  formatPrice,
} from "../utils/helpers";

import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import { increase, decrease, removeItem } from "../features/cart/cartSlice";

import { getTenureDays, getPriceForTenureDays } from "../utils/helpers";
import { mainUrl } from "../constants";
import axios from "axios";

let isFirst = true;
let isSecond = true;

const CartItem = ({ item }) => {
  const { id, equipment, quantity, tenure, location } = item;
  const tenureDays = getTenureDays(tenure);
  const [_, price] = getSelectedIndexAndPrice(equipment.price, tenureDays);

  const dispatch = useDispatch();
  const { id: cartId, cartItems } = useSelector((store) => store.cart);

  let url = `${mainUrl}carts/${cartId}/items/${id}/`;
  const itemPosition = cartItems.findIndex((element) => element.id === id);

  useEffect(() => {
    if (isFirst) {
      isFirst = false;
      return;
    }
    if (isSecond) {
      isSecond = false;
      return;
    }
    axios
      .patch(url, {
        quantity: cartItems[itemPosition].quantity,
        tenure: cartItems[itemPosition].tenure,
        locations: cartItems[itemPosition].location,
      })
      .catch((error) => {
        console.log(error);
      });
  }, [quantity, tenure, location]);

  return (
    <Wrapper>
      <div className="cart-item">
        <div>
          <h3 className="cart-mobile-heading">Order Details</h3>
          <div className="order-info">
            <img src={`${mainUrl}${equipment.featured_image}`} alt="" />
            <div>
              <h3 className="name">{equipment.name}</h3>
              <p className="tenure">
                <strong> Rental Tenure: </strong>
                <span> {getFormattedTenure(tenure)}</span>
              </p>
              <p className="location">
                <strong>Location: </strong>
                {location}
              </p>
              <div className="edit-item">
                <button type="button">Change</button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 className="cart-mobile-heading">Quantity</h3>
          <div className="order-qty">
            <button
              onClick={() => {
                if (quantity === 1) {
                  axios.delete(url).then((response) => {
                    dispatch(removeItem(id));
                    return;
                  });
                }
                dispatch(decrease({ id }));
              }}
            >
              <AiOutlineMinus />
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => {
                if (quantity < 5) {
                  dispatch(increase({ id }));
                }
              }}
            >
              <AiOutlinePlus />
            </button>
          </div>
        </div>
        <div>
          <h3 className="cart-mobile-heading">Total Rent Price</h3>
          <div className="order-total">
            Rs. {formatPrice(price * quantity)} <span>({tenureDays} days)</span>
          </div>
        </div>
        <div>
          <h3 className="cart-mobile-heading">Booking Amount</h3>
          <div className="order-booking-amt">
            Rs. {formatPrice(getBookingAmount(price * quantity))}
          </div>
        </div>
      </div>
      <hr />
    </Wrapper>
  );
};

// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

const Wrapper = styled.div`
  .cart-item {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    justify-items: left;
    gap: 0.8rem;
    padding: 1.6rem 0;
    font-size: 1.4rem;
  }

  .cart-mobile-heading {
    display: none;
  }

  .order-info {
    display: flex;
    font-size: 1.2rem;
    img {
      width: 9.8rem;
      padding: 0.4rem;
      object-fit: cover;
    }

    div {
      text-align: left;
      font-weight: 500;

      .name {
        font-size: 1.8rem;
        font-weight: 600;
      }

      .tenure span {
        color: var(--primary-color);
      }

      p {
        font-size: 1.4rem;
        margin: 0.4rem 0;
      }

      button {
        background: none;
        border: none;
        color: var(--primary-color);
        cursor: pointer;
      }
    }
  }

  .order-qty {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid var(--primary-black);
    button {
      background: none;
      padding: 0.2rem 0.8rem;
      border: none;
      cursor: pointer;
    }

    span {
      border-left: 2px solid var(--primary-black);
      border-right: 2px solid var(--primary-black);
      padding: 0 1.2rem;
      font-weight: 600;
    }
  }

  .order-total span {
    font-size: 1rem;
    font-weight: 600;
    color: var(--primary-color);
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
    .cart-item {
      grid-template-columns: 3fr 1fr 1fr 1fr;
      justify-items: center;
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
    .cart-mobile-heading {
      display: block;
      background-color: var(--secondary-color);
      padding: 0.4rem 0;
      margin: 1.2rem 0;
    }

    .cart-item {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      justify-items: center;
      padding: 0;

      div {
        width: 100%;
      }

      div:first-child {
        grid-column: 1 / -1;
      }

      div:nth-child(3) {
        margin-top: -5px;
      }

      .order-qty {
        width: 50%;
        margin: 0 auto;

        button {
          padding: 0 0.2rem;
        }
      }
    }

    hr {
      height: 0.5px;
      width: 99%;
      margin: 0.4rem auto;
      background-color: var(--primary-black);
    }
  }
`;

export default CartItem;
