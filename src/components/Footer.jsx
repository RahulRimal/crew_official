import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../logo.png";

import { IoLogoWhatsapp } from "react-icons/io";
import { MdMail, MdPhone } from "react-icons/md";

import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

import { AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <Wrapper>
      <div className="footer-top">
        <img src={logo} alt="logo" />
        <div className="footer-help">
          <p>Need help renting right equipment?</p>
          <a href="/contact" className="footer-help-btn">
            Contact Us
          </a>
        </div>
      </div>
      <hr />
      <div className="footer-body">
        <div className="footer-widget">
          <p className="heading">Get in touch</p>
          <hr />
          <ul>
            <li>
              <a href="mailto:mail@flimcrew.com">
                {" "}
                <MdMail className="widget-contact-icon" /> mail@flimcrew.com
              </a>
            </li>
            <li>
              <a href="tel:9856748390">
                {" "}
                <MdPhone className="widget-contact-icon" /> +977 9856748390
              </a>
            </li>
            <li>
              <a href="/contact">
                {" "}
                <IoLogoWhatsapp className="widget-contact-icon" /> +977
                9856748390
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-widget">
          <p className="heading">Company</p>
          <hr />
          <ul>
            <li>
              <Link to="#">About Us</Link>
            </li>
            <li>
              <Link to="#">Contact</Link>
            </li>
            <li>
              <Link to="#">Privacy Policy</Link>
            </li>
            <li>
              <Link to="#">Terms &amp; Conditions</Link>
            </li>
            <li>
              <Link to="#">Cancellation Policy</Link>
            </li>
            <li>
              <Link to="#">How it works</Link>
            </li>
          </ul>
        </div>
        <div className="footer-widget">
          <p className="heading">Categories</p>
          <hr />
          <ul>
            <li>
              <Link to="#">Camera</Link>
            </li>
            <li>
              <Link to="#">Lens</Link>
            </li>
            <li>
              <Link to="#">Light</Link>
            </li>
            <li>
              <Link to="#">Artist</Link>
            </li>
            <li>
              <Link to="#">Technical Manpower</Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="foote-widget">
            <form className="footer-newsletter">
              <p>Get in touch for exciting offers!</p>
              <input type="text" placeholder="Your email" />
              <button type="submit" className="newsletter-btn">
                Subscribe
              </button>
            </form>
          </div>
          <div className="footer-widget mt">
            <p className="heading">Connect Social</p>
            <hr style={{ marginBottom: "0.8rem" }} />

            <Link to="#">
              <FaFacebookF className="connect-social-icon" />
            </Link>

            <Link to="#">
              <FaTwitter className="connect-social-icon" />
            </Link>

            <Link to="#">
              <FaLinkedinIn className="connect-social-icon" />
            </Link>

            <Link to="#">
              <AiFillInstagram className="connect-social-icon" />
            </Link>
          </div>
        </div>
      </div>
      <hr />
      <div className="footer-bottom">
        <div className="copyright">
          <p>Copyright &copy; {new Date().getFullYear()} FlimCrew</p>
        </div>
        <div className="law">
          <Link to="#">Privacy Policy</Link>
          <Link to="#">Terms &amp; Conditions</Link>
        </div>
      </div>
    </Wrapper>
  );
};

// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

const Wrapper = styled.footer`
  background-color: var(--secondary-color);
  width: 100%;
  height: auto;

  a:link,
  a:visited {
    color: var(--primary-gray);
  }
  a:hover,
  a:active {
    text-decoration: underline;
  }

  .connect-social-icon {
    font-size: 3rem;
    background-color: var(--primary-color);
    color: var(--primary-white);
    border-radius: 50%;
    padding: 0.4rem;
    margin-right: 1.2rem;
    transition: all 0.5s;
  }

  .connect-social-icon:hover {
    background-color: var(--primary-black);
  }

  .footer-top {
    display: flex;
    align-items: center;
    justify-content: space-around;

    img {
      width: 9.8rem;
      height: auto;
    }

    .footer-help {
      p {
        font-size: 1.8rem;
        text-transform: uppercase;
      }

      .footer-help-btn {
        display: block;
        margin-top: 0.4rem;
        border: none;
        width: 100%;
        padding: 0.4rem;
        border-radius: 5px;
        background-color: var(--primary-color);
        color: var(--primary-white);
        font-size: 1.4rem;
        font-weight: 600;
        letter-spacing: 1px;
        text-decoration: none;
        text-align: center;
        cursor: pointer;
      }
    }
  }

  .footer-body {
    padding: 3.2rem 8rem;

    /* display: grid;
    grid-template-columns: 1fr 1fr 1fr 2fr; */
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 8rem;
    margin-top: 3.2rem;

    .footer-widget {
      .heading {
        font-family: "Roboto", sans-serif;
        font-size: 1.8rem;
        font-weight: 500;
        text-transform: uppercase;
        color: var(--primary-black);
      }
      hr {
        background-color: var(--primary-color);
        width: 60px;
        height: 3px;
        border: none;
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
        margin-top: 0.2rem;
      }
      li {
        font-size: 1.2rem;
        line-height: 2.4rem;
      }
    }

    .footer-newsletter {
      p {
        font-size: 2rem;
        font-style: italic;
        font-weight: 600;
        margin-bottom: 0.4rem;
      }

      input {
        border: none;
        background-color: var(--primary-white);
        height: 3rem;
        padding: 0 0.4rem;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        outline: none;
        width: 30rem;
        max-width: 30rem;
      }

      .newsletter-btn {
        border: none;
        background-color: var(--primary-color);
        padding: 0.8rem;
        /* border-radius: 5px; */
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        color: var(--primary-white);
        font-weight: 600;
        letter-spacing: 1px;
      }
    }
  }

  .footer-bottom {
    background-color: var(--primary-color);
    padding: 1.6rem 6.2rem;
    display: flex;
    justify-content: space-between;

    p {
      font-size: 1.4rem;
      font-weight: 500;
      color: var(--primary-white);
    }

    a {
      font-size: 1.4rem;
      color: var(--primary-black);
      margin-right: 1.2rem;
    }

    .law a:not(:last-child) {
      border-right: 2px solid white;
      padding-right: 0.4rem;
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
    .footer-top {
      img {
        width: 9.8rem;
      }

      input {
        max-width: 10rem;
        width: 5rem;
      }

      .footer-help {
        margin: 0 3.2rem;
        .footer-help-btn {
          max-width: 100%;
        }
      }
    }

    .footer-body {
      padding: 3.2rem 1.2rem;
      /* gap: 1.2rem; */
      /* justify-content: center; */
      flex-direction: column;
      align-items: center;

      .footer-widget {
        /* width: 100%; */
        /* text-align: center; */
        li {
          font-size: 1.8rem;
          line-height: 3.2rem;
        }
      }

      .footer-newsletter {
        input {
          width: 25rem;
        }
      }
    }

    .footer-bottom {
      padding: 1.6rem 1.6rem;
      flex-direction: column-reverse;
      align-items: center;
      gap: 1.2rem;
    }
  }
`;

export default Footer;
