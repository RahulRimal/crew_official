import React, { useEffect, useState } from "react";
import styled from "styled-components";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import { DateRange } from "react-date-range";
import { useDispatch, useSelector } from "react-redux";

import {
  updateOptions,
  clearOptions,
} from "../features/productOptions/productOptionsSlice";

import { addToCart, getCartItems } from "../features/cart/cartSlice";

import { updateNotification } from "../features/notification/notificationSlice";

import { Link } from "react-router-dom";

import {
  formatDate,
  getDaysDifference,
  getSelectedIndexAndPrice,
  getBookingAmount,
  getFormattedDaysString,
  formatPrice,
} from "../utils/helpers";
import axios from "axios";
import { mainUrl } from "../constants";

const ProductOptionsSelection = ({ product }) => {
  const { id, name, price, pictures } = product;
  const dispatch = useDispatch();

  const {
    startDate,
    endDate,
    selectedDays,
    selectedPrice,
    selectedQuantity,
    selectedLocation,
    agreedToSubmitDocument,
  } = useSelector((store) => store.productOptions);

  const { id: cartId, cartItems } = useSelector((store) => store.cart);

  const [showCalendar, setShowCalendar] = useState(false);
  const [selectionCount, setSelectionCount] = useState(0);
  const [itemInCart, setItemInCart] = useState(false);

  const prices = Object.entries(price);

  let [userSelectedIndex, userSelectedPrice] = getSelectedIndexAndPrice(
    price,
    selectedDays
  );

  useEffect(() => {
    let selectedTenure = `${startDate}-${endDate}`;
    const check = cartItems.map((item) => {
      if (
        id === item.equipment.id &&
        selectedLocation == item.location &&
        selectedQuantity == item.quantity &&
        selectedTenure == item.tenure
      )
        return true;
      return false;
    });
    setItemInCart(check[check.length - 1]);
  }, [cartItems, selectedLocation, selectedQuantity, endDate]);

  useEffect(() => {
    const name = "selectedPrice";
    const value = userSelectedPrice;

    dispatch(updateOptions({ name, value }));
  }, [userSelectedIndex]);

  useEffect(() => {
    dispatch(clearOptions());
  }, []);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const handleChange = (item) => {
    setState([item.selection]);
    let count = selectionCount;
    setSelectionCount(++count);
    if (selectionCount >= 1) {
      setTimeout(() => {
        setShowCalendar(false);
      }, 500);
      setSelectionCount(0);
      let name = "startDate";
      let value = item.selection.startDate;
      dispatch(updateOptions({ name, value }));
      name = "endDate";
      value = item.selection.endDate;
      dispatch(updateOptions({ name, value }));
      name = "selectedDays";
      value = getDaysDifference(
        item.selection.startDate,
        item.selection.endDate
      );
      dispatch(updateOptions({ name, value }));
    }
  };

  // console.log(itemInCart);

  return (
    <Wrapper>
      <h1 className="title">{name}</h1>
      <div className="prices">
        {prices.map((p, idx) => {
          // console.log(p);
          return (
            <div
              className={
                userSelectedIndex === idx ? "container selected" : "container"
              }
              key={idx}
            >
              <p>
                {getFormattedDaysString(p[0])}{" "}
                {getFormattedDaysString(p[0]) === "1" ? "Day" : "Days"}
              </p>
              <span>Rs. {formatPrice(p[1])}</span>
            </div>
          );
        })}
      </div>
      <div className="total-and-booking">
        <div className="container">
          <p>Total Rent</p>
          <h3>
            Rs. {formatPrice(selectedPrice * selectedQuantity * selectedDays)}
          </h3>
          <span>
            Price is for {selectedDays} {selectedDays <= 1 ? "day" : "days"}
          </span>
        </div>
        <div className="container">
          <p>Book Now</p>
          <h3>
            Rs.{" "}
            {formatPrice(
              getBookingAmount(selectedPrice * selectedQuantity * selectedDays)
            )}
          </h3>
          <span>&amp; pay rest later</span>
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // const tenure = formatDate(startDate) + " - " + formatDate(endDate);
          // const newItem = {
          //   id: cartItems.length + 1,
          //   name: name,
          //   price: selectedPrice,
          //   quantity: selectedQuantity,
          //   tenure: tenure,
          //   location: selectedLocation,
          //   pictures: pictures,
          // };

          // dispatch(addToCart(newItem));
        }}
      >
        <div className="pickup-and-quantity">
          <div>
            <label htmlFor="location" className="required">
              Choose Site Pickup/Delivery
            </label>
            <br />
            <select
              name="selectedLocation"
              value={selectedLocation}
              // placeholder="Select pick-up or delivery site"
              onChange={(e) => {
                let name = e.target.name;
                let value = e.target.value;
                dispatch(updateOptions({ name, value }));
              }}
              required
            >
              <option value="" disabled selected>
                Select pick-up or delivery site
              </option>
              <option value="Kathmandu">Kathmandu</option>
              <option value="Lalitpur">Lalitpur</option>
              <option value="Bhaktapur">Bhaktapur</option>
            </select>
          </div>
          <div>
            <label htmlFor="quantity">Quantity</label>
            <br />
            <input
              type="number"
              name="selectedQuantity"
              min="1"
              max="5"
              value={selectedQuantity}
              onChange={(e) => {
                let name = e.target.name;
                let value = e.target.value;
                dispatch(updateOptions({ name, value }));
              }}
            />
          </div>
        </div>
        <div className="date-picker">
          <div>
            <label htmlFor="quantity" className="required">
              Select Your Date
            </label>
            <br />
            <input
              className="date-picker-input"
              onFocus={() => setShowCalendar(true)}
              value={
                startDate && `${formatDate(startDate)} - ${formatDate(endDate)}`
              }
              onChange={() => {}}
              required
            />
          </div>
          <div>
            <label>Days selected</label>
            <input
              type="text"
              className="days-count"
              value={selectedDays}
              readOnly={true}
            />
          </div>
          <DateRange
            className={showCalendar ? "show-it" : "hide-it"}
            editableDateInputs={true}
            // onChange={(item) => setState([item.selection])}
            onChange={(item) => handleChange(item)}
            moveRangeOnFirstSelection={false}
            ranges={state}
          />
        </div>
        <div className="security-deposit">
          <label className="required">Security Deposit (Refundable)</label>
          <br />
          <div>
            <input
              type="checkbox"
              checked={agreedToSubmitDocument}
              onChange={() => {
                let name = "agreedToSubmitDocument";
                let value = !agreedToSubmitDocument;
                dispatch(updateOptions({ name, value }));
              }}
              required
            />

            <span>We will submit a Govt. ID and a Post Dated Cheque</span>
          </div>
        </div>

        {!itemInCart && (
          <div className="login-addcart-btns">
            {/* <Link to="/cart"> */}
            <button
              // type="submit"
              className="add-to-cart-btn"
              onClick={(e) => {
                const url = `${mainUrl}carts/${cartId}/items/`;
                const tenure = `${startDate}-${endDate}`;
                axios
                  .post(url, {
                    equipment_id: id,
                    quantity: selectedQuantity,
                    location: selectedLocation,
                    tenure: tenure,
                  })
                  .then((res) => {
                    dispatch(getCartItems(cartId));

                    let name = "message";
                    let value = "Equipment successfully added to the cart";
                    dispatch(updateNotification({ name, value }));
                    name = "showModal";
                    value = true;
                    dispatch(updateNotification({ name, value }));
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
            >
              Add to cart
            </button>
            {/* </Link> */}
            <button className="book-now-btn">Book now</button>
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
      </form>
    </Wrapper>
  );
};

// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

const Wrapper = styled.div`
  padding: 2.4rem;

  .title {
    text-align: center;
    color: var(--primary-black);
    margin: 1.2rem 0;
  }

  .prices {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin-bottom: 1.2rem;

    .container {
      text-align: center;
      background-color: var(--secondary-color);
      color: var(--primary-gray);
      font-size: 1.4rem;
      padding-bottom: 0.8rem;

      p {
        background-color: var(--primary-color);
        margin-bottom: 0.4rem;
        color: var(--primary-black);
        padding: 0.2rem 0;
      }
    }

    .container:not(:last-child) {
      border-right: 2px solid var(--border-gray);
    }
  }

  .total-and-booking {
    display: grid;
    grid-template-columns: 1fr 1fr;

    margin: 1.6rem 0;

    .container {
      text-align: center;
      border: 1px solid var(--border-gray);

      p {
        font-size: 1.4rem;
        font-weight: 500;
      }

      h3 {
        font-size: 1.6rem;
        font-weight: 600;
        color: var(--primary-color);
      }

      span {
        font-size: 1.2rem;
      }

      /* .booking-price {
        color: var(--secondary-color);
      } */
    }
  }

  .pickup-and-quantity {
    display: flex;
    justify-content: space-between;
    align-items: center;

    label {
      font-size: 1.2rem;
      font-weight: 500;
    }

    select,
    input {
      width: 100%;
      height: 2.4rem;
      border: none;
      outline: none;
      border-radius: 0.4rem;
      padding: 0 0.4rem;
      font-size: 1.6rem;
      font-family: "Roboto";
      /* Sizing system is extended here because we need big input field */
      color: var(--primary-gray);
      background-color: var(--secondary-color);
      margin-top: 0.4rem;
    }
    input {
      width: 15.5rem;
    }
  }

  .date-picker {
    margin-top: 1.6rem;

    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 1.2rem;
    label {
      font-size: 1.2rem;
      font-weight: 500;
    }
    .date-picker-input,
    .days-count {
      width: 100%;
      height: 2.4rem;
      border: none;
      outline: none;
      border-radius: 0.4rem;
      padding: 0 0.4rem;
      font-size: 1.6rem;
      font-family: "Roboto";
      /* Sizing system is extended here because we need big input field */
      color: var(--primary-gray);
      background-color: var(--secondary-color);
      margin-top: 0.4rem;
    }

    .days-count {
      align-self: end;
    }
  }

  .security-deposit {
    margin-top: 1.6rem;

    label {
      font-size: 1.2rem;
      font-weight: 500;
    }

    div {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 0.8rem;
      span {
        font-size: 1.2rem;
        font-weight: 600;
        margin-top: 0.2rem;
      }
    }

    input {
      height: 2.4rem;
      width: 2rem;
      border: none;
      outline: none;
      border-radius: 0.4rem;
      padding: 0 0.4rem;
      font-size: 1.6rem;
      font-family: "Roboto";
      /* Sizing system is extended here because we need big input field */
      color: var(--primary-gray);
      background-color: var(--secondary-color);
      margin-top: 0.4rem;
    }
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
  }

  .continueshop-checkoutt-btns {
    margin-top: 5.2rem;
    h1 {
      text-align: center;
    }
  }

  .selected {
    border: 3px solid var(--primary-black);
    border-right: 3px solid var(--primary-black) !important;
    p {
      color: var(--primary-white) !important;
    }
  }

  .rdrCalendarWrapper {
    border: 2px solid var(--primary-color);
    border-radius: 5px;
    margin-top: -26px;
  }
  .rdrDateDisplay {
    margin: 0;
  }
  .rdrMonthsVertical {
    align-items: center;
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
    .pickup-and-quantity {
      display: flex;
      justify-content: space-between;
      align-items: center;

      label {
        font-size: 1.2rem;
        font-weight: 500;
      }

      select,
      input {
        width: 100%;
        height: 2.4rem;
        border: none;
        outline: none;
        border-radius: 0.4rem;
        padding: 0 0.4rem;
        font-size: 1.6rem;
        font-family: "Roboto";
        /* Sizing system is extended here because we need big input field */
        color: var(--primary-gray);
        background-color: var(--secondary-color);
        margin-top: 0.4rem;
      }
      input {
        width: 8.6rem;
      }
    }
  }
`;

export default ProductOptionsSelection;
