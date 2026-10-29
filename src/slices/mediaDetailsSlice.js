import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import mediaDetailApi from "../api/mediaDetailApi";

const initialState = {
  tvShow: null,
  seasonEpisodes: [],
  isLoading: false,
  error: null,
};

// Async thunk to fetch complete media details (tv show, credits, and season 1 episodes)
export const fetchMediaDetails = createAsyncThunk(
  "mediaDetails/fetchMediaDetails",
  async (id, { rejectWithValue }) => {
    try {
      const [tvResp, castResp, seasonResp] = await Promise.all([
        mediaDetailApi.getTVDetails(id),
        mediaDetailApi.getTVCredits(id),
        mediaDetailApi.getSeasonEpisodes(id, 1).catch(() => ({ data: { episodes: [] } })),
      ]);
      const data = tvResp.data;
      data.credits = castResp.data;
      return {
        tvShow: data,
        seasonEpisodes: seasonResp.data.episodes || [],
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch TV show details
export const fetchTVShowDetails = createAsyncThunk(
  "mediaDetails/fetchShow",
  async (id, { rejectWithValue }) => {
    try {
      const response = await mediaDetailApi.getTVDetails(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch TV show credits
export const fetchTVCredits = createAsyncThunk(
  "mediaDetails/fetchCredits",
  async (id, { rejectWithValue }) => {
    try {
      const response = await mediaDetailApi.getTVCredits(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch season episodes
export const fetchSeasonEpisodes = createAsyncThunk(
  "mediaDetails/fetchSeason",
  async ({ id, seasonNumber = 1 }, { rejectWithValue }) => {
    try {
      const response = await mediaDetailApi.getSeasonEpisodes(id, seasonNumber);
      return response.data.episodes;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const mediaDetailsSlice = createSlice({
  name: "mediaDetails",
  initialState,
  reducers: {
    setMedia: (state, action) => {
      state.tvShow = action.payload;
    },
    setSeasonEpisodes: (state, action) => {
      state.seasonEpisodes = action.payload;
    },
    clearMedia: (state) => {
      state.tvShow = null;
      state.seasonEpisodes = [];
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMediaDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMediaDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tvShow = action.payload.tvShow;
        state.seasonEpisodes = action.payload.seasonEpisodes;
      })
      .addCase(fetchMediaDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchTVShowDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTVShowDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tvShow = action.payload;
      })
      .addCase(fetchTVShowDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchTVCredits.fulfilled, (state, action) => {
        if (state.tvShow) {
          state.tvShow.credits = action.payload;
        }
      })
      .addCase(fetchSeasonEpisodes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSeasonEpisodes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.seasonEpisodes = action.payload;
      })
      .addCase(fetchSeasonEpisodes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setMedia, setSeasonEpisodes, clearMedia, clearError } = mediaDetailsSlice.actions;
export default mediaDetailsSlice.reducer;
