import {
  UPDATE_MEDIA,
  UPDATE_MEDIA_SEASONS,
  UPDATE_COMPLETE_MEDIA
} from "../utils/Constants";
export const updateMediaDetail = (payload) => {
  return {
    type: UPDATE_MEDIA,
    payload
  };
};

export const updateMediaSeasonsDetail = (payload) => {
  return {
    type: UPDATE_MEDIA_SEASONS,
    payload
  };
};

export const updateMediaFullDetail = (payload) => {
  return {
    type: UPDATE_COMPLETE_MEDIA,
    payload
  };
};
