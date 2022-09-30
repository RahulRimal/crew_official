import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { ProductsFilter, ProductsGrid, ProductsList } from "../components";
import {
  sortProducts,
  getProducts,
  updateFilters,
  gridView,
} from "../features/filter/filterSlice";

import { BsFillGridFill, BsList } from "react-icons/bs";

const Products = () => {
  const dispatch = useDispatch();

  const {
    grid_view,
    filtered_products,
    filters: { sort },
  } = useSelector((store) => store.filter);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    dispatch(sortProducts());
  }, [sort]);

  return (
    <Wrapper>
      <ProductsFilter className="products-filter" />
      <div className="container">
        <div className="products-sort">
          <BsFillGridFill
            className={grid_view ? "grid-view-icon active" : "grid-view-icon"}
            onClick={() => dispatch(gridView(true))}
          />
          <BsList
            className={!grid_view ? "list-view-icon active" : "list-view-icon"}
            onClick={() => dispatch(gridView(false))}
          />
          <p className="products-count">
            {filtered_products.length} Products Found
          </p>
          <hr />

          <span>Sort By </span>
          <select
            name="sort"
            // onChange={(e) => dispatch(sortProducts(e.target.value))}
            onChange={(e) => {
              let name = "sort";
              let value = e.target.value;
              return dispatch(updateFilters({ name, value }));
            }}
          >
            <option value="price-lowest">Price(Lowest)</option>
            <option value="price-highest">Price(Highest)</option>
            <option value="name-a">Name(A-Z)</option>
            <option value="name-z">Name(Z-A)</option>
          </select>
        </div>
        {grid_view ? <ProductsGrid /> : <ProductsList />}
      </div>
    </Wrapper>
  );
};

// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  column-gap: 0.2rem;
  padding: 4.8rem 12rem;

  .products-sort {
    margin: 0.8rem;
    display: flex;
    gap: 0.8rem;
    justify-content: start;
    align-items: center;

    .grid-view-icon,
    .list-view-icon {
      width: 3rem;
      height: 3rem;
      padding: 0.4rem;
      border-radius: 4px;
      border: 2px solid var(--secondary-gray);
      cursor: pointer;
    }

    .products-count {
      font-size: 1.4rem;
      margin-left: 2rem;
      font-weight: 500;
    }

    hr {
      height: 2px;
      /* max-width: 100%; */
      width: 50%;
    }

    span {
      font-size: 1.4rem;
    }

    select {
      border: none;
      font-size: 1.6rem;
      font-weight: 600;
      cursor: pointer;
    }

    /* select::before {
      content: "Sort By";
    } */

    .active {
      color: var(--primary-white);
      background-color: var(--primary-black);
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
    grid-template-columns: 1fr;
    .products-filter {
      display: none;
    }
  }
`;

export default Products;
