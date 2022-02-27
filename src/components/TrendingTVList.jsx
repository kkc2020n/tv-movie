import React from "react";
import { useEffect } from "react";
import { updateTrendingTV } from "../actions/trending_action";
import { connect } from "react-redux";
import { GENRE_TV, TRENDING_TV } from "../utils/ServiceUrls";
import _ from "underscore";
import { get } from "../utils/Request";
import { updateisHome } from "../actions/app_actions";
import { updateMediaDetail } from "../actions/media_details_action";
import { BASE_TV_URL, API_KEY } from "../utils/Constants";

const mapStateToProps = (state) => {
  return { trendingTV: state.trend.trendingTV };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTrendingTV: (data) => dispatch(updateTrendingTV(data)),
    updateMediaDetail: (data) => dispatch(updateMediaDetail(data)),
    updateisHome: (data) => dispatch(updateisHome(data))
  };
};

const TrendingTVList = (props) => {
  const { trendingTV } = props;

  const getEpisodeDetails = (show) => {
    console.log(show, "show");
    const tvdetail = `${BASE_TV_URL}/${show.id}?api_key=${API_KEY}&language=en-US`;
    const castdetail = `${BASE_TV_URL}/${show.id}/credits?api_key=${API_KEY}&language=en-US`;
    const media = Promise.all([get(tvdetail), get(castdetail)]);
    media.then(([tvresp, castresp]) => {
      props.updateisHome(false);
      const data = tvresp.data;
      data.credits = castresp.data;
      props.updateMediaDetail(data);
    });
  };
  const getTrendingTvData = () => {
    const trend = Promise.all([get(TRENDING_TV), get(GENRE_TV)]);
    trend.then(([tv, genreData]) => {
      const data = tv.data;
      const genreArr = genreData.data.genres;
      const tvdata = data.results.map((item) => {
        const [genre_first] = item.genre_ids;
        const [genreobj] = _.filter(genreArr, (g) => g.id === genre_first);
        const genre_name = genreobj.name;
        item.genre_name = genre_name;
        return item;
      });
      console.log("moviedata", tvdata);
      props.updateTrendingTV(tvdata.slice(0, 10));
    });
  };

  useEffect(() => {
    getTrendingTvData();
  }, []);

  const rowData = trendingTV.map((item, i) => {
    const imgpath = `http://image.tmdb.org/t/p/w780/${item.backdrop_path}`;
    return (
      <li data-index-item={i} key={i}>
        <a className="movie-item">
          <div className="canvas-left">
            <div className="canvas-artwork">
              <div
                className="artwork"
                style={{ cursor: "pointer" }}
                onClick={(e) => getEpisodeDetails(item)}
              >
                <picture>
                  <source type="image/jpeg" srcSet={imgpath}></source>
                  <img
                    loading="lazy"
                    className="media-artwork-v2__image"
                    src={imgpath}
                    sizes={`(min-width:300px) and (max-width:739px) 739px, (min-width:740px) and (max-width:999px) 499px, (min-width:1000px) and (max-width:1319px) 659px, 559px`}
                  />
                </picture>
              </div>
            </div>
          </div>
          <div className="canvas-right">
            <div className="--genre--text">{item.genre_name.toUpperCase()}</div>
            <div className="--original-name">{item.name}</div>
            <div className="--overview">{item.overview}</div>
          </div>
        </a>
      </li>
    );
  });

  return (
    <div className="trend-block">
      <div>
        <h2 className="type-headline">Trending TV Shows </h2>
      </div>
      <div className="grid-container">
        <ul className="trending-list">{rowData}</ul>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TrendingTVList);
