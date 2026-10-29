import axios from "axios";
import { API_KEY } from "../utils/Constants";

const BASE_URL = "https://api.themoviedb.org/3";

export const regionalMoviesApi = {
  getTeluguMovies: () =>
    axios.get(`${BASE_URL}/discover/movie`, {
      params: { api_key: API_KEY, with_original_language: "te" },
    }),

  getHindiMovies: () =>
    axios.get(`${BASE_URL}/discover/movie`, {
      params: { api_key: API_KEY, with_original_language: "hi" },
    }),

  getMovieGenres: () =>
    axios.get(`${BASE_URL}/genre/movie/list`, {
      params: { api_key: API_KEY, language: "en-US" },
    }),
};

export default regionalMoviesApi;
