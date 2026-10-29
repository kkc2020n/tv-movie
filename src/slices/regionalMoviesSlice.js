import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import regionalMoviesApi from "../api/regionalMoviesApi";

const initialState = {
  teluguMovies: [],
  hindiMovies: [],
  genres: [],
  isLoading: false,
  error: null,
};

export const fetchTeluguMovies = createAsyncThunk(
  "regionalMovies/fetchTelugu",
  async (_, { rejectWithValue }) => {
    try {
      const response = await regionalMoviesApi.getTeluguMovies();
      return response.data.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchHindiMovies = createAsyncThunk(
  "regionalMovies/fetchHindi",
  async (_, { rejectWithValue }) => {
    try {
      const response = await regionalMoviesApi.getHindiMovies();
      return response.data.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMovieGenres = createAsyncThunk(
  "regionalMovies/fetchGenres",
  async (_, { rejectWithValue }) => {
    try {
      const response = await regionalMoviesApi.getMovieGenres();
      return response.data.genres;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const regionalMoviesSlice = createSlice({
  name: "regionalMovies",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeluguMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTeluguMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.teluguMovies = action.payload;
      })
      .addCase(fetchTeluguMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchHindiMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchHindiMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hindiMovies = action.payload;
      })
      .addCase(fetchHindiMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchMovieGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
      });
  },
});

export const { clearError } = regionalMoviesSlice.actions;
export default regionalMoviesSlice.reducer;
