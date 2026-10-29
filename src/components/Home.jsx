import React from "react";
import TrendingTVList from "./TrendingTVList";
import TrendingMoviesList from "./TrendingMoviesList";
import AdultList from "./AdultList";
import RegionalMovies from "./RegionalMovies";

const Home = () => {
  return (
    <main className="home-view">
      <TrendingTVList />
      <TrendingMoviesList />
      {/* <AdultList /> */}
      <RegionalMovies />
    </main>
  );
};

export default Home;
