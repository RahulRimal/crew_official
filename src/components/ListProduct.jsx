import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import styled from "styled-components";
import { getFormattedDaysString } from "../utils/helpers";

const ListProduct = ({ info }) => {
  const { name, description, price, featured_image } = info;

  const [showAllPrices, setShowAllPrices] = useState(false);

  const prices = Object.entries(price);

  return (
    <motion.div
      layout
      animate={{ opacity: 1, height: "auto" }}
      initial={{ opacity: 0, height: 0 }}
      exit={{ opacity: 0, height: 0 }}
    >
      <Wrapper>
        <img src={featured_image} alt="product-img" />
        <div className="product-info">
          <h5>{name}</h5>
          <footer>
            <AnimatePresence>
              <motion.div
                layout
                animate={{ opacity: 1, height: "auto" }}
                initial={{ opacity: 0, height: 0 }}
                exit={{ opacity: 0, height: 0 }}
              >
                <ul>
                  {prices.map((p, idx) => {
                    return (
                      <li
                        key={idx}
                        className={
                          idx === 0 || showAllPrices ? "show" : "hide-it"
                        }
                      >
                        <div>
                          <p>Rs. {p[1]} / day</p>
                          <span>
                            {getFormattedDaysString(p[0])}{" "}
                            {getFormattedDaysString(p[0]) === "1"
                              ? "Day"
                              : "Days"}
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
                  {/* </motion.div> */}
                  {/* </AnimatePresence> */}
                </ul>
              </motion.div>
            </AnimatePresence>
          </footer>
          <p className="product-desc">{description}</p>
          <button className="btn">details</button>
        </div>
      </Wrapper>
    </motion.div>
  );
};

// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

const Wrapper = styled.article`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2.4rem;
  background-color: var(--primary-white);
  border-radius: 10px;
  padding: 1rem;

  img {
    /* width: auto; */
    width: 20rem;
    height: 20rem;
    /* max-height: 100%; */
    object-fit: contain;
    border-radius: 0.8rem;
  }

  .product-info {
    display: flex;
    flex-direction: column;
  }

  h5 {
    font-weight: 600;
    font-size: 1.6rem;
  }

  footer {
    margin-top: 0.4rem;
    /* width: 25rem; */
    font-family: "Roboto";
    li {
      width: 25rem;
      display: flex;
      font-size: 1.2rem;
      gap: 0.4rem;
      font-weight: 600;

      button {
        border: none;
        background: none;
        font-size: 3rem;
        height: 3rem;
        cursor: pointer;
      }
    }

    li > div {
      display: flex;
      align-items: center;
      gap: 6.4rem;
    }

    span {
      color: var(--primary-color);
    }
  }

  .product-desc {
    font-size: 1.4rem;
    margin-top: 1.2rem;
    letter-spacing: 1px;
  }

  .btn {
    border: none;
    background: var(--primary-color);
    color: var(--primary-white);
    width: 9.2rem;
    text-transform: uppercase;
    padding: 0.8rem 1.8rem;
    border-radius: 3px;
    margin-top: 1.4rem;
    cursor: pointer;
  }
`;

export default ListProduct;
