import axios from "axios";
import { API_KEY } from "../utils/Constants";

const BASE_URL = "https://api.themoviedb.org/3";

export const trendingMoviesApi = {
  getTrendingMovies: () =>
    axios.get(`${BASE_URL}/trending/movie/day`, {
      params: { api_key: API_KEY },
    }),

  getMovieGenres: () =>
    axios.get(`${BASE_URL}/genre/movie/list`, {
      params: { api_key: API_KEY, language: "en-US" },
    }),
};

export default trendingMoviesApi;
