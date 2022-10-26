import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { mainUrl } from "../constants";
import GridProduct from "./GridProduct";

const FeaturedProducts = ({ name }) => {
  const [allCategories, setAllCategories] = useState([]);
  useEffect(() => {
    async function getCategories() {
      try {
        const response = await axios.get(`${mainUrl}categories`);

        setAllCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    if (name === "category") getCategories();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 200,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: false,

    // adaptiveHeight: true,
  };

  return (
    <Wrapper>
      <h1>Featured Equipments</h1>
      <Slider {...settings}>
        {allCategories.map((category) => {
          const { featured_equipment } = category;
          if (featured_equipment)
            return (
              //   <div className="featured-product">
              <GridProduct
                key={category.id}
                info={featured_equipment}
                className="featured-product"
              />
              //   </div>
            );
        })}
      </Slider>
    </Wrapper>
  );
};

// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

const Wrapper = styled.div`
  /* background-color: gray; */
  padding: 0.8rem;

  h1 {
    text-transform: capitalize;
    font-size: 3rem;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
  }

  .slick-slide {
    article {
      margin: 1.2rem;
      transition: all 0.3s;
    }
    article:hover {
      box-shadow: -1px 13px 28px 0px rgb(50 50 50 / 52%);
    }
  }
`;

export default FeaturedProducts;
