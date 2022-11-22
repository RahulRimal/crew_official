import React from "react";
import styled from "styled-components";

import {
  BsFillCameraReelsFill,
  BsFillPeopleFill,
  BsFillMicFill,
} from "react-icons/bs";
import { FaWarehouse } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const OurServices = () => {
  return (
    <Wrapper>
      <div className="container">
        <h1>Our services</h1>

        <div className="body">
          <div className="service-box">
            <div className="service">
              <div className="front">
                <BsFillCameraReelsFill className="service-icon" />
                <h1 className="service-title">Equipments Renting</h1>
                <p className="service-desc">
                  Rent any equipment from our huge collection of equipments
                </p>
              </div>
              <div className="back">
                <p className="service-desc">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                  aut ipsam blanditiis in minus laboriosam ex hic sapiente,
                  alias nulla odit explicabo aliquid. Inventore earum sapiente
                  eos doloremque! Itaque aspernatur quaerat perferendis.
                  Voluptatibus quam praesentium tenetur quae mollitia temporibus
                  nobis enim tempore architecto.
                </p>
                <Link to="/products" className="service-cta">
                  Rent now
                </Link>
              </div>
            </div>
          </div>
          <div className="service-box">
            <div className="service">
              <div className="front">
                <FaWarehouse className="service-icon" />
                <h1 className="service-title">Studios Renting</h1>
                <p className="service-desc">
                  Get convieneint studios on your desired location without any
                  hassel
                </p>
              </div>
              <div className="back">
                <p className="service-desc">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                  aut ipsam blanditiis in minus laboriosam ex hic sapiente,
                  alias nulla odit explicab
                </p>
                <Link to="/studios" className="service-cta">
                  Hire now
                </Link>
              </div>
            </div>
          </div>
          <div className="service-box">
            <div className="service">
              <div className="front">
                <BsFillMicFill className="service-icon" />
                <h1 className="service-title">Voice dubbing</h1>
                <p className="service-desc">
                  Get your any project dubbed to nepali language
                </p>
              </div>
              <div className="back">
                <p className="service-desc">
                  We dub any commercials, films or any sort of videos to nepali
                  language with our wide range of voice and dubbing artists.
                </p>
                <Link to="/products" className="service-cta">
                  Get a quote
                </Link>
              </div>
            </div>
          </div>
          <div className="service-box">
            <div className="service">
              <div className="front">
                <BsFillPeopleFill className="service-icon" />
                <h1 className="service-title">Casting &amp; Auditions</h1>
                <p className="service-desc">
                  Get the artists for the characters you want for your projects
                </p>
              </div>
              <div className="back">
                <p className="service-desc">
                  We provide artists for any sort of characters. Choose from our
                  collection of actors or perform an audtion to get the best.
                  We'll arrange everything for the audition
                </p>
                <Link to="/products" className="service-cta">
                  Cast now
                </Link>
              </div>
            </div>
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
  padding: 0.8rem;
  margin-top: 4.8rem;
  /* padding-left: 4.4rem; */
  /* background: var(--primary-color); */

  /* .container {
    background: #f1edfd;
    border-bottom-left-radius: 20.5rem;
  } */

  h1 {
    text-transform: capitalize;
    font-size: 3rem;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    margin-bottom: 1rem;
  }

  .body {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 4.8rem;

    .service-box {
      position: relative;
      width: 21.5rem;
      height: 25rem;
      /* transform: rotate(45deg); */

      .service {
        position: absolute;
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
        transition: all 0.5s ease;
        transition-delay: 0.1s;
        /* transform: rotate(45deg); */

        .front {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          background-color: var(--primary-white);
          border-radius: 10px;

          text-align: center;
          padding: 3rem 1rem;

          .service-icon {
            font-size: 3.6rem;
            margin: 3.2rem 0;
            /* color: var(--primary-color); */
          }

          .service-title {
            font-size: 2rem;
            font-weight: 500;
            margin: 0.8rem 0;
            color: var(--primary-color);
          }

          .service-desc {
            font-size: 1.2rem;
            font-weight: 500;
          }
        }
        .back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          background-color: var(--primary-color);
          border-radius: 10px;
          transform: rotateY(180deg);
          padding: 3rem 1rem;
          text-align: center;
          display: flex;
          gap: 1.2rem;
          flex-direction: column;
          justify-content: space-between;

          .service-desc {
            font-size: 1.2rem;
            font-weight: 500;
            /* text-align: left; */

            color: var(--primary-white);
          }

          .service-cta {
            border: 2px solid var(--primary-white);
            background: none;
            color: var(--primary-white);
            border-radius: 5px;
            padding: 0.4rem 0.8rem;
            margin: 0 3rem;
            font-size: 1.2rem;
            text-transform: uppercase;
            transition: var(--transition);
          }
          .service-cta:hover {
            background-color: var(--primary-white);
            color: var(--primary-color);
            /* color: black; */
          }
        }
      }

      .service:hover {
        transform: rotateY(180deg);
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
    .body {
      .service-box {
        width: 29rem;
        height: 29rem;
      }
    }
  }
`;

export default OurServices;
