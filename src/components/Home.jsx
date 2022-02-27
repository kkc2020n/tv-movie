import React from "react";
import TrendingMoviesList from "./TrendingMoviesList";
import TrendingTVList from "./TrendingTVList";
import RegionalMovies from "./RegionalMovies";
import AdultList from "./AdultList";
import Banner from "./Banner";

const Home = (props) => {
  return (
    <div>
      <TrendingMoviesList />
      <div className="divider"></div>
      <TrendingTVList />

      <Banner />
      <div className="divider"></div>
      <RegionalMovies />
      {/* <div className="divider"></div>
      <AdultList /> */}
    </div>
  );
};

export default Home;
