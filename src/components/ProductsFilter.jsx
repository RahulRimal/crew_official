import React from "react";
import styled from "styled-components";

const ProductsFilter = () => {
  const updatePriceRange = (e) => {
    console.log(e.target.value);
  };

  return (
    <Wrapper>
      <div className="products-filter">
        {/* <form onSubmit={(e) => e.preventDefault()}> */}
        <form>
          <div className="filter-search">
            <input type="text" placeholder="Search" />
          </div>
          <div className="filter-category">
            <h3 className="filter-title">Category</h3>
            <ul>
              <li>All</li>
              <li>DSLR</li>
              <li>4K, 4K &amp; Beyond</li>
              <li>Camcoder &amp; Video</li>
              <li>VR, 360 &amp; Mobility</li>
            </ul>
          </div>
          <div className="filter-company">
            <h3 className="filter-title">Company</h3>
            <select name="filter-by-company" id="filter-by-company">
              <option value="all">All</option>
              <option value="red">Red</option>
              <option value="black-magic">Black Magic</option>
              <option value="sony">Sony</option>
              <option value="cannon">Cannon</option>
            </select>
          </div>
          <div className="filter-price">
            <h3 className="filter-title">Price</h3>
            <p className="selected-price">
              <span>Rs.</span> 5,000
            </p>
            <input
              type="range"
              min="1000"
              max="100000"
              value="3000"
              onChange={updatePriceRange}
            />
          </div>

          <div className="clear-filters">
            <button type="button">Clear Filters</button>
          </div>
        </form>
      </div>
      {/* <div className="products-grid">showing here</div> */}
    </Wrapper>
  );
};

// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

const Wrapper = styled.div`
  input,
  select {
    height: 3.6rem;
    border: none;
    outline: none;
    border-radius: 0.4rem;
    padding: 0 0.4rem;
    font-size: 1.6rem;
    font-family: "Roboto";
    /* Sizing system is extended here because we need big input field */
    color: var(--primary-gray);
    background-color: var(--secondary-color);
  }

  input::placeholder {
    color: var(--secondary-gray);
  }

  .filter-title {
    font-family: "Roboto";
    font-size: 2rem;
    margin-bottom: 1.2rem;
    color: var(--primary-gray);
  }

  .filter-category {
    margin-top: 3.2rem;

    li {
      font-size: 1.4rem;
      font-weight: 700;
      cursor: pointer;
      color: var(--secondary-gray);
      margin: 0.4rem 0;
      position: relative;
      text-decoration: none;
      line-height: 2.4rem;
    }

    li:hover {
      text-decoration: underline;
    }
  }

  .filter-company {
    margin-top: 3.2rem;
  }

  .filter-price {
    margin-top: 3.2rem;

    .selected-price {
      font-size: 1.4rem;
      font-weight: 500;
      color: var(--primary-gray);
    }
  }

  .clear-filters {
    margin-top: 3.2rem;
    button {
      background-color: var(--primary-red);
      border: none;
      border-radius: 4px;
      padding: 0.8rem 1.2rem;
      cursor: pointer;
      color: var(--primary-white);
      font-size: 1.4rem;
      font-weight: 600;
      letter-spacing: 1px;
    }
  }
`;

export default ProductsFilter;
