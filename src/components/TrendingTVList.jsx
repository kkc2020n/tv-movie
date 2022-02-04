import React from "react";
import { useEffect } from "react";
import { updateTrendingTV } from "../actions/trending_action";
import { connect } from "react-redux";
import { GENRE_TV, TRENDING_TV } from "../utils/ServiceUrls";
import _ from "underscore";
import { get } from "../utils/Request";

const mapStateToProps = (state) => {
  return { trendingTV: state.trend.trendingTV };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTrendingTV: (data) => dispatch(updateTrendingTV(data))
  };
};

const TrendingTVList = (props) => {
  const { trendingTV } = props;

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
      props.updateTrendingTV(tvdata.slice(0, 5));
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
              <div className="artwork">
                <picture>
                  <source type="image/jpeg" srcSet={imgpath}></source>
                  <img
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
        <h4 className="type-headline">Trending TV Shows </h4>
      </div>
      <div className="grid-container">
        <ul className="trending-list">{rowData}</ul>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TrendingTVList);
