import React from "react";
import styled from "styled-components";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductImagesGallery = ({ pictures }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 4,
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
        },
      },
    ],
  };

  return (
    <Wrapper>
      <Slider {...settings}>
        {pictures.map((pic, index) => {
          const { image } = pic;
          return <img src={image} key={index} alt="" />;
        })}
      </Slider>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow: hidden;

  img {
    width: 20px;
  }
`;

export default ProductImagesGallery;
