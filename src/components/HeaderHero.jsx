import React from "react";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import styled from "styled-components";

const HeaderHero = () => {
  let heroSlider = null;

  const herolidersettings = {
    // dots: false,
    infinite: true,
    autoplay: true,
    fade: true,
    speed: 4000,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
  };

  const clientSlidersettings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 0,
    cssEase: "linear",
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    // beforeChange: function (currentSlide, nextSlide) {
    //   console.log("before change", currentSlide, nextSlide);
    // },
    // afterChange: function (currentSlide) {
    //   console.log("after change", currentSlide);
    // },
  };

  return (
    <Wrapper>
      {/* <div className="overlay"></div> */}
      <Slider
        ref={(slider) => (heroSlider = slider)}
        {...herolidersettings}
        className="hero-carousel"
      >
        <div className="hero-carousel-item">
          <div className="overlay"></div>
          <img
            src="https://source.unsplash.com/3200x1200/?nature,mountain"
            alt="Carousel content"
          />
          <div className="carousel-content">
            <p className="title">Lorem, ipsum. Babal Text</p>
            <p className="desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem,
              rerum. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Commodi quidem deleniti sequi amet enim eum porro impedit sint
              praesentium nulla.
            </p>
            <Link
              to="#"
              className="carousel-cta"
              onMouseOver={() => heroSlider.slickPause()}
              onMouseLeave={() => heroSlider.slickPlay()}
            >
              Rent now <MdOutlineArrowRightAlt />
            </Link>
          </div>
        </div>
        <div className="hero-carousel-item">
          <div className="overlay"></div>
          <img
            src="https://source.unsplash.com/3200x1200/?nature,people"
            alt="Carousel content"
          />
          <div className="carousel-content">
            <p className="title">Lorem, ipsum. Babal Text</p>
            <p className="desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In,
              similique.
            </p>
            <Link
              to="#"
              className="carousel-cta"
              onMouseOver={() => heroSlider.slickPause()}
              onMouseLeave={() => heroSlider.slickPlay()}
            >
              Rent now <MdOutlineArrowRightAlt />
            </Link>
          </div>
        </div>
        <div className="hero-carousel-item">
          <div className="overlay"></div>
          <img
            src="https://source.unsplash.com/3200x1200/?lion,water"
            alt="Carousel content"
          />
          <div className="carousel-content">
            <p className="title">Lorem, ipsum. Babal Text</p>
            <p className="desc">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Recusandae, ipsa eius dolores id aliquam et.
            </p>

            <Link
              to="#"
              className="carousel-cta"
              onMouseOver={() => heroSlider.slickPause()}
              onMouseLeave={() => heroSlider.slickPlay()}
            >
              Rent now <MdOutlineArrowRightAlt />
            </Link>
          </div>
        </div>
        <div className="hero-carousel-item">
          <div className="overlay"></div>
          <img
            src="https://source.unsplash.com/3200x1200/?cat,mountain"
            alt="Carousel content"
          />
          <div className="carousel-content">
            <p className="title">Lorem, ipsum. Babal Text</p>
            <p className="desc">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos qui
              temporibus cum laborum iste quam eius in iure sint delectus!
            </p>
            <Link
              to="#"
              className="carousel-cta"
              onMouseOver={() => heroSlider.slickPause()}
              onMouseLeave={() => heroSlider.slickPlay()}
            >
              Rent now <MdOutlineArrowRightAlt />
            </Link>
          </div>
        </div>
        <div className="hero-carousel-item">
          <div className="overlay"></div>
          <img
            src="https://source.unsplash.com/3200x1200/?city,people"
            alt="Carousel content"
          />
          <div className="carousel-content">
            <p className="title">Lorem, ipsum. Babal Text</p>
            <p className="desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem,
              rerum. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Commodi quidem deleniti sequi amet enim eum porro impedit sint
              praesentium nulla.
            </p>
            <Link
              to="#"
              className="carousel-cta"
              onMouseOver={() => heroSlider.slickPause()}
              onMouseLeave={() => heroSlider.slickPlay()}
            >
              Rent now <MdOutlineArrowRightAlt />
            </Link>
          </div>
        </div>
      </Slider>

      <div className="hero-clients">
        <h1>Our top clients</h1>
        <Slider {...clientSlidersettings}>
          <div className="client-item-wrapper">
            <div className="client-item">
              <img src="https://source.unsplash.com/3200x1200/?city" alt="" />
              <div className="client-project">
                <p className="client-project-title">Anautho Trishna</p>
                <p className="client">StormCrow Productions</p>
              </div>
            </div>
          </div>
          <div className="client-item-wrapper">
            <div className="client-item">
              <img src="https://source.unsplash.com/3200x1200/?nepal" alt="" />
              <div className="client-project">
                <p className="client-project-title">Anautho Trishna</p>
                <p className="client">StormCrow Productions</p>
              </div>
            </div>
          </div>
          <div className="client-item-wrapper">
            <div className="client-item">
              <img src="https://source.unsplash.com/3200x1200/?movie" alt="" />
              <div className="client-project">
                <p className="client-project-title">Anautho Trishna</p>
                <p className="client">StormCrow Productions</p>
              </div>
            </div>
          </div>
          <div className="client-item-wrapper">
            <div className="client-item">
              <img src="https://source.unsplash.com/3200x1200/?people" alt="" />
              <div className="client-project">
                <p className="client-project-title">Anautho Trishna</p>
                <p className="client">StormCrow Productions</p>
              </div>
            </div>
          </div>
          <div className="client-item-wrapper">
            <div className="client-item">
              <img
                src="https://source.unsplash.com/3200x1200/?village"
                alt=""
              />
              <div className="client-project">
                <p className="client-project-title">Anautho Trishna</p>
                <p className="client">StormCrow Productions</p>
              </div>
            </div>
          </div>
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
  position: relative;
  height: 600px;
  /* height: 100vh; */

  /* .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 97;
    background: rgba(0, 0, 0, 0.2);
  } */

  .hero-carousel {
    /* .slick-slide > div {
      height: 600px;
    } */

    .hero-carousel-item {
      position: relative;
      height: 600px;

      .overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 97;
        background: rgba(0, 0, 0, 0.3);
      }

      .carousel-content {
        position: absolute;
        bottom: 152px;
        left: 200px;
        width: 450px;
        z-index: 99;
      }
      p {
        color: var(--primary-white);
        font-family: "Roboto", sans-serif;
        letter-spacing: 1px;
      }

      .title {
        font-size: 4.4rem;
        font-weight: bold;
        margin: 2rem 0;
      }

      .desc {
        line-height: 2rem;
      }

      .carousel-cta {
        /* display: flex; */
        display: inline-flex;
        justify-content: space-between;
        align-items: center;
        border: none;
        background-color: var(--primary-color);
        color: var(--primary-white);
        padding: 10px 20px;
        border-radius: 5px;
        margin-top: 1.2rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: 600;
        cursor: pointer;
        z-index: 99;

        svg {
          font-size: 2rem;
        }
      }
    }
  }

  img {
    width: 100%;
    height: 100%;
  }

  .hero-clients {
    position: absolute;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.4);
    height: 550px;
    width: 350px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 1.3rem 2rem;
    overflow: hidden;
    z-index: 98;

    h1 {
      color: var(--primary-white);
      margin: 1.2rem 0;
      letter-spacing: 1px;
      text-transform: capitalize;
    }
  }

  .client-item {
    background-color: white;
    display: flex;
    gap: 1.2rem;
    /* width: 350px; */
    padding: 10px;
    margin: 1.2rem 0;
    border-radius: 5px;
    z-index: 98;

    img {
      width: 100px;
      height: 100px;
      border-radius: 10px;
      object-fit: cover;
    }

    .client-project-title {
      font-weight: bolder;
      font-size: 1.8rem;
      margin-top: 0.4rem;
      color: var(--primary-color);
    }
    .client {
      font-size: 1.4rem;
    }
  }
`;

export default HeaderHero;
