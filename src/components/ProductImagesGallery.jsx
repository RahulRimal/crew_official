import React from "react";
import styled from "styled-components";

const ProductImagesGallery = ({ pictures }) => {
  return (
    <Wrapper>
      <img src={pictures[0]} alt="product image" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  img {
    width: 100%;
    height: auto;
    /* height: 50rem; */
  }
`;

export default ProductImagesGallery;
