import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Cookies } from "react-cookie";
import { mainUrl } from "../../constants";
import { updateNotification } from "../notification/notificationSlice";

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

const refreshAccessToken = async function () {
  const userCookie = new Cookies();
  const refresh = userCookie.get("refresh");
  try {
    const response = await axios.post(`${mainUrl}auth/jwt/refresh`, {
      refresh: refresh,
    });

    const access = response.data.access;

    userCookie.set("access", access, { path: "/" });
  } catch (error) {}
};

export const getUser = createAsyncThunk("user/getUser", async (accessToken) => {
  try {
    const response = await axios(`${mainUrl}auth/users/me`, {
      headers: {
        Authorization: `FC ` + accessToken,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      refreshAccessToken();
    }
  }
});

export const getCustomer = createAsyncThunk(
  "user/getCustomer",
  async (accessToken) => {
    try {
      const response = await axios(`${mainUrl}customers/me/`, {
        headers: {
          Authorization: `FC ` + accessToken,
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      if (error.response.status === 500) {
        getUser(accessToken);
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (registerInfo, { dispatch }) => {
    const { username, email, password } = registerInfo;
    const registerUrl = `${mainUrl}auth/users/`;
    try {
      const response = await axios.post(registerUrl, {
        username: username,
        email: email,
        password: password,
      });

      if (response.status === 201) {
        let name = "message";
        let value = "Registered successfully, You can now log in";
        dispatch(updateNotification({ name, value }));
        name = "showModal";
        value = true;
        dispatch(updateNotification({ name, value }));
      }
    } catch (error) {

      if (error.response.status === 400) {
        const data = error.response.data;
        if (data.email) {
          let name = "message";
          let value = data.email[0];
          dispatch(updateNotification({ name, value }));
        }
        let name = "showModal";
        let value = true;
        dispatch(updateNotification({ name, value }));
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (loginInfo, { dispatch }) => {
    const { email, password } = loginInfo;
    const loginUrl = `${mainUrl}auth/jwt/create/`;
    try {
      const response = await axios.post(loginUrl, {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        dispatch(getUser(response.data.access));
        let name = "message";
        let value = "Logged in successfully";
        dispatch(updateNotification({ name, value }));
        name = "showModal";
        value = true;
        dispatch(updateNotification({ name, value }));
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// export const updateUserInfo = createAsyncThunk("user/updateUserInfo", () => {});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    },
    removeUser: (state) => {
      const userCookie = new Cookies();
      userCookie.remove("access", { path: "/" });
      userCookie.remove("refresh", { path: "/" });

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

    [getCustomer.pending]: (state, action) => {
      state.loading = true;
    },

    [getCustomer.fulfilled]: (state, action) => {
      state = { ...action.payload };
      state.loading = false;
      return state;
    },
    [getCustomer.rejected]: (state) => {
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
    [registerUser.pending]: (state) => {
      state.loading = true;
    },
    [registerUser.fulfilled]: (state) => {
      state.loading = false;
    },
    [registerUser.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const { removeUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
