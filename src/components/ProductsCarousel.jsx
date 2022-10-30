import React, { useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { GridProduct } from ".";

const ProductsCarousel = ({ products }) => {
  const [shouldShowArrows, setShouldShowArrows] = useState(false);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
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
    <Wrapper
      onMouseOver={() => setShouldShowArrows(true)}
      onMouseLeave={() => setShouldShowArrows(false)}
    >
      <Slider {...settings}>
        {products.map((product) => {
          return (
            <GridProduct
              key={product.id}
              info={product}
              className="featured-product"
            />
          );
        })}
      </Slider>
    </Wrapper>
  );
};

const Wrapper = styled.div`
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

export default ProductsCarousel;
