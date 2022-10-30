import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mainUrl } from "../constants";
import ProductsCarousel from "./ProductsCarousel";

const FeaturedProducts = ({ name }) => {
  const [allProducts, setAllProducts] = useState([]);
  useEffect(() => {
    async function getCategories() {
      try {
        const response = await axios.get(`${mainUrl}categories`);

        let data = response.data.filter(
          (result) => result.featured_equipment != null
        );

        data = data.map((da) => da.featured_equipment);

        setAllProducts(data);
      } catch (error) {
        console.log(error);
      }
    }
    if (name === "category") getCategories();
  }, [name]);

  return (
    <Wrapper>
      <h1>Featured Equipments</h1>

      <ProductsCarousel products={allProducts} />
    </Wrapper>
  );
};

// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

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

export default FeaturedProducts;
