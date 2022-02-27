import React from "react";
import { useEffect } from "react";
import { updateAdultMovies } from "../actions/trending_action";
import { connect } from "react-redux";
import { ADULT_LIST } from "../utils/ServiceUrls";
import _ from "underscore";
import { get } from "../utils/Request";

const mapStateToProps = (state) => {
  console.log(state);
  return { adultMovies: state.trend.adultMovies };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAdultMovies: (data) => dispatch(updateAdultMovies(data))
  };
};

const AdultList = (props) => {
  const { adultMovies } = props;

  const getTrendingMovieData = () => {
    const trend = Promise.all([get(ADULT_LIST)]);
    trend.then(([movie]) => {
      let data = movie.data.items;
      data = data.map((item) => {
        item.genre_name = "Adult";
        return item;
      });
      const moviedata = _.filter(data, (e) => e.backdrop_path != null);
      console.log("moviedata", moviedata);
      props.updateAdultMovies(moviedata);
    });
  };

  useEffect(() => {
    getTrendingMovieData();
  }, []);

  console.log(adultMovies);
  const rowData = adultMovies.map((item, i) => {
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
            <div className="--original-name">{item.original_title}</div>
            <div className="--overview">{item.overview}</div>
          </div>
        </a>
      </li>
    );
  });

  return (
    <div className="trend-block">
      <div>
        <h4 className="type-headline">Trending Movies </h4>
      </div>
      <div className="grid-container">
        <ul className="trending-list">{rowData}</ul>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AdultList);
