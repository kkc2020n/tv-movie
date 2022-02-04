import {
  UPDATE_TRENDING_MOVIES,
  UPDATE_TRENDING_TV,
  UPDATE_PRIME_SHOW,
  UPDATE_REGIONAL_MOVIES
} from "../utils/Constants";
const inititalState = {
  trendingMovies: [],
  trendingTV: [],
  primeShow: [],
  regionalMovies: []
};
const trendingReducer = (state = inititalState, action) => {
  switch (action.type) {
    case UPDATE_TRENDING_MOVIES:
      state = Object.assign({}, state);
      state.trendingMovies = action.payload;
      return state;
    case UPDATE_TRENDING_TV:
      state = Object.assign({}, state);
      state.trendingTV = action.payload;
      return state;
    case UPDATE_REGIONAL_MOVIES:
      state = Object.assign({}, state);
      state.regionalMovies = action.payload;
      return state;
    case UPDATE_PRIME_SHOW:
      state = Object.assign({}, state);
      state.primeShow = action.payload;
      return state;
    default:
      return state;
  }
};

export default trendingReducer;
