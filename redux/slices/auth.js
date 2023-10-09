import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchSignIn = createAsyncThunk(
  "/api/auth/signIn",
  async (params) => {
    const { data } = await axios.post(
      "/api/auth/signIn",
      JSON.stringify(params)
    );
    return data;
  }
);

export const fetchLogIn = createAsyncThunk(
  "/api/auth/logIn",
  async (params) => {
    const { data } = await axios.post(
      "/api/auth/logIn",
      JSON.stringify(params)
    );
    return data;
  }
);

const initialState = {
  userData: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.userData = null;
      state.status = "loading";
    },
  },
  extraReducers: {
    [fetchSignIn.pending]: (state) => {
      state.userData = null;
      state.status = "pending";
    },
    [fetchSignIn.fulfilled]: (state, action) => {
      state.userData = action.payload;
      state.status = "fulfilled";
    },
    [fetchSignIn.rejected]: (state) => {
      state.userData = null;
      state.status = "rejected";
    },
    [fetchLogIn.pending]: (state) => {
      state.userData = null;
      state.status = "pending";
    },
    [fetchLogIn.fulfilled]: (state, action) => {
      state.userData = action.payload;
      state.status = "fulfilled";
    },
    [fetchLogIn.rejected]: (state) => {
      state.userData = null;
      state.status = "rejected";
    },
  },
});

export const { logOut } = authSlice.actions;

export const AuthReducer = authSlice.reducer;
