import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Cookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { mainUrl } from "../../constants";

const initialState = {
  id: 0,
  loading: false,
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  phone: "",
  address: {},
  membership: "",
};

const url = `${mainUrl}customers/me`;
// const accessToken =
//   "FC eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY2MzI4NzY5LCJqdGkiOiJkNmZhZDBiYzQ3ZTY0MzNlYWI3MjRmNjgyYTNkZDQ3ZiIsInVzZXJfaWQiOjN9.Q2C5bhQ4KQWP43EqHQeW-fPNksAmz5l5auPI2eK14y0";

export const getUser = createAsyncThunk("user/getUser", async (accessToken) => {
  try {
    const response = await axios(url, {
      headers: {
        Authorization: `FC ` + accessToken,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (loginInfo, { dispatch }) => {
    const { username, password } = loginInfo;
    const loginUrl = `${mainUrl}auth/jwt/create`;
    try {
      const response = await axios.post(loginUrl, {
        username: username,
        password: password,
      });
      dispatch(getUser(response.data.access));
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { name, value } = action.payload;
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
    [getUser.pending]: (state, action) => {
      state.loading = true;
    },

    [getUser.fulfilled]: (state, action) => {
      state = { ...action.payload };
      state.loading = false;
      return state;
    },
    [getUser.rejected]: (state) => {
      state.loading = false;
    },

    [loginUser.pending]: (state) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      const { refresh, access } = action.payload;

      const userCookie = new Cookies();
      userCookie.set("access", access, { path: "/" });
      userCookie.set("refresh", refresh, { path: "/" });
      state.loading = false;
    },
    [loginUser.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const { removeUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
