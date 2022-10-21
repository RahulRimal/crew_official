import { createSlice } from "@reduxjs/toolkit";

initialState = {
  id: 0,
  customer_info: {},
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
});
