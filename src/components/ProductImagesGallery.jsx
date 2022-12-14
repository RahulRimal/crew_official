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

  /**************************/
  /* BELOW 1344px (Smaller desktops) */
  /**************************/

  @media (max-width: 84em) {
  }

  /**************************/
  /* BELOW 1200px (Landscape Tablets) */
  /**************************/

  @media (max-width: 75em) {
    .slick-slider {
      height: 440px;
      .slick-slide {
        div {
          height: 320px;
        }
      }

      .slick-thumb {
        li {
          width: 10%;
        }
      }
    }
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
    .slick-slider {
      height: 300px;
      .slick-slide {
        div {
          height: 250px;
        }
      }

      .slick-thumb {
        li {
          width: 13%;
        }
      }
    }
  }
`;

export default ProductImagesGallery;
