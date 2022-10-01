import React from "react";
import { NavLink } from "react-router-dom";
// import { AiFillHome, AiFillSound } from "react-icons/ai";
import { BsFillCameraReelsFill } from "react-icons/bs";
import { FaRunning } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { MdCable } from "react-icons/md";
import { RiComputerFill } from "react-icons/ri";
import styled from "styled-components";

const LeftNavbar = () => {
  return (
    <Wrapper>
      <div className="sidebar-nav">
        <NavLink
          to="/"
          exact
          className={(isActive) => `${isActive ? "active" : null}`}
        >
          <BsFillCameraReelsFill
            className="nav-icon"
            style={{
              width: "3rem",
              height: "3rem",
            }}
          />
          {/* <span>Camera</span> */}
        </NavLink>
        <NavLink
          to="/"
          exact
          className={(isActive) => `${isActive ? "active" : null}`}
        >
          <GoPerson
            className="nav-icon"
            style={{
              width: "3rem",
              height: "3rem",
            }}
          />
          {/* <span>Direction</span> */}
        </NavLink>
        <NavLink
          to="/"
          exact
          className={(isActive) => `${isActive ? "active" : null}`}
        >
          <MdCable
            className="nav-icon"
            style={{
              width: "3rem",
              height: "3rem",
            }}
          />
          {/* <span>Grip</span> */}
        </NavLink>
        <NavLink
          to="/"
          exact
          className={(isActive) => `${isActive ? "active" : null}`}
        >
          <RiComputerFill
            className="nav-icon"
            style={{
              width: "3rem",
              height: "3rem",
            }}
          />
          {/* <span>Post</span> */}
        </NavLink>
        <NavLink
          to="/"
          exact
          className={(isActive) => `${isActive ? "active" : null}`}
        >
          <FaRunning
            className="nav-icon"
            style={{
              width: "3rem",
              height: "3rem",
            }}
          />
          {/* <span>Spot</span> */}
        </NavLink>
      </div>
      <div className="sidebar-wide-nav">
        <h3 className="heading">Cameras</h3>
        <ul>
          <hr />
          <li>
            <NavLink to="/">Red</NavLink>
            <span className="nav-tag">5</span>
          </li>
          <li>
            <NavLink to="/">BlackMagic</NavLink>
            <span className="nav-tag">2</span>
          </li>
          <li>
            <NavLink to="/">Sony</NavLink>
            <span className="nav-tag">5</span>
          </li>
          <li>
            <NavLink to="/">Fuji Flims</NavLink>
            <span className="nav-tag">9</span>
          </li>
          <li>
            <NavLink to="/">Cannon</NavLink>
            <span className="nav-tag">3</span>
          </li>
        </ul>
      </div>
    </Wrapper>
  );
};

// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98
const Wrapper = styled.div`
  display: flex;

  a:link,
  a:visited {
    color: var(--primary-black);
  }

  .sidebar-nav {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    gap: 1.2rem;
    /* height: 84vh; */
    height: 100vh;
    background-color: var(--primary-color);
    border-radius: 5px;
    max-width: 4.4rem;
    padding: 1.2rem;
    z-index: 1;

    svg {
      color: var(--primary-white);
      width: 2.4rem;
      height: 2.4rem;
    }
  }

  .nav-icon {
    width: 3.6rem;
    height: 3.6rem;
  }

  /* .nav-icon:hover .sidebar-wide-nav {
    transform: translate(0);
  } */

  .sidebar-nav:hover + .sidebar-wide-nav {
    transform: translate(0);
  }

  .sidebar-wide-nav {
    background: var(--secondary-color);
    max-width: 20rem;
    padding: 10px;
    width: 20rem;
    margin-top: 0.4rem;
    transform: translateX(-100%);
    transition: all 0.4s cubic-bezier(0, 1.04, 1, 1);

    .heading {
      font-size: 1.8rem;
    }

    hr {
      margin-bottom: 1.6rem;
    }

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: var(--primary-black);
      font-size: 1.6rem;
      font-weight: 700;
      padding: 1rem 10px;
      transition: all 0.2s;
    }

    li:hover {
      background-color: var(--primary-white);
    }
  }

  .sidebar-wide-nav:hover {
    transform: translate(0);
  }

  .nav-tag {
    background-color: var(--primary-color);
    color: var(--primary-white);
    font-size: 1.8rem;
    font-weight: 600;
    width: 3rem;
    height: 2rem;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
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
    .sidebar-nav {
      flex-direction: row;
      align-items: center;
      gap: 1.2rem;
      overflow-x: auto;
      width: 100vw;
      /* height: 100vh; */

      background: none;

      height: auto;
      max-width: 100vw;
      padding: 0.8rem 1.2rem;

      svg {
        color: black;
      }
    }

    .sidebar-wide-nav {
      display: none;
    }
  }
`;

export default LeftNavbar;
