import React from "react";
import TrendingMoviesList from "./TrendingMoviesList";
import TrendingTVList from "./TrendingTVList";
import RegionalMovies from "./RegionalMovies";
import Header from "./Header";

const App = (props) => {
  return (
    <div className="main-content">
      <Header />
      <TrendingMoviesList />
      <div className="divider"></div>
      <TrendingTVList />
      <div className="divider"></div>
      <RegionalMovies />
    </div>
  );
};

export default App;
