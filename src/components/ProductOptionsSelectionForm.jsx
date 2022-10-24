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

import { addItemToCart, updateCartItem } from "../features/cart/cartSlice";

import {
  formatDate,
  getDaysDifference,
  getSelectedIndexAndPrice,
  getBookingAmount,
  getFormattedDaysString,
  formatPrice,
} from "../utils/helpers";

const ProductOptionsSelectionForm = ({
  product,
  cartItemOptionsFormRef,
  cartItem,
}) => {
  const { id: productId, price } = product;
  const dispatch = useDispatch();

  useState(() => {
    if (cartItem) {
      const { location, quantity, tenure } = cartItem;

      if (location) {
        let name = "selectedLocation";
        let value = location;
        dispatch(updateOptions({ name, value }));
      }
      if (quantity) {
        let name = "selectedQuantity";
        let value = quantity;
        dispatch(updateOptions({ name, value }));
      }
      if (tenure) {
        let tenureDate = tenure.split("-");
        let name = "startDate";
        let value = tenureDate[0];
        dispatch(updateOptions({ name, value }));
        name = "endDate";
        value = tenureDate[1];
        dispatch(updateOptions({ name, value }));
      }
    }
  }, []);

  const {
    startDate,
    endDate,
    selectedDays,
    selectedPrice,
    selectedQuantity,
    selectedLocation,
    agreedToSubmitDocument,
  } = useSelector((store) => store.productOptions);

  const { id: cartId } = useSelector((store) => store.cart);

  const [showCalendar, setShowCalendar] = useState(false);
  const [selectionCount, setSelectionCount] = useState(0);

  const prices = Object.entries(price);

  let [userSelectedIndex, userSelectedPrice] = getSelectedIndexAndPrice(
    price,
    selectedDays
  );

  useEffect(() => {
    const name = "selectedPrice";
    const value = userSelectedPrice;

    dispatch(updateOptions({ name, value }));
  }, [userSelectedIndex, userSelectedPrice, dispatch]);

  useEffect(() => {
    dispatch(clearOptions());
  }, [dispatch]);

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

  return (
    <Wrapper>
      <div className="prices">
        {prices.map((p, idx) => {
          return (
            <div
              className={
                userSelectedIndex === idx ? "container selected" : "container"
              }
              key={idx}
            >
              <p>
                {getFormattedDaysString(p[0])}
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
        ref={cartItemOptionsFormRef}
        onSubmit={(e) => {
          e.preventDefault();
          const tenure = `${startDate}-${endDate}`;

          if (cartItem) {
            dispatch(
              updateCartItem({
                cartId,
                cartItemId: cartItem.id,
                selectedQuantity,
                selectedLocation,
                tenure,
              })
            );
          } else {
            dispatch(
              addItemToCart({
                cartId,
                productId,
                selectedQuantity,
                selectedLocation,
                tenure,
              })
            );
          }
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
                let value = parseInt(e.target.value);
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
            <br />
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
      </form>
    </Wrapper>
  );
};

// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

const Wrapper = styled.div`
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

export default ProductOptionsSelectionForm;
