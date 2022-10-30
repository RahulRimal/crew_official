import React from "react";
import styled from "styled-components";

import { IoIosArrowUp } from "react-icons/io";
import { useEffect } from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const GoToTop = () => {
  console.log(window.scrollY);

  const [showGoToTop, setShowGoToTop] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const scrolledValue =
        document.body.scrollTop || document.documentElement.scrollTop;

      if (scrolledValue >= 1000) {
        setShowGoToTop(true);
      } else setShowGoToTop(false);
    });
  }, []);

  return (
    <Wrapper>
      <AnimatePresence>
        {showGoToTop && (
          <motion.div
            whileHover={{ scale: 0.9, transition: { duration: 0.01 } }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="go-to-top"
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
          >
            <IoIosArrowUp className="icon" />
          </motion.div>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .go-to-top {
    position: fixed;
    bottom: 10rem;
    right: 2.5rem;
    width: 50px;
    height: 50px;
    background-color: var(--primary-color);
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: var(--transition);
    z-index: 99;

    .icon {
      font-size: 3.5rem;
      color: var(--primary-white);
    }

    /* :hover {
      .icon {
        color: var(--primary-black);
      }
    } */
  }
`;

export default GoToTop;
