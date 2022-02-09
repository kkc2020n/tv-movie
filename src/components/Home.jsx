import React from "react";
import TrendingMoviesList from "./TrendingMoviesList";
import TrendingTVList from "./TrendingTVList";
import RegionalMovies from "./RegionalMovies";
import PrimeShow from "./PrimeShow";

const Home = (props) => {
  return (
    <div>
      <TrendingMoviesList />
      <div className="divider"></div>
      <TrendingTVList />
      <div className="divider"></div>
      {/* <PrimeShow />
      <div className="divider"></div> */}
      <RegionalMovies />
    </div>
  );
};

export default Home;
