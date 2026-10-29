import { useSelector, useDispatch } from "react-redux";
import { fetchMediaDetails, clearMedia } from "../slices/mediaDetailsSlice";
import { setHome } from "../slices/appSlice";

export const useMediaDetail = () => {
  const dispatch = useDispatch();
  const { tvShow, seasonEpisodes, isLoading, error } = useSelector(
    (state) => state.mediaDetails
  );

  const selectShow = (id) => {
    dispatch(fetchMediaDetails(id));
    dispatch(setHome(false));
  };

  const resetMedia = () => {
    dispatch(clearMedia());
    dispatch(setHome(true));
  };

  return {
    tvShow,
    seasonEpisodes,
    isLoading,
    error,
    selectShow,
    resetMedia,
  };
};

export default useMediaDetail;
