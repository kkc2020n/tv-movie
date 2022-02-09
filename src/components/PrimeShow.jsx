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
import { PRIME_SHOW_ID } from "../utils/Constants";
import { updateisHome } from "../actions/app_actions";
import { updateMediaDetail } from "../actions/media_details_action";

const mapStateToProps = (state) => {
  return {
    primeShow: state.trend.primeShow,
    episodeData: state.trend.episodes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePrimeShow: (data) => dispatch(updatePrimeShow(data)),
    updatePrimeShowEpisodes: (data) => dispatch(updatePrimeShowEpisodes(data)),
    updateisHome: (data) => dispatch(updateisHome(data)),
    updateMediaDetail: (data) => dispatch(updateMediaDetail(data))
  };
};

const PrimeShow = (props) => {
  const { primeShow } = props;

  const getEpisodeDetails = (primeShow) => {
    props.updateisHome(false);
    props.updateMediaDetail(primeShow);
  };

  const getPrimeShow = () => {
    const EPISODE_URL = `https://api.themoviedb.org/3/tv/${PRIME_SHOW_ID}/season/1?api_key=${API_KEY}&language=en-US`;
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

  let episodesData = primeShow.seasons ? primeShow.seasons : [];
  episodesData = _.filter(episodesData, (i) => i.poster_path !== null);
  console.log("kkkk", episodesData);
  const rowData = episodesData.map((item, i) => {
    const imgpath = `http://image.tmdb.org/t/p/w780/${item.poster_path}`;
    //const imgpath =
    //"https://cdn.blacked.com/scene/videoimages/100040/mainLandscape/1538995812636/blacked-dani-daniels-blacked_627x353.jpeg?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9jZG4uYmxhY2tlZC5jb20vc2NlbmUvdmlkZW9pbWFnZXMvMTAwMDQwLyovKi8qXyp4Ki4qIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjQ0NDg0MTU5fX19XX0_&Key-Pair-Id=K18SM53O8A1CFO&Signature=dJy8iCJi6PbYyqwIpfe7EZ3VK1Neftgm9TC036moxYQhj0mDtz1Vsn5o5~7IXKeJY6on3Coooho0pb2KZO5dayQZuqK7r7ZYN0IWkMftGKYCNDa6qOkUsBziWEyBFID8CieSdxEN4I3YOAqUa-sLtqeODsEPLHw-MF1O2lJK6E6GmnV8wfZPRo8ZEVFcdVQpFLAuYyDgBLNgJJk2O7Nyic9tlajzS3fc7ioFmgwHrI59pgF2x2JQ-cRWiXTSphhm~iI6zVXTfSPOKIAA~VSc7W7kONg7BI0ooRNVsQBF-zphJM8llEIvUt5pB80JEAKuIdqqNpcv560GMGs1zk9D4Q__";
    return (
      <li data-index-item={i} key={i}>
        <a className="movie-item">
          <div className="canvas-left">
            <div className="canvas-artwork">
              <div
                className="artwork"
                onClick={(e) => getEpisodeDetails(primeShow)}
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
          <div className="--overview ">{item.overview}</div>
        </div>
      </li>
    );
  });

  return (
    <div className="trend-block">
      <div>
        <h4 className="type-headline">{primeShow.name} </h4>
        <p className="type-headline-overview">{primeShow.overview}</p>
        <h4 className="type-headline"> Season 1 </h4>
      </div>
      <div className="grid-container">
        <ul className="trending-list big">{rowData}</ul>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PrimeShow);
