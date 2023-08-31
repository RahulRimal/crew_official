import React from "react";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import styled from "styled-components";
// import bgImage from "../../media/hero-bg.jpg";

const HeaderHero2 = () => {
  let heroContentTextSlider = null;
  let heroContentImageSlider = null;

  const heroContentTextSlidersettings = {
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
  const heroContentImageSlidersettings = {
    // dots: false,
    infinite: true,
    autoplay: true,
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
    // speed: 3000,
    speed: 9000,
    autoplaySpeed: 0,
    cssEase: "linear",
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    arrows: false,
  };

  return (
    <Wrapper>
      {/* <img src={bgImage} alt="Carousel content" /> */}
      <img
        src="https://img.freepik.com/free-vector/film-strip-cinema-background-design_1017-36649.jpg?w=1060&t=st=1667143009~exp=1667143609~hmac=3a9df527befecd50610aa735e2f4743cd66423d0f1f260d83484b5ec4f048c5e"
        alt="Carousel content"
      />
      <Slider
        ref={(slider) => (heroContentTextSlider = slider)}
        {...heroContentTextSlidersettings}
        className="hero-carousel"
      >
        <div className="hero-carousel-item">
          <div className="overlay"></div>
          <div className="carousel-content">
            <p className="title">Efficient Renting</p>
            <p className="desc">
              We provide easy, efficient and hassle free renting service of all
              kinds of equipments
            </p>
            <Link
              to="#"
              className="carousel-cta"
              onMouseOver={() => {
                heroContentTextSlider.slickPause();
                heroContentImageSlider.slickPause();
              }}
              onMouseLeave={() => {
                heroContentTextSlider.slickPlay();
                heroContentImageSlider.slickPlay();
              }}
            >
              Rent now <MdOutlineArrowRightAlt />
            </Link>
          </div>
        </div>
        <div className="hero-carousel-item">
          <div className="overlay"></div>
          <div className="carousel-content">
            <p className="title">Efficient Renting</p>
            <p className="desc">
              We provide easy, efficient and hassle free renting service of all
              kinds of equipments
            </p>
            <Link
              to="#"
              className="carousel-cta"
              onMouseOver={() => {
                heroContentTextSlider.slickPause();
                heroContentImageSlider.slickPause();
              }}
              onMouseLeave={() => {
                heroContentTextSlider.slickPlay();
                heroContentImageSlider.slickPlay();
              }}
            >
              Rent now <MdOutlineArrowRightAlt />
            </Link>
          </div>
          <div className="carousel-img"></div>
        </div>
        <div className="hero-carousel-item">
          <div className="overlay"></div>
          <div className="carousel-content">
            <p className="title">Lorem, ipsum. Babal Text</p>
            <p className="desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem,
              rerum. Lorem ipsum
            </p>
            <Link
              to="#"
              className="carousel-cta"
              onMouseOver={() => {
                heroContentTextSlider.slickPause();
                heroContentImageSlider.slickPause();
              }}
              onMouseLeave={() => {
                heroContentTextSlider.slickPlay();
                heroContentImageSlider.slickPlay();
              }}
            >
              Rent now <MdOutlineArrowRightAlt />
            </Link>
          </div>
        </div>
        <div className="hero-carousel-item">
          <div className="overlay"></div>
          <div className="carousel-content">
            <p className="title">Lorem, ipsum. Babal Text</p>
            <p className="desc">Lorem i</p>
            <Link
              to="#"
              className="carousel-cta"
              onMouseOver={() => {
                heroContentTextSlider.slickPause();
                heroContentImageSlider.slickPause();
              }}
              onMouseLeave={() => {
                heroContentTextSlider.slickPlay();
                heroContentImageSlider.slickPlay();
              }}
            >
              Rent now <MdOutlineArrowRightAlt />
            </Link>
          </div>
        </div>
      </Slider>
      <div className="carousel-img">
        <Slider
          ref={(slider) => (heroContentImageSlider = slider)}
          {...heroContentImageSlidersettings}
        >
          <img
            src="http://127.0.0.1:8000/media/equipment/images/cannon80d.jpg"
            alt="jfk"
          />
          <img
            src="https://www.red.com/SSP%20Applications/Red@SuiteCentric/SCA%20Kilimanjaro/img/products/PARENT-V-RAPTOR-XL_0.png?resizeid=2&resizeh=300&resizew=300"
            alt="jfk"
          />

          <img
            src="https://www.red.com/SSP%20Applications/Red@SuiteCentric/SCA%20Kilimanjaro/img/products/710-0318_0.png?resizeid=2&resizeh=300&resizew=300"
            alt="jfk"
          />
        </Slider>
      </div>

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
                <p className="client-project-title">Kasturi</p>
                <p className="client">Ojas Film Studio</p>
              </div>
            </div>
          </div>
          <div className="client-item-wrapper">
            <div className="client-item">
              <img src="https://source.unsplash.com/3200x1200/?movie" alt="" />
              <div className="client-project">
                <p className="client-project-title">Paani</p>
                <p className="client">Kites Entertainment</p>
              </div>
            </div>
          </div>
          <div className="client-item-wrapper">
            <div className="client-item">
              <img src="https://source.unsplash.com/3200x1200/?people" alt="" />
              <div className="client-project">
                <p className="client-project-title">Dolma</p>
                <p className="client">Ojas Film Studio</p>
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

  .hero-carousel {
    position: absolute;
    top: 0;
    width: 100%;

    .hero-carousel-item {
      position: relative;
      height: 600px;

      .overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 97;
        background: rgba(0, 0, 0, 0.6);
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
  .carousel-img {
    width: 300px;
    position: absolute;
    bottom: 180px;
    right: 435px;
    text-align: center;

    img {
      width: 70% !important ;
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

export default HeaderHero2;
