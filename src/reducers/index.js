import { combineReducers } from "redux";
import trendingReducer from "./trending_movie_reducer";

const rootReducer = combineReducers({
  trend: trendingReducer
});

export default rootReducer;
