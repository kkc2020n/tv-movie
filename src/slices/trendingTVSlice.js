import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import trendingTVApi from "../api/trendingTVApi";

const initialState = {
  trendingTV: [],
  genres: [],
  isLoading: false,
  error: null,
};

export const fetchTrendingTV = createAsyncThunk(
  "trendingTV/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await trendingTVApi.getTrendingTV();
      return response.data.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTVGenres = createAsyncThunk(
  "trendingTV/fetchGenres",
  async (_, { rejectWithValue }) => {
    try {
      const response = await trendingTVApi.getTVGenres();
      return response.data.genres;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const trendingTVSlice = createSlice({
  name: "trendingTV",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingTV.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTrendingTV.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trendingTV = action.payload;
      })
      .addCase(fetchTrendingTV.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchTVGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
      });
  },
});

export const { clearError } = trendingTVSlice.actions;
export default trendingTVSlice.reducer;
