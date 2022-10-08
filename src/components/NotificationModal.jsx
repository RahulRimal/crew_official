import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const NotificationModal = ({ text, handleFunc }) => {
  return (
    <Wrapper>
      <motion.article
        className="main"
        onClick={handleFunc}
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 1 }}
      >
        <h3>{text}</h3>
      </motion.article>
    </Wrapper>
  );
};

// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

const Wrapper = styled.div`
  text-align: center;
  position: fixed;
  top: 5vh;
  /* bottom: 15vh; */
  left: 30vw;
  z-index: 999;

  .main {
    /* width: 20rem; */
    /* height: 3rem; */
    display: inline-block;
    padding: 1.8rem 4.4rem;
    border: 2px solid var(--primary-black);
    border-radius: 5px;
    background-color: var(--primary-white);
    text-transform: capitalize;
  }
`;

export default NotificationModal;
