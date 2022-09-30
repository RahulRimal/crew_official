import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import logo from "../logo.png";
import { HeaderSearchBar } from "./index";

const TopbarHeader = () => {
  return (
    <Wrapper>
      <header>
        <Link to="/">
          <img src={logo} alt="site logo" width={75} height={75} />
        </Link>
        <HeaderSearchBar />
      </header>
    </Wrapper>
  );
};

// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

const Wrapper = styled.div`
  header {
    background-color: var(--primary-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2.4rem;
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
    header {
      padding: 0 1.6rem;
    }
    img {
      width: 50px;
      height: 50px;
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
    header {
      padding: 0 1.2rem;
    }
  }
`;

export default TopbarHeader;
