import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import trendingMoviesApi from "../api/trendingMoviesApi";

const initialState = {
  trendingMovies: [],
  genres: [],
  isLoading: false,
  error: null,
};

export const fetchTrendingMovies = createAsyncThunk(
  "trendingMovies/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await trendingMoviesApi.getTrendingMovies();
      return response.data.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMovieGenres = createAsyncThunk(
  "trendingMovies/fetchGenres",
  async (_, { rejectWithValue }) => {
    try {
      const response = await trendingMoviesApi.getMovieGenres();
      return response.data.genres;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const trendingMoviesSlice = createSlice({
  name: "trendingMovies",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trendingMovies = action.payload;
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchMovieGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
      });
  },
});

export const { clearError } = trendingMoviesSlice.actions;
export default trendingMoviesSlice.reducer;
