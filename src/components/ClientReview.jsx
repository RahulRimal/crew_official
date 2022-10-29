import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { clientReviews } from "../data";

const ClientReview = () => {
  const sliderSettings = {
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          speed: 200,
          autoplaySpeed: 5000,
        },
      },
    ],
  };

  return (
    <Wrapper>
      <h1>What our clients say</h1>
      <Slider {...sliderSettings} className="review-section">
        {clientReviews.map((review) => {
          const { name, post, image, review: desc } = review;
          return (
            <div className="review">
              <img src={image} className="client-img" alt="client" />
              <p className="review-text">{desc}</p>
              <p className="client-name">{name}</p>
              <p className="client-post">{post}</p>
            </div>
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
  padding: 10px;
  margin-top: 4.8rem;

  h1 {
    text-transform: capitalize;
    font-size: 3rem;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    margin-bottom: 3.2rem;
  }

  .slick-slide > div {
    padding: 0 350px;
  }

  .slick-slide {
    .slick-track {
      display: flex;
      align-items: center;
    }
  }

  .review {
    /* max-width: 700px; */
    /* width: 550px !important; */
    background-color: var(--primary-white);
    padding: 1rem;
    border-radius: 5px;

    .client-img {
      width: 75px;
      height: 75px;
      border-radius: 50%;
      object-fit: cover;
    }

    .review-text {
      font-weight: 500;
      font-size: 1.2rem;
      letter-spacing: 1px;
      margin: 1.2rem 0;
    }
    .client-name {
      font-size: 1.6rem;
      font-weight: 600;
      margin-bottom: 0.2rem;
    }
    .client-post {
      font-size: 1.4rem;
      letter-spacing: 2px;
    }
  }
  /**************************/
  /* BELOW 1344px (Smaller desktops) */
  /**************************/

  @media (max-width: 84em) {
    .slick-slide > div {
      padding: 0 250px;
    }
  }

  /**************************/
  /* BELOW 1200px (Landscape Tablets) */
  /**************************/

  @media (max-width: 75em) {
    .slick-slide > div {
      padding: 0 150px;
    }
  }

  /**************************/
  /* BELOW 944px (Tablets) */
  /**************************/

  @media (max-width: 59em) {
    .slick-slide > div {
      padding: 0 50px;
    }
  }

  /**************************/
  /* BELOW 704px (Smaller tablets) */
  /**************************/

  @media (max-width: 44em) {
    .slick-slide > div {
      padding: 0;
    }
  }

  /**************************/
  /* BELOW 544px (Phones) */
  /**************************/

  @media (max-width: 34em) {
  }
`;

export default ClientReview;
