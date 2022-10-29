import React from "react";

import styled from "styled-components";

import {
  ClientReview,
  FeaturedProducts,
  HeaderHero2,
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
    /* height: 100vh; */
    padding: 0 10rem;
  }
`;

export default Home;
