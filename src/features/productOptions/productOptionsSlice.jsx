import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedDays: 1,
  selectedLocation: "",
  selectedQuantity: 1,
  selectedPrice: 0,
  startDate: "",
  endDate: "",
  agreedToSubmitDocument: true,
};

const productOptionsSlice = createSlice({
  name: "productOptions",
  initialState,
  reducers: {
    updateOptions: (state, action) => {
      const { name, value } = action.payload;

      return { ...state, [name]: value };
    },
  },
});

export const { updateOptions } = productOptionsSlice.actions;

export default productOptionsSlice.reducer;
