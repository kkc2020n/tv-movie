import { UPDATE_MEDIA, UPDATE_COMPLETE_MEDIA } from "../utils/Constants";
const inititalState = { media: {} };
const mediaDetailsReducer = (state = inititalState, action) => {
  switch (action.type) {
    case UPDATE_MEDIA:
      state = Object.assign({}, state);
      state.media = action.payload;
      return state;
    case UPDATE_COMPLETE_MEDIA:
      state = Object.assign({}, state);
      state.media_cdata = action.payload;
      return state;
    default:
      return state;
  }
};
export default mediaDetailsReducer;
