import React from "react";
import styled from "styled-components";

const ListProduct = ({ info }) => {
  const { name, description, price, picture } = info;
  const prices = Object.entries(price);
  return (
    <Wrapper>
      <img src={picture} alt="product-img" />
      <div className="product-info">
        <h5>{name}</h5>
        <footer>
          <ul>
            {prices.map((p, id) => {
              return (
                <li key={id}>
                  <p>Rs. {p[1]} / day</p>
                  <span>
                    {p[0]} {p[0] === "1" ? "Day" : "Days"}
                  </span>
                </li>
              );
            })}
            {/* <li>
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
            </li> */}
          </ul>
        </footer>
        <p className="product-desc">{description}</p>
        <button>details</button>
      </div>
    </Wrapper>
  );
};

// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

const Wrapper = styled.article`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2.4rem;

  img {
    width: auto;
    height: 20rem;
    /* max-height: 100%; */
    object-fit: cover;
    border-radius: 0.8rem;
  }

  .product-info {
    display: flex;
    flex-direction: column;
  }

  h5 {
    font-weight: 600;
    font-size: 1.6rem;
  }

  footer {
    margin-top: 0.4rem;
    width: 25rem;
    /* padding: 0 1.6rem; */
    font-family: "Roboto";
    li {
      display: flex;
      justify-content: space-between;
      font-size: 1.2rem;
    }

    span {
      color: var(--primary-color);
    }
  }

  .product-desc {
    font-size: 1.4rem;
    margin-top: 1.2rem;
  }

  button {
    border: none;
    background: var(--primary-color);
    color: var(--primary-white);
    width: 9.2rem;
    text-transform: uppercase;
    padding: 0.4rem 1.8rem;
    border-radius: 3px;
    margin-top: 1.4rem;
    cursor: pointer;
  }
`;

export default ListProduct;
