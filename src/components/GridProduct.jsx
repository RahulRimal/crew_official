import React, { useState } from "react";
import styled from "styled-components";
import { getFormattedDaysString } from "../utils/helpers";

import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const GridProduct = ({ info }) => {
  const { id, name, price, featured_image } = info;

  const [showAllPrices, setShowAllPrices] = useState(false);

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
        <Link to={`/product/${id}`}>
          <img src={featured_image} alt="product-img" />
        </Link>
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
            {/* {prices.map((p, idx) => {
            return (
              <li key={idx}>
                <p>Rs. {p[1]} / day</p>
                <span>
                  {getFormattedDaysString(p[0])}{" "}
                  {getFormattedDaysString(p[0]) === "1" ? "Day" : "Days"}
                </span>
              </li>
            );
          })} */}
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
  /* border: 1px solid var(--secondary-gray); */
  /* padding: 0.8rem; */
  img {
    width: 100%;
    height: 17.5rem;
    /* height: auto; */
    /* object-fit: cover; */
    object-fit: scale-down;
    border-radius: 0.8rem;
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
`;

export default GridProduct;
