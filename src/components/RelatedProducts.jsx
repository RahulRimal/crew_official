import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mainUrl } from "../constants";
import ProductsCarousel from "./ProductsCarousel";

const RelatedProducts = ({ id }) => {
  const [allProducts, setAllProducts] = useState([]);
  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get(
          `${mainUrl}equipments/?category_id=${id}`
        );

        // let data = response.data.filter(
        //   (result) => result.featured_equipment != null
        // );

        // data = data.map((da) => da.featured_equipment);

        setAllProducts(response.data.results);
      } catch (error) {
        console.log(error);
      }
    }
    // if (name === "category") getCategories();
    getProducts();
  }, [id]);

  return (
    <Wrapper>
      <h1>Related Equipments</h1>
      <ProductsCarousel products={allProducts} />
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
`;

export default RelatedProducts;
