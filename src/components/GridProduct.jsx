import React, { useState } from "react";
import styled from "styled-components";
import { getFormattedDaysString } from "../utils/helpers";

import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import SingleProduct from "../pages/SingleProduct";
import ModalPopup from "./ModalPopup";

const GridProduct = ({ info, showQuickView }) => {
  const { id, name, price, featured_image } = info;

  const [showAllPrices, setShowAllPrices] = useState(false);

  const [quickView, setQuickView] = useState(false);

  //Converting object to array
  const prices = Object.entries(price);

  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
    >
      <Wrapper>
        {quickView && (
          <ModalPopup handleFunc={() => setQuickView(false)}>
            <div className="quick-view-box">
              <SingleProduct productId={id} />
            </div>
          </ModalPopup>
        )}

        <div>
          <AnimatePresence>
            {showQuickView && (
              <motion.div
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.1 }}
                className="quick-view"
                onClick={() => setQuickView(true)}
              >
                Quick view
              </motion.div>
            )}
          </AnimatePresence>

          <Link to={`/product/${id}`} className="product-link">
            <img src={featured_image} alt="product-img" />
          </Link>
        </div>
        <Link to={`/product/${id}`}>
          <h5>{name}</h5>
        </Link>
        <footer>
          <ul>
            {prices.map((p, idx) => {
              return (
                <li
                  key={idx}
                  className={idx === 0 || showAllPrices ? "show" : "hide-it"}
                >
                  <div>
                    <p>Rs. {p[1]} / day</p>
                    <span>
                      {getFormattedDaysString(p[0])}{" "}
                      {getFormattedDaysString(p[0]) === "1" ? "Day" : "Days"}
                    </span>
                  </div>
                  <button
                    type="button"
                    className={
                      idx === 0 && !showAllPrices ? "show-it" : "hide-it"
                    }
                    onClick={() => setShowAllPrices(true)}
                  >
                    <RiArrowDropDownLine />
                  </button>
                  <button
                    type="button"
                    className={
                      idx === 0 && showAllPrices ? "show-it" : "hide-it"
                    }
                    onClick={() => setShowAllPrices(false)}
                  >
                    <RiArrowDropUpLine />
                  </button>
                </li>
              );
            })}
          </ul>
        </footer>
      </Wrapper>
    </motion.div>
  );
};

// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

const Wrapper = styled.article`
  background-color: var(--primary-white);
  border-radius: 10px;
  padding: 1rem;
  position: relative;

  .modal {
    width: 90%;
  }

  .quick-view-box {
    background-color: white;
    margin: 10px;
    border-radius: 10px;
    z-index: 100;
  }

  .quick-view {
    display: none;
    position: absolute;
    top: 59%;
    left: 50%;
    transform: translate(-50%, -59%);
    width: 100%;
    text-align: center;
    cursor: pointer;
    background-color: rgba(112, 72, 232, 0.4);
    color: white;
    padding: 0.4rem 0;
    font-weight: 500;
    font-size: 1.4rem;
    z-index: 98;
    transition: all 0.4s;
  }

  :hover {
    .quick-view {
      display: block;
    }
  }
  .quick-view:hover {
    background-color: var(--primary-color);
  }

  .product-link {
    display: block;
    text-align: center;
    position: relative;

    img {
      width: 100%;
      height: 17.5rem;
      object-fit: scale-down;
      border-radius: 0.8rem;
    }
  }

  h5 {
    font-weight: 600;
    font-size: 1.6rem;
  }

  footer {
    margin-top: 0.4rem;
    padding: 0 1.6rem;
    font-family: "Roboto";

    .show {
      /* display: grid; */
    }

    li {
      display: grid;
      grid-template-columns: 1fr 3rem;
      align-items: center;
      transition: height 1s linerar;
      /* transition: all 1s; */
      div {
        display: flex;
        justify-content: space-between;
        font-size: 1.4rem;
      }

      button {
        border: none;
        background: none;
        font-size: 3rem;
        height: 3rem;
        cursor: pointer;
      }
    }

    span {
      color: var(--primary-color);
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
    input,
    select {
      width: 100%;
    }
  }

  /**************************/
  /* BELOW 944px (Tablets) */
  /**************************/

  @media (max-width: 59em) {
    padding: 0;
    .product-link {
      img {
        width: 75%;
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
  }
`;

export default GridProduct;
