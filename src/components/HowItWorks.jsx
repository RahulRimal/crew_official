import React, { useRef } from "react";
import styled from "styled-components";

import { BiSearchAlt } from "react-icons/bi";
import { BsFillCalendarEventFill } from "react-icons/bs";
import { motion, useScroll } from "framer-motion";

const HowItWorks = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  console.log(scrollYProgress);

  return (
    <Wrapper>
      <h1 className="title">How it works</h1>
      <div className="body" ref={ref}>
        <figure className="progress">
          <svg
            id="progress"
            width="5"
            // width="25"
            fill="none"
          >
            {/* <path d="M2 0V254" stroke="black" stroke-width="3" /> */}
            <path d="M2 0L2.00002 500" stroke="black" stroke-width="3" />
            {/* <circle cx="12" cy="12" r="12" fill="black" /> */}

            <motion.path
              d="M2 0L2.00002 500"
              stroke="black"
              stroke-width="5"
              className="indicator"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
        </figure>

        <div className="step">
          <div className="icon">
            <BiSearchAlt />
          </div>
          <div className="info">
            <div className="step-number">1</div>
            <p className="heading">Browse and select your renting needs</p>
            <p className="desc">
              Browse & Select from a wide range of Rental products on our
              website.
            </p>
          </div>
        </div>
        <div className="step">
          <div className="info">
            <div className="step-number" style={{ marginLeft: "auto" }}>
              2
            </div>
            <p className="heading">Choose Your Dates</p>
            <p className="desc">
              Select your dates and always plan early for hassle-free Renting.
            </p>
          </div>
          <div className="icon">
            <BsFillCalendarEventFill />
          </div>
        </div>
        <div className="step">
          <div className="icon">
            <BiSearchAlt />
          </div>
          <div className="info">
            <div className="step-number">3</div>
            <p className="heading">Pay 20% and book instantly</p>
            <p className="desc">Don't lose your wallet before it gets Heavy.</p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

const Wrapper = styled.section`
  margin-top: 5rem;

  h1 {
    text-transform: capitalize;
    font-size: 3rem;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    text-align: center;
    margin-bottom: 3.2rem;
  }

  .body {
    overflow: hidden;
    .step {
      display: flex;
      gap: 8rem;
      justify-content: space-between;
      margin-bottom: 4.4rem;

      .icon {
        width: 50%;
        /* text-align: right; */
        font-size: 50px;
      }
      .info {
        .step-number {
          width: 3.2rem;

          height: 3.2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 2rem;
          padding: 0.8rem;
          border-radius: 50%;
          text-align: center;
          background-color: var(--primary-color);
          color: var(--primary-white);
          margin: 1rem 0;
        }

        .heading {
          font-size: 1.6rem;
          font-weight: 600;
          margin: 1rem 0;
        }
        .desc {
          font-size: 1.2rem;
          margin: 1rem 0;
        }

        width: 50%;
      }
    }

    .step > :first-child {
      text-align: right;
    }
    .step > :last-child {
      text-align: left;
    }

    .progress {
      position: sticky;
      top: 0;
      left: 0;
      right: 0;
      width: 80px;
      /* height: 80px; */
      height: 0;
      margin: auto;
      text-align: center;
      padding: 0;

      .indicator {
        stroke: var(--primary-color);
        stroke-linecap: round;
      }

      #progress {
        /* display: flex;
        margin: auto; */
        height: 400px;
      }
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
    h1 {
      text-align: left;
    }
    .body {
      .step {
        gap: 4rem;
      }

      .progress {
        #progress {
          height: 500px;
        }
      }
    }
  }
`;

export default HowItWorks;
