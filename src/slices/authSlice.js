// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   signupData: null,
//   loading: false,
//   token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState: initialState,
//   reducers: {
//     setSignupData(state, value) {
//       state.signupData = value.payload;
//     },
//     setLoading(state, value) {
//       state.loading = value.payload;
//     },
//     setToken(state, value) {
//       state.token = value.payload;
//     },
//   },
// });

// export const { setSignupData, setLoading, setToken } = authSlice.actions;

// export default authSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null,
  loading: false,
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, action) {
      state.signupData = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload); // Ensure the token is stored in localStorage when set
      document.cookie = `token=${action.payload}; path=/`;
    },
  },
});

export const { setSignupData, setLoading, setToken } = authSlice.actions;

export default authSlice.reducer;
