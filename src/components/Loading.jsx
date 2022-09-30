import React from "react";
import styled from "styled-components";

const Loading = () => {
  return (
    <Wrapper>
      <h3>Loading...</h3>
    </Wrapper>
  );
};

// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

const Wrapper = styled.div`
  h3 {
    color: var(--primary-color);
    font-size: 4.4rem;
  }
`;

export default Loading;
