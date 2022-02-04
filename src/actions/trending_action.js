import {
  UPDATE_TRENDING_MOVIES,
  UPDATE_TRENDING_TV,
  UPDATE_PRIME_SHOW,
  UPDATE_REGIONAL_MOVIES
} from "../utils/Constants";
export const updateTrendingTV = (payload) => {
  return {
    type: UPDATE_TRENDING_TV,
    payload
  };
};

export const updateTrendingMovies = (payload) => {
  return {
    type: UPDATE_TRENDING_MOVIES,
    payload
  };
};

export const updateRegionalMovies = (payload) => {
  return {
    type: UPDATE_REGIONAL_MOVIES,
    payload
  };
};

export const updatePrimeShow = (payload) => {
  return {
    type: UPDATE_PRIME_SHOW,
    payload
  };
};