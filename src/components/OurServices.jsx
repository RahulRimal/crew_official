import React from "react";
import styled from "styled-components";

const OurServices = () => {
  return (
    <Wrapper>
      <h1>Related Equipments</h1>
      <div className="body">
        <div className="service-box"></div>
        <div className="service-box"></div>
        <div className="service-box"></div>
        <div className="service-box"></div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 0.8rem;
  margin-top: 4.8rem;

  h1 {
    text-transform: capitalize;
    font-size: 3rem;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
  }

  .body {
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    .service-box {
      width: 100px;
      height: 100px;
      background-color: red;
    }
  }
`;

export default OurServices;
