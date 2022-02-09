import { combineReducers } from "redux";
import trendingReducer from "./trending_movie_reducer";
import appReducer from "./app_reducer";
import mediaDetailsReducer from "./media_detail_reducer";
import mediaEpisodesReducer from "./media_episodes";

const rootReducer = combineReducers({
  trend: trendingReducer,
  appState: appReducer,
  mediaDetails: mediaDetailsReducer,
  mediaEpisodes: mediaEpisodesReducer
});

export default rootReducer;
