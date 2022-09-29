import React from "react";
import styled from "styled-components";

const Product = ({ info }) => {
  const { id, name, description, price, picture } = info;
  return (
    <Wrapper>
      <img src={picture} alt="product-img" />
      <h5>{name}</h5>
      <footer>
        <ul>
          <li>
            <p>Rs. 600 / day</p>
            <span>1 Day</span>
          </li>
          <li>
            <p>Rs. 550 / day</p>
            <span>2-4 Days</span>
          </li>
          <li>
            <p>Rs. 500 / day</p>
            <span>5-7 Days</span>
          </li>
          <li>
            <p>Rs. 450 / day</p>
            <span>8 Days ++</span>
          </li>
        </ul>
      </footer>
    </Wrapper>
  );
};

// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

const Wrapper = styled.article`
  /* border: 1px solid var(--secondary-gray); */
  /* padding: 0.8rem; */
  img {
    width: 100%;
    /* height: 17.5rem; */
    height: auto;
    object-fit: cover;
  }

  h5 {
    font-weight: 600;
    font-size: 1.6rem;
  }

  footer {
    margin-top: 0.4rem;
    padding: 0 1.6rem;
    font-family: "Roboto";
    li {
      display: flex;
      justify-content: space-between;
      font-size: 1.4rem;
    }

    span {
      color: var(--primary-color);
    }
  }
`;

export default Product;
