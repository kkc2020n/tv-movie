import { UPDATE_MEDIA_SEASONS } from "../utils/Constants";
const inititalState = { epdata: [] };
const mediaEpisodesReducer = (state = inititalState, action) => {
  switch (action.type) {
    case UPDATE_MEDIA_SEASONS:
      state = Object.assign({}, state);
      state.epdata = action.payload;
      return state;
    default:
      return state;
  }
};
export default mediaEpisodesReducer;
