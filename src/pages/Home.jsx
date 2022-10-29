import React from "react";

import styled from "styled-components";

import {
  ClientReview,
  FeaturedProducts,
  HeaderHero2,
  HowItWorks,
  LeftNavbar,
} from "../components";

const Home = () => {
  return (
    <Wrapper>
      <div className="left-sidebar">
        <LeftNavbar />
      </div>
      <div className="home-wide-content">
        {/* <HeaderHero/> */}
        <HeaderHero2 />
      </div>
      <div className="home-center-content">
        <HowItWorks />
        <FeaturedProducts name={"category"} />
        <ClientReview />
      </div>
    </Wrapper>
  );
};

// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

const Wrapper = styled.div`
  /* display: grid;
  grid-template-columns: 1fr 5fr; */

  .left-sidebar {
    position: fixed;
    top: 7.7rem;
    z-index: 99;
  }

  .left-sidebar > div {
    width: 0;
  }

  .left-sidebar:hover > div {
    width: 20rem;
  }

  .home-wide-content {
    /* padding-left: 4.4rem; */
  }

  .home-center-content {
    padding: 0 10rem;
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
    .home-center-content {
      padding: 0 5rem;
    }
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
    .home-center-content {
      padding: 0 2rem;
    }
  }

  /**************************/
  /* BELOW 544px (Phones) */
  /**************************/

  @media (max-width: 34em) {
    .home-center-content {
      padding: 0 1rem;
    }
  }
`;

export default Home;
