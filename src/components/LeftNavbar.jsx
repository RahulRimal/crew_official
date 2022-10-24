import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BsFillCameraReelsFill, BsFillCameraVideoFill } from "react-icons/bs";
import { CgSmartHomeLight } from "react-icons/cg";
import { GiDeliveryDrone } from "react-icons/gi";
import { SiIconify } from "react-icons/si";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import axios from "axios";
import { mainUrl } from "../constants";

import { updateFilters } from "../features/filter/filterSlice";

const LeftNavbar = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await axios.get(`${mainUrl}categories`);
        setAllCategories(response.data);
        setSelectedCategory(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    }
    getCategories();
  }, []);

  const getCategoryIcon = (categoryName) => {
    if (categoryName === "Camera") return <BsFillCameraReelsFill />;
    if (categoryName === "Lens") return <BsFillCameraVideoFill />;
    if (categoryName === "Light") return <CgSmartHomeLight />;
    if (categoryName === "Drone") return <GiDeliveryDrone />;
    // if (categoryName == "Wedding Kit") return <BsFillCameraReelsFill />;
    return <SiIconify />;
  };

  return (
    <Wrapper>
      <div className="sidebar-nav">
        {allCategories.map((category) => {
          const { id, name } = category;
          return (
            <NavLink
              key={id}
              to={"/products/?category=" + name}
              state={{ categoryId: id }}
              className={(isActive) => `${isActive ? "active" : null}`}
              onMouseOver={() => setSelectedCategory(category)}
            >
              {getCategoryIcon(name)}
            </NavLink>
          );
        })}
      </div>
      <div className="sidebar-wide-nav">
        <Link
          className="nav-header"
          to={"/products/?category=" + selectedCategory.name}
          state={{ categoryId: selectedCategory.id }}
        >
          <h3 className="heading">{selectedCategory.name}</h3>
          <span className="nav-tag">{selectedCategory.equipments_count}</span>
        </Link>
        <ul>
          <hr />

          {selectedCategory.companies?.map((company, index) => {
            return (
              <li key={index}>
                <Link
                  state={{ categoryId: selectedCategory.id }}
                  to={"/products/?category=" + selectedCategory.name}
                  className="nav-link"
                  onClick={() => {
                    const name = "company";
                    const value = company;
                    dispatch(updateFilters({ name, value }));
                  }}
                >
                  {company}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Wrapper>
  );
};

// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98
const Wrapper = styled.div`
  display: flex;

  a:link,
  a:visited {
    color: var(--primary-black);
  }

  .sidebar-nav {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    gap: 1.2rem;
    /* height: 84vh; */
    height: 100vh;
    background-color: var(--primary-color);
    border-radius: 5px;
    max-width: 4.4rem;
    padding: 1.2rem;
    z-index: 1;

    svg {
      color: var(--primary-white);
      width: 3rem;
      height: 3rem;
    }
  }

  /* .nav-icon:hover .sidebar-wide-nav {
    transform: translate(0);
  } */

  .sidebar-nav:hover + .sidebar-wide-nav {
    transform: translate(0);
  }

  .sidebar-wide-nav {
    background: var(--secondary-color);
    max-width: 20rem;
    padding: 10px;
    width: 20rem;
    margin-top: 0.4rem;
    transform: translateX(-100%);
    transition: all 0.4s cubic-bezier(0, 1.04, 1, 1);

    .nav-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.4rem;
    }

    .heading {
      font-size: 1.8rem;
    }

    hr {
      margin-bottom: 1.6rem;
    }

    li {
      color: var(--primary-black);
      font-size: 1.6rem;
      font-weight: 700;

      transition: all 0.2s;
    }

    li:hover {
      background-color: var(--primary-white);
    }

    .nav-link {
      display: block;
      padding: 1rem 10px;
    }
  }

  .sidebar-wide-nav:hover {
    transform: translate(0);
  }

  .nav-tag {
    background-color: var(--primary-color);
    color: var(--primary-white);
    font-size: 1.8rem;
    font-weight: 600;
    width: 3rem;
    height: 2rem;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
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
    .sidebar-nav {
      flex-direction: row;
      align-items: center;
      gap: 1.2rem;
      overflow-x: auto;
      width: 100vw;
      /* height: 100vh; */

      background: none;

      height: auto;
      max-width: 100vw;
      padding: 0.8rem 1.2rem;

      svg {
        color: black;
      }
    }

    .sidebar-wide-nav {
      display: none;
    }
  }
`;

export default LeftNavbar;
