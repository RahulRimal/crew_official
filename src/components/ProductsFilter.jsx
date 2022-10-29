import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { equipmentsUrl } from "../constants";
import {
  filterProducts,
  clearFilters,
  updateFilters,
  getProducts,
} from "../features/filter/filterSlice";
import { getUniqueValues } from "../utils/helpers";

const ProductsFilter = ({ showCategoryFilter, setShowCategoryFilter }) => {
  const dispatch = useDispatch();

  const {
    filters,
    filters: { text, company, category, min_price, max_price, price },
    all_products,
  } = useSelector((store) => store.filter);

  const categories = getUniqueValues(all_products, "category");
  const companies = getUniqueValues(all_products, "company");

  const updateFilter = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "category") value = e.target.textContent;
    if (name === "price") value = Number(value);

    dispatch(updateFilters({ name, value }));
  };
  useEffect(() => {
    dispatch(filterProducts());
  }, [filters, dispatch]);

  return (
    <Wrapper>
      <div className="container">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="filter-search">
            <input
              type="text"
              name="text"
              placeholder="Search"
              value={text}
              onChange={updateFilter}
            />
          </div>
          {showCategoryFilter && (
            <div className="filter-category">
              <h3 className="filter-title">Category</h3>
              <ul>
                {categories.map((c, index) => {
                  return (
                    <li key={index}>
                      <button
                        type="button"
                        name="category"
                        className={`${category === c ? "active" : null}`}
                        onClick={updateFilter}
                      >
                        {c}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          <div className="filter-company">
            <h3 className="filter-title">Company</h3>
            <select
              name="company"
              value={company}
              onChange={updateFilter}
              id="filter-by-company"
            >
              {companies.map((c, index) => {
                return (
                  <option key={index} value={c}>
                    {c}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="filter-price">
            <h3 className="filter-title">Price</h3>
            <p className="selected-price">
              <span>Rs.</span> {price}
            </p>
            <input
              type="range"
              name="price"
              min={min_price}
              max={max_price}
              value={price}
              onChange={updateFilter}
            />
          </div>
        </form>
        <button
          type="button"
          className="clear-filters"
          onClick={() => dispatch(clearFilters())}
        >
          Clear Filters
        </button>
        {!showCategoryFilter && (
          <button
            type="button"
            className="show-all-products"
            onClick={() => {
              dispatch(getProducts(equipmentsUrl));
              dispatch(clearFilters());
              setShowCategoryFilter(true);
            }}
          >
            Show all products
          </button>
        )}
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
      button {
        font-size: 1.4rem;
        font-weight: 700;
        cursor: pointer;
        color: var(--secondary-gray);
        margin: 0.4rem 0;
        position: relative;
        text-decoration: none;
        line-height: 2.4rem;
        border: none;
        background: none;
      }
      button:hover {
        text-decoration: underline;
      }
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

  .show-all-products {
    display: block;
    margin-top: 3.2rem;
    background: none;
    border: none;
    color: var(--primary-color);
    cursor: pointer;
    font-size: 1.4rem;
    font-weight: 600;
    letter-spacing: 1px;
  }
  .show-all-products:hover {
    text-decoration: underline;
  }

  .active {
    text-decoration: underline !important;
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
    input,
    select {
      width: 100%;
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
    input,
    select {
      width: 100%;
    }
  }
`;

export default ProductsFilter;
