import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { mainUrl } from "../../constants";

const initialState = {
  id: 0,
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  phone: "",
  address: {},
  membership: "",
};

const url = `${mainUrl}customers/me`;
const accessToken =
  "FC eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY1Mjg2OTQzLCJqdGkiOiI0YzZmZjQ5MDkzMTg0ZjYyODEzZTgxMmU0ZTlhNDBjYyIsInVzZXJfaWQiOjJ9.HcQQ9D9fIzdXfkj4rXHpMVSUHHstfcxUusiaXoAbayY";

export const getUser = createAsyncThunk("user/getUser", async () => {
  try {
    const response = await axios(url, {
      headers: {
        Authorization: accessToken,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { name, value } = action.payload;
      console.log(name, value);
      return { ...state, [name]: value };
    },
    removeUser: (state) => {
      state = {
        id: 0,
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        address: {},
        membership: "",
      };
      return state;
    },
  },
  extraReducers: {
    [getUser.pending]: (state, action) => {},

    [getUser.fulfilled]: (state, action) => {
      state = { ...action.payload };
      return state;
    },
    [getUser.rejected]: (state) => {},
  },
});

export const { removeUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
