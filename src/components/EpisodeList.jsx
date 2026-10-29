import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSeasonEpisodes } from "../slices/mediaDetailsSlice";
import CastList from "./CastList";

const EpisodeList = ({ data }) => {
  const dispatch = useDispatch();
  const { tvShow, seasonEpisodes } = useSelector((state) => state.mediaDetails);

  const media = data || tvShow;

  useEffect(() => {
    if (media?.id && (!seasonEpisodes || seasonEpisodes.length === 0)) {
      dispatch(fetchSeasonEpisodes({ id: media.id, seasonNumber: 1 }));
    }
  }, [dispatch, media?.id]);

  const episodes = seasonEpisodes || [];
  const rowData = episodes.map((item, i) => {
    const imgpath = `http://image.tmdb.org/t/p/w780/${item.still_path}`;
    return (
      <li data-index-item={i} key={i}>
        <a className="movie-item">
          <div className="canvas-left">
            <div className="canvas-artwork">
              <div className="artwork">
                <picture>
                  <source type="image/jpeg" srcSet={imgpath}></source>
                  <img
                    loading="lazy"
                    className="media-artwork-v2__image"
                    src={imgpath}
                    sizes={`(min-width:300px) and (max-width:739px) 739px, (min-width:740px) and (max-width:999px) 499px, (min-width:1000px) and (max-width:1319px) 439px, 419px`}
                  />
                </picture>
              </div>
            </div>
          </div>
        </a>
        <div>
          <div className="ep-title">{item.name}</div>
          <div className="--overview ">{item.overview}</div>
        </div>
      </li>
    );
  });

  const castData = media?.credits?.cast || [];

  return (
    <div className="grid-container media">
      <div className="media_div">
        <ul className="trending-list big">{rowData}</ul>
      </div>
      <div className="divider"></div>
      <div className="media_div">
        <div className="shelf-grid__header">
          <h2>Cast & Crew</h2>
        </div>
        <CastList data={castData} />
      </div>
    </div>
  );
};

export default EpisodeList;
