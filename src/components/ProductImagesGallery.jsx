import React from "react";
import styled from "styled-components";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductImagesGallery = ({ pictures }) => {
  const settings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: function (i) {
      return (
        // <a>
        <img src={pictures[i].image} alt="Product thumbnail" />
        // </a>
      );
    },
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

// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

const Wrapper = styled.div`
  /* This line is needed to remove the infinite height and width bug of slick slider */
  overflow: hidden;

  .slick-slider {
    /* height: 100%; */
    height: 500px;
    .slick-slide {
      div {
        height: 400px;
        display: flex;
      }
      img {
        object-fit: contain;
      }
    }

    .slick-thumb {
      bottom: 0;
      li {
        width: 8%;
        height: auto;
        opacity: 0.6;
        img {
          width: 100%;
        }
      }
      .slick-active {
        opacity: 1;
      }
    }
  }

  /* img {
    width: 20px;
  } */
`;

export default ProductImagesGallery;
