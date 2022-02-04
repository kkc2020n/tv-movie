import React from "react";
import { useEffect } from "react";
import {
  updatePrimeShow,
  updatePrimeShowEpisodes
} from "../actions/trending_action";
import { connect } from "react-redux";
import { PRIME_SHOW } from "../utils/ServiceUrls";
import { API_KEY } from "../utils/Constants";
import _ from "underscore";
import { get } from "../utils/Request";

const mapStateToProps = (state) => {
  return {
    primeShow: state.trend.primeShow,
    episodeData: state.trend.episodes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePrimeShow: (data) => dispatch(updatePrimeShow(data)),
    updatePrimeShowEpisodes: (data) => dispatch(updatePrimeShowEpisodes(data))
  };
};

const PrimeShow = (props) => {
  const { primeShow } = props;

  const getPrimeShow = () => {
    const EPISODE_URL = `https://api.themoviedb.org/3/tv/98177/season/2?api_key=${API_KEY}&language=en-US`;
    const season = Promise.all([get(PRIME_SHOW), get(EPISODE_URL)]);
    season.then(([tv, ep]) => {
      const data = tv.data;
      const epdata = ep.data.episodes;
      console.log("primshow", data);
      data.episodes = epdata;
      props.updatePrimeShow(data);
    });
  };

  useEffect(() => {
    getPrimeShow();
  }, []);

  const episodesData = primeShow.episodes ? primeShow.episodes : [];
  console.log("kkkk", episodesData);
  const rowData = episodesData.map((item, i) => {
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
                    className="media-artwork-v2__image"
                    src={imgpath}
                    sizes={`(min-width:300px) and (max-width:739px) 739px, (min-width:740px) and (max-width:999px) 499px, (min-width:1000px) and (max-width:1319px) 439px, 419px`}
                  />
                </picture>
              </div>
            </div>
          </div>
        </a>
      </li>
    );
  });

  return (
    <div className="trend-block">
      <div>
        <h4 className="type-headline">{primeShow.name} </h4>
        <p className="type-headline-overview">{primeShow.overview}</p>
        <h4 className="type-headline"> Season 2 </h4>
      </div>
      <div className="grid-container">
        <ul className="trending-list big">{rowData}</ul>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PrimeShow);
