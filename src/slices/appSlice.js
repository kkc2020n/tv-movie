import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isHome: true,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleHome: (state) => {
      state.isHome = !state.isHome;
    },
    setHome: (state, action) => {
      state.isHome = action.payload;
    },
  },
});

export const { toggleHome, setHome } = appSlice.actions;
export default appSlice.reducer;
