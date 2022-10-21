import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/products/?search=" + searchTerm);
    setSearchTerm("");
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type anything...."
        />
        <button type="submit">Search</button>
      </form>
    </Wrapper>
  );
};

// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

const Wrapper = styled.div`
  form {
    display: flex;
    justify-content: left;
    align-items: center;
  }

  input {
    height: 3.6rem;
    border: none;
    /* border-radius: 0.4rem; */
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    padding: 0 0.4rem;
    font-size: 1.6rem;
    font-family: "Roboto";
    /* Sizing system is extended here because we need big input field */
    width: 50rem;
  }
  button {
    height: 3.6rem;
    border: none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 0 0.4rem;
    font-weight: 600;
    background-color: var(--secondary-color);
    cursor: pointer;
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
    input {
      /* Sizing system is extended here because we need big input field */
      width: 30rem;
    }
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
    input {
      height: 3rem;
      font-size: 1.4rem;
      /* Sizing system is extended here because we need big input field */
      width: 18rem;
    }
    button {
      height: 3rem;
      font-size: 500;
    }
  }
`;

export default HeaderSearchBar;
