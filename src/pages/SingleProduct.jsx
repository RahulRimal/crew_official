import React from "react";
import styled from "styled-components";

import { singleProduct } from "../data";

import {
  ProductImagesGallery,
  ProductInfoTab,
  ProductOptionsSelection,
} from "../components";

const SingleProduct = () => {
  const { pictures } = singleProduct;
  return (
    <Wrapper>
      <ProductImagesGallery pictures={pictures} />
      <ProductOptionsSelection product={singleProduct} />
      <ProductInfoTab product={singleProduct} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;

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
    grid-template-columns: 1fr;
  }
`;

export default SingleProduct;
