import React from "react";
import styled from "styled-components";

import { GrClose } from "react-icons/gr";

const ModalPopup = ({ children, handleFunc }) => {
  return (
    <Wrapper>
      {/* <button className="close-modal">
        <GrClose />
      </button> */}
      <div className="modal-backdrop" onClick={handleFunc}></div>
      <div className="modal">
        <button className="close-modal" onClick={handleFunc}>
          <GrClose />
        </button>
        {children}
      </div>
    </Wrapper>
  );
};

// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

const Wrapper = styled.div`
  .modal-backdrop {
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 100px;
    background: rgba(0, 0, 0, 0.5);
  }
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    max-height: 90%;
    overflow-y: scroll;
    z-index: 100;

    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    ::-webkit-scrollbar {
      display: none;
    }

    .close-modal {
      position: absolute;
      top: 1rem;
      right: 1rem;
      font-size: 1.4rem;
      background-color: var(--primary-red);

      border: none;
      border-radius: 4px;
      border-top-right-radius: 10px;
      border-bottom-left-radius: 10px;
      padding: 0.4rem;
      cursor: pointer;

      path {
        stroke: var(--primary-white);
        stroke-width: 4;
      }
    }
  }
`;

export default ModalPopup;
