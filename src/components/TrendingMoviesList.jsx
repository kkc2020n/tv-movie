import React from "react";
import { useEffect } from "react";
import { updateTrendingMovies } from "../actions/trending_action";
import { connect } from "react-redux";
import { GENRE_MOVIE, TRENDING_MOVIES } from "../utils/ServiceUrls";
import _ from "underscore";
import { get } from "../utils/Request";

const mapStateToProps = (state) => {
  console.log(state);
  return { trendingMovies: state.trend.trendingMovies };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTrendingMovies: (data) => dispatch(updateTrendingMovies(data))
  };
};

const TrendingList = (props) => {
  const { trendingMovies } = props;

  const getTrendingMovieData = () => {
    const trend = Promise.all([get(TRENDING_MOVIES), get(GENRE_MOVIE)]);
    trend.then(([movie, genreData]) => {
      const data = movie.data;
      const genreArr = genreData.data.genres;
      const moviedata = data.results.map((item) => {
        const [genre_first] = item.genre_ids;
        const [genreobj] = _.filter(genreArr, (g) => g.id === genre_first);
        const genre_name = genreobj.name;
        item.genre_name = genre_name;
        return item;
      });
      console.log("moviedata", moviedata);
      props.updateTrendingMovies(moviedata.slice(0, 5));
    });
  };

  useEffect(() => {
    getTrendingMovieData();
  }, []);

  console.log(trendingMovies);
  const rowData = trendingMovies.map((item, i) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(TrendingList);
