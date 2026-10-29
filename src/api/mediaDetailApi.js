import axios from "axios";
import { API_KEY } from "../utils/Constants";

const BASE_URL = "https://api.themoviedb.org/3";

export const mediaDetailApi = {
  getTVDetails: (id) =>
    axios.get(`${BASE_URL}/tv/${id}`, {
      params: { api_key: API_KEY, language: "en-US" },
    }),

  getTVCredits: (id) =>
    axios.get(`${BASE_URL}/tv/${id}/credits`, {
      params: { api_key: API_KEY, language: "en-US" },
    }),

  getSeasonEpisodes: (id, seasonNumber = 1) =>
    axios.get(`${BASE_URL}/tv/${id}/season/${seasonNumber}`, {
      params: { api_key: API_KEY, language: "en-US" },
    }),
};

export default mediaDetailApi;
