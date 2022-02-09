import { UPDATE_IS_HOME } from "../utils/Constants";
export const updateisHome = (payload) => {
  return {
    type: UPDATE_IS_HOME,
    payload
  };
};
