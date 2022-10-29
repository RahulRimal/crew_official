import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { mainUrl } from "../constants";
import GridProduct from "./GridProduct";

const FeaturedProducts = ({ name }) => {
  const [shouldShowArrows, setShouldShowArrows] = useState(false);

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
  }, [name]);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    speed: 200,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: shouldShowArrows,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
  };

  return (
    <Wrapper>
      <h1>Featured Equipments</h1>
      <div
        onMouseOver={() => setShouldShowArrows(true)}
        onMouseLeave={() => setShouldShowArrows(false)}
      >
        <Slider {...settings}>
          {allCategories.map((category) => {
            const { featured_equipment } = category;
            if (featured_equipment)
              return (
                <GridProduct
                  key={category.id}
                  info={featured_equipment}
                  className="featured-product"
                />
              );
            return null;
          })}
        </Slider>
      </div>
    </Wrapper>
  );
};

// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

const Wrapper = styled.div`
  padding: 0.8rem;
  margin-top: 4.8rem;

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

  .slick-arrow::before {
    /* color: black; */
    color: var(--primary-color);
    font-size: 2.4rem;
  }

  .slick-next {
    right: 0;
    z-index: 99;
  }

  .slick-prev {
    left: 0;
    z-index: 99;
  }
`;

export default FeaturedProducts;
