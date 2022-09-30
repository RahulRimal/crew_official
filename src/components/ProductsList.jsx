import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ListProduct, Loading } from "./index";

const ProductsList = () => {
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
        return <ListProduct info={product} key={product.id} />;
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default ProductsList;
