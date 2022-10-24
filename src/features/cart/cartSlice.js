import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { mainUrl } from "../../constants";
import { getSelectedIndexAndPrice, getTenureDays } from "../../utils/helpers";
import { updateNotification } from "../notification/notificationSlice";

// const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  id: 0,
  cartItems: [],
  totalCartItems: 0,
  cartTotal: 0,
  deliveryLocation: "",
  isLoading: true,
};

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (cartId) => {
    try {
      const resp = await axios(`${mainUrl}carts/${cartId}/items`);
      return resp.data;
      // return cartItems;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (data, { dispatch }) => {
    const { cartId, productId, selectedQuantity, selectedLocation, tenure } =
      data;
    const url = `${mainUrl}carts/${cartId}/items/`;
    try {
      const response = await axios.post(url, {
        equipment_id: productId,
        quantity: selectedQuantity,
        location: selectedLocation,
        tenure: tenure,
      });

      if (response.status === 201) {
        dispatch(getCartItems(cartId));
        let name = "message";
        let value = "Equipment successfully added to the cart";
        dispatch(updateNotification({ name, value }));
        name = "showModal";
        value = true;
        dispatch(updateNotification({ name, value }));
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (data) => {
    const { cartId, cartItemId, selectedQuantity, selectedLocation, tenure } =
      data;
    try {
      const response = await axios.patch(
        `${mainUrl}carts/${cartId}/items/${cartItemId}/`,
        {
          quantity: selectedQuantity,
          tenure: tenure,
          location: selectedLocation,
        }
      );
      const data = response.data;
      return { cartItemId, data };
    } catch (error) {
      console.log(error);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
      // return { ...state };
    },
    updateCart: (state, action) => {
      const { name, value } = action.payload;

      return { ...state, [name]: value };
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.quantity = cartItem.quantity + 1;

      axios
        .patch(`${mainUrl}carts/${state.id}/items/${cartItem.id}/`, {
          quantity: cartItem.quantity,
        })
        .catch((error) => {
          console.log(error);
        });
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.quantity = cartItem.quantity - 1;
      axios
        .patch(`${mainUrl}carts/${state.id}/items/${cartItem.id}/`, {
          quantity: cartItem.quantity,
        })
        .catch((error) => {
          console.log(error);
        });
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += item.quantity;
        total +=
          item.quantity *
          getSelectedIndexAndPrice(
            item.equipment.price,
            getTenureDays(item.tenure)
          )[1];

        // total += item.quantity * item.price;
        state.totalCartItems = amount;
        state.cartTotal = total;
      });
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
    [addItemToCart.pending]: (state) => {
      state.isLoading = true;
    },
    [addItemToCart.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [addItemToCart.rejected]: (state) => {
      state.isLoading = false;
    },
    [updateCartItem.pending]: (state) => {
      state.isLoading = true;
    },
    [updateCartItem.fulfilled]: (state, action) => {
      const { cartItemId, data } = action.payload;
      const { location, tenure, quantity } = data;

      const itemIndex = state.cartItems.findIndex(
        (obj) => obj.id === cartItemId
      );

      const updatedItem = {
        ...state.cartItems[itemIndex],
        location: location,
        tenure: tenure,
        quantity: quantity,
      };

      state.cartItems[itemIndex] = updatedItem;
      state.isLoading = false;
    },
    [updateCartItem.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  clearCart,
  addToCart,
  updateCart,
  removeItem,
  increase,
  decrease,
  calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
