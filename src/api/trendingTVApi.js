import axios from "axios";
import { API_KEY } from "../utils/Constants";

const BASE_URL = "https://api.themoviedb.org/3";

export const trendingTVApi = {
  getTrendingTV: () =>
    axios.get(`${BASE_URL}/trending/tv/week`, {
      params: { api_key: API_KEY, region: "IN" },
    }),

  getTVGenres: () =>
    axios.get(`${BASE_URL}/genre/tv/list`, {
      params: { api_key: API_KEY, language: "en-US" },
    }),

  getTVDetails: (id) =>
    axios.get(`${BASE_URL}/tv/${id}`, {
      params: { api_key: API_KEY, language: "en-US" },
    }),

  getTVCredits: (id) =>
    axios.get(`${BASE_URL}/tv/${id}/credits`, {
      params: { api_key: API_KEY, language: "en-US" },
    }),
};

export default trendingTVApi;
