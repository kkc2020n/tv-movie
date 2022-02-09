import { UPDATE_IS_HOME } from "../utils/Constants";
const inititalState = { isHome: true };

const appReducer = (state = inititalState, action) => {
  switch (action.type) {
    case UPDATE_IS_HOME:
      state = Object.assign({}, state);
      state.isHome = action.payload;
      return state;
    default:
      return state;
  }
};

export default appReducer;
