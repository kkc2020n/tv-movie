import React from "react";
import { useEffect } from "react";
import { updateRegionalMovies } from "../actions/trending_action";
import { connect } from "react-redux";
import { GENRE_MOVIE, REGIONAL_MOVIES } from "../utils/ServiceUrls";
import _ from "underscore";
import { get } from "../utils/Request";

const mapStateToProps = (state) => {
  console.log(state);
  return { regionalMovies: state.trend.regionalMovies };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateRegionalMovies: (data) => dispatch(updateRegionalMovies(data)),
  };
};

const RegionalMovies = (props) => {
  const { regionalMovies } = props;

  const getRegionalMovieData = () => {
    const trend = Promise.all([get(REGIONAL_MOVIES), get(GENRE_MOVIE)]);
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
      const filteredmoviedata = _.filter(
        moviedata,
        (i) => i.backdrop_path !== null
      );
      props.updateRegionalMovies(filteredmoviedata.slice(0, 5));
    });
  };

  useEffect(() => {
    getRegionalMovieData();
  }, []);

  const rowData = regionalMovies.map((item, i) => {
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
            <div className="--original-name">{item.title}</div>
            <div className="--overview">{item.overview}</div>
          </div>
        </a>
      </li>
    );
  });

  return (
    <div className="trend-block">
      <div>
        <h4 className="type-headline">Regional Telugu Movies </h4>
      </div>
      <div className="grid-container">
        <ul className="trending-list">{rowData}</ul>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RegionalMovies);
