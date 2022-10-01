import { useSelector } from "react-redux";
import styled from "styled-components";

import { GridProduct, Loading } from "./index";

const ProductsGrid = () => {
  const { filtered_products, is_loading } = useSelector(
    (store) => store.filter
  );

  if (is_loading) {
    return <Loading />;
  }

  if (filtered_products.length === 0) {
    return (
      <Wrapper>
        <h3 className="no-products-found">No products found 😣 </h3>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {filtered_products.map((product) => {
        return <GridProduct info={product} key={product.id} />;
      })}
    </Wrapper>
  );
};

// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 2.4rem;
  row-gap: 3rem;

  .no-products-found {
    font-size: 3rem;
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
    grid-template-columns: 1fr 1fr;
  }

  /**************************/
  /* BELOW 704px (Smaller tablets) */
  /**************************/

  @media (max-width: 44em) {
    grid-template-columns: 1fr;
  }

  /**************************/
  /* BELOW 544px (Phones) */
  /**************************/

  @media (max-width: 34em) {
    grid-template-columns: 1fr;
  }
`;

export default ProductsGrid;
