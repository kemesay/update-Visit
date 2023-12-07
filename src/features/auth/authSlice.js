import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import backEndApi from "../../services/api";
import { baseUrl } from "../../constants";




export const loginUser = createAsyncThunk(
  `/login`,
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`${baseUrl}/login`, formData);
      if (response.data !== "notUser") {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem(
          "admin",
          JSON.stringify({ isAdmin: response.data.isAdmin })
        );

        return response;
      } else {
        thunkAPI.getState();
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk("", async (thunkAPI) => {
  try {
    localStorage.clear();
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

const initialState = {
  loginData: [],
  isLoginFetching: false,
  isLoginSuccess: false,
  isLoginError: false,
  loginErrorMessage: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.isLoginFetching = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loginData = payload.data;
      state.isLoginFetching = false;
      state.isLoginSuccess = true;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoginFetching = false;
      state.isLoginError = true;
      state.loginErrorMessage = payload;
    },
    [logoutUser.pending]: (state) => {
      state.isLoginFetching = false;
    },
    [logoutUser.fulfilled]: (state) => {
      state.loginData = [];
      state.isLoginFetching = false;
      state.isLoginSuccess = false;
    },
    [logoutUser.rejected]: (state, { payload }) => {
      state.isLoginError = true;
      state.loginErrorMessage = payload;
    },
  },
});

const { reducer } = authSlice;
export default reducer;
