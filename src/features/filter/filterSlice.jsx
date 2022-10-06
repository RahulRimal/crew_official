import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { products } from "../../data";

// const url = "https://run.mocky.io/v3/732ddff4-9cd7-46b2-bb42-5c3bc6fe2de6";
const url = "http://127.0.0.1:8000/equipments";

export const getProducts = createAsyncThunk("filter/getProducts", async () => {
  try {
    // const response = await axios.get(url, {
    //   headers: {
    //     // "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //   },
    //   // headers:{"Accept":"application/json, text/plain, /","Content-Type": "multipart/form-data"}
    // });
    // return response.data;

    const response = await axios.get(url);
    // console.log(response);
    // return products;
    return response.data;
  } catch (error) {
    console.log(error);
    // console.log(error.message);
  }
});

const initialState = {
  is_loading: true,
  all_products: [],
  filtered_products: [],
  grid_view: true,
  // list_view: true,
  filters: {
    text: "",
    company: "All",
    category: "All",
    sort: "price-lowest",
    min_price: 0,
    max_price: 0,
    price: 0,
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    loadProducts: (state, action) => {
      state.all_products = action.payload;
      state.filtered_products = action.payload;
    },
    gridView: (state, action) => {
      const value = action.payload;

      return { ...state, grid_view: value };
    },
    sortProducts: (state) => {
      const {
        filters: { sort },
        filtered_products,
      } = state;

      let tempProducts = [...filtered_products];

      // if (sort === "price-lowest") {
      //   tempProducts = tempProducts.sort((a, b) => a.price - b.price);
      // }

      if (sort === "price-lowest") {
        tempProducts = tempProducts.sort((a, b) => {
          let pricesA = a.price;
          pricesA = Object.values(pricesA);
          pricesA = pricesA.flat();
          let minPriceA = Math.min(...pricesA);

          let pricesB = b.price;
          pricesB = Object.values(pricesB);
          pricesB = pricesB.flat();
          let minPriceB = Math.min(...pricesB);

          return minPriceA - minPriceB;
          // console.log(minPriceA, minPriceB);
          // if (minPriceA < minPriceB) return a;
          // else return b;
        });
      }

      if (sort === "price-highest") {
        tempProducts = tempProducts.sort((a, b) => {
          let pricesA = a.price;
          pricesA = Object.values(pricesA);
          pricesA = pricesA.flat();
          let minPriceA = Math.min(...pricesA);

          let pricesB = b.price;
          pricesB = Object.values(pricesB);
          pricesB = pricesB.flat();
          let minPriceB = Math.min(...pricesB);

          return minPriceB - minPriceA;
        });
      }

      if (sort === "name-a") {
        tempProducts = tempProducts.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === "name-z") {
        tempProducts = tempProducts.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }

      return { ...state, filtered_products: tempProducts };
    },
    filterProducts: (state) => {
      const { all_products } = state;
      const { text, category, company, price } = state.filters;

      let tempProducts = all_products;

      if (text) {
        tempProducts = tempProducts.filter((product) => {
          return product.name
            .toLowerCase()
            .startsWith(text.toLocaleLowerCase());
        });
      }

      if (category !== "All") {
        tempProducts = tempProducts.filter((product) => {
          if (product.category !== null) {
            if (product.category.name === category) return product;
          }

          return null;
        });
        // tempProducts = tempProducts.filter((product) => {
        //   // return (product.category = category);
        //   if (product.category === category) return product;
        //   return null;
        // });
      }

      if (company !== "All") {
        tempProducts = tempProducts.filter((product) => {
          // return (product.company = company);
          if (product.company === company) return company;
          return null;
        });
      }

      if (price) {
        tempProducts = tempProducts.filter((product) => {
          let prices = product.price;

          prices = Object.values(prices);
          prices = prices.flat();
          let minPrice = Math.min(...prices);

          if (minPrice <= price) return product;
          return null;
        });
      }

      // state = { ...state, filtered_products: tempProducts };
      // return state;
      return { ...state, filtered_products: tempProducts };
    },
    updateFilters: (state, action) => {
      const { name, value } = action.payload;

      state.filters = { ...state.filters, [name]: value };
    },
    clearFilters: (state) => {
      state.filters = {
        ...state.filters,
        text: "",
        company: "All",
        category: "All",
        price: state.filters.max_price,
      };
    },
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.is_loading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      let prices = action.payload.map((p) => p.price);

      prices = prices.map((o) => Object.values(o));
      prices = prices.flat();
      let maxPrice = Math.max(...prices);
      let minPrice = Math.min(...prices);

      state.is_loading = false;
      state.all_products = action.payload;
      state.filtered_products = action.payload;
      state.filters = {
        ...state.filters,
        max_price: maxPrice,
        price: maxPrice,
        min_price: minPrice,
      };
    },
    [getProducts.rejected]: (state, action) => {
      state.is_loading = false;
    },
  },
});

export const {
  loadProducts,
  sortProducts,
  filterProducts,
  updateFilters,
  clearFilters,
  gridView,
} = filterSlice.actions;

export default filterSlice.reducer;
