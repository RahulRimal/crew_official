import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   showModal: false,
//   message: "",
// };
const initialState = {
  showModal: false,
  message: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    updateNotification: (state, action) => {
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    },
    clearNotification: (state) => {
      state = {
        showModal: false,
        message: "",
      };
      return state;
    },
  },
});

export const { updateNotification, clearNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
