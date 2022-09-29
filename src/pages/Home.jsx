import React from "react";

import styled from "styled-components";

import { LeftNavbar } from "../components";

const Home = () => {
  return (
    <Wrapper>
      <div className="left-sidebar">
        <LeftNavbar />
        {/* <FeaturedComponent /> */}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .left-sidebar {
    /* max-width: 25rem; */
  }
`;

export default Home;
