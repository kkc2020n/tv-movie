import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../slices/appSlice";
import trendingMoviesReducer from "../slices/trendingMoviesSlice";
import trendingTVReducer from "../slices/trendingTVSlice";
import regionalMoviesReducer from "../slices/regionalMoviesSlice";
import mediaDetailsReducer from "../slices/mediaDetailsSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    trendingMovies: trendingMoviesReducer,
    trendingTV: trendingTVReducer,
    regionalMovies: regionalMoviesReducer,
    mediaDetails: mediaDetailsReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
