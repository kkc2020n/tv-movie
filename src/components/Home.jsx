import React from "react";
import TrendingTVList from "./TrendingTVList";
import TrendingMoviesList from "./TrendingMoviesList";
import TvFavourites from "./TvFavourites";
import AdultList from "./AdultList";
import RegionalMovies from "./RegionalMovies";

const Home = () => {
  return (
    <main className="home-view">
      <TrendingTVList />
      <TvFavourites />
      <TrendingMoviesList />
      {/* <AdultList /> */}
      <RegionalMovies />
    </main>
  );
};

export default Home;
