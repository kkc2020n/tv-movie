import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { PRIME_SHOW } from "../utils/ServiceUrls";
import { API_KEY, PRIME_SHOW_ID } from "../utils/Constants";
import { setHome } from "../slices/appSlice";
import { setMedia } from "../slices/mediaDetailsSlice";

const PrimeShow = () => {
  const dispatch = useDispatch();
  const [primeShow, setPrimeShow] = useState({});

  const getEpisodeDetails = (show) => {
    dispatch(setHome(false));
    dispatch(setMedia(show));
  };

  useEffect(() => {
    const EPISODE_URL = `https://api.themoviedb.org/3/tv/${PRIME_SHOW_ID}/season/1?api_key=${API_KEY}&language=en-US`;
    Promise.all([axios.get(PRIME_SHOW), axios.get(EPISODE_URL)])
      .then(([tv, ep]) => {
        const data = tv.data;
        data.episodes = ep.data.episodes;
        setPrimeShow(data);
      })
      .catch(console.error);
  }, []);

  const episodesData = (primeShow.seasons || []).filter((i) => i.poster_path !== null);

  const rowData = episodesData.map((item, i) => {
    const imgpath = `http://image.tmdb.org/t/p/w780/${item.poster_path}`;
    return (
      <li data-index-item={i} key={i}>
        <a className="movie-item">
          <div className="canvas-left">
            <div className="canvas-artwork">
              <div
                className="artwork"
                onClick={() => getEpisodeDetails(primeShow)}
              >
                <picture>
                  <source type="image/jpeg" srcSet={imgpath}></source>
                  <img
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
          <div className="--overview">{item.overview}</div>
        </div>
      </li>
    );
  });

  return (
    <div className="trend-block">
      <div>
        <h4 className="type-headline">{primeShow.name}</h4>
        <p className="type-headline-overview">{primeShow.overview}</p>
        <h4 className="type-headline">Season 1</h4>
      </div>
      <div className="grid-container">
        <ul className="trending-list big">{rowData}</ul>
      </div>
    </div>
  );
};

export default PrimeShow;
