import React, { useEffect, useState } from "react";
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

import { MdClose } from "react-icons/md";
import { useLocation } from "react-router-dom";

const Studios = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [showCategoryFilter, setShowCategoryFilter] = useState(true);

  const {
    grid_view,
    filtered_products,
    filters: { sort },
  } = useSelector((store) => store.filter);

  useEffect(() => {
    const url = "http://127.0.0.1:8000/equipments";

    const searchUrl = new URLSearchParams(window.location.search);
    let searchTerm = searchUrl.get("search");
    let endpoint = url;

    if (searchTerm !== null) {
      searchTerm = searchTerm.replace(/\s+/g, "+");
      endpoint = `${endpoint}/?search=${searchTerm}`;

      dispatch(getProducts(endpoint));
      setShowCategoryFilter(false);
    } else if (location.state !== null) {
      const { categoryId } = location.state;
      endpoint = `${endpoint}/?category_id=${categoryId}`;

      dispatch(getProducts(endpoint));
      setShowCategoryFilter(false);
    } else dispatch(getProducts(url));
  }, [dispatch, location.state]);

  useEffect(() => {
    dispatch(sortProducts());
  }, [sort, dispatch]);

  const hideMobileFilters = () => {
    const mobileFilters = document.getElementById("mobile-filters");
    const showFiltersButton = document.getElementById(
      "show-mobile-filters-btn"
    );
    mobileFilters.classList.toggle("hide-mobile-filters");
    mobileFilters.classList.toggle("show-mobile-filters");
    showFiltersButton.classList.toggle("show-it");
    showFiltersButton.classList.toggle("hide-it");
  };

  const showMobileFilters = () => {
    const mobileFilters = document.getElementById("mobile-filters");
    const showFiltersButton = document.getElementById(
      "show-mobile-filters-btn"
    );
    mobileFilters.classList.toggle("show-mobile-filters");
    mobileFilters.classList.toggle("hide-mobile-filters");
    showFiltersButton.classList.toggle("show-it");
    showFiltersButton.classList.toggle("hide-it");
  };

  return (
    <Wrapper>
      <button
        id="show-mobile-filters-btn"
        className="show-it"
        onClick={showMobileFilters}
      >
        Show Filters
      </button>

      <div
        id="mobile-filters"
        className="mobile-products-filter hide-mobile-filters"
      >
        <ProductsFilter showCategoryFilter={showCategoryFilter} />
        <MdClose className="close-filters-btn" onClick={hideMobileFilters} />
      </div>

      <div className="products-filter">
        <ProductsFilter
          showCategoryFilter={showCategoryFilter}
          setShowCategoryFilter={setShowCategoryFilter}
        />
      </div>
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
        <div className="product-catalog">
          {grid_view ? <ProductsGrid /> : <ProductsList />}
        </div>
      </div>
    </Wrapper>
  );
};

// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

const Wrapper = styled.div`
  padding: 4.8rem;

  .products-filter {
    position: sticky;
    top: 100px;
    width: 20%;
    float: left;
  }

  .container {
    width: 80%;
    margin-left: auto;
  }

  #show-mobile-filters-btn {
    display: none !important;
    position: fixed;
    /* top: 12.8rem; */
    bottom: 20rem;
    right: 1rem;
    border: none;
    background-color: var(--primary-color);
    color: var(--primary-white);
    padding: 0.8rem;
    border-radius: 5px;
    z-index: 99;
  }

  .mobile-products-filter {
    display: none;
    transform: translateX(-100%);
    transition: all 0.4s cubic-bezier(0, 1.04, 1, 1);
  }

  .show-mobile-filters {
    transform: translateX(0);
  }
  .hide-mobile-filters {
    transform: translateX(-100%);
  }

  .product-catalog {
    background-color: #f1f5f8;
    padding: 1rem;
  }

  .products-sort {
    /* margin: 0.8rem; */
    position: sticky;
    top: 77px;
    background: white;
    padding: 1rem;
    display: flex;
    gap: 0.8rem;
    justify-content: start;
    align-items: center;
    margin: 0 1rem;

    .grid-view-icon,
    .list-view-icon {
      font-size: 3rem;
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

    .active {
      color: var(--primary-white);
      background-color: var(--primary-black);
    }
  }

  /**************************/
  /* BELOW 1344px (Smaller desktops) */
  /**************************/

  @media (max-width: 84em) {
    padding: 4.8rem 5rem;
    .products-filter {
      .container {
        width: 100%;
      }
    }

    .container {
      width: 81%;
    }
  }

  /**************************/
  /* BELOW 1200px (Landscape Tablets) */
  /**************************/

  @media (max-width: 75em) {
    padding: 2rem;
    .products-filter {
      width: 18%;
    }

    .container {
      width: 80%;
    }
  }

  /**************************/
  /* BELOW 944px (Tablets) */
  /**************************/

  @media (max-width: 59em) {
    .products-filter {
      width: 25%;
    }

    .container {
      width: 75%;
    }

    .products-sort {
      flex-wrap: wrap;
      top: 50px;
      margin-bottom: 3rem;

      .products-count {
        margin: 0;
      }

      hr {
        width: 100%;
      }
    }
  }

  /**************************/
  /* BELOW 704px (Smaller tablets) */
  /**************************/

  @media (max-width: 44em) {
    .products-filter {
      width: 30%;
    }

    .container {
      width: 65%;
    }
  }

  /**************************/
  /* BELOW 544px (Phones) */
  /**************************/

  @media (max-width: 34em) {
    padding: 4.8rem 2.4rem;
    grid-template-columns: 1fr;

    .products-sort {
      /* position: fixed;
      top: 50px; */
      position: static;
      margin: 0;
    }

    #show-mobile-filters-btn {
      display: block !important;
    }

    .container {
      width: 100%;
    }

    .products-filter {
      display: none;
    }

    .mobile-products-filter {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      background: rgba(255, 255, 255, 0.93);
      width: 100vw;
      height: 100vh;
      /* padding: 4.2rem 2.4rem; */
      padding: 4.2rem 10rem 4.2rem 2.4rem;
      z-index: 99;

      .close-filters-btn {
        display: block;
        font-size: 3.6rem;
        position: absolute;
        top: 1.2rem;
        right: 1.2rem;
        color: var(--primary-white);
        background-color: var(--primary-red);
        border-radius: 6px;
      }
    }

    .products-sort {
      flex-wrap: wrap;

      margin-bottom: 3rem;

      .list-view-icon,
      .grid-view-icon {
        display: none;
      }
    }
  }
`;

export default Studios;
