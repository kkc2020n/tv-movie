import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTrendingMovies, fetchMovieGenres } from "../slices/trendingMoviesSlice";

const TrendingMoviesList = () => {
  const dispatch = useDispatch();
  const listRef = useRef(null);
  const { trendingMovies, genres } = useSelector((state) => state.trendingMovies);

  useEffect(() => {
    dispatch(fetchTrendingMovies());
    dispatch(fetchMovieGenres());
  }, [dispatch]);

  const scroll = (direction) => {
    if (listRef.current) {
      const scrollAmount = listRef.current.clientWidth * 0.75;
      listRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const moviesWithGenres = (trendingMovies || []).map((item) => {
    const genreId = item.genre_ids?.[0];
    const genre = (genres || []).find((g) => g.id === genreId);
    return { ...item, genre_name: genre?.name || "Movie" };
  });

  const displayMovies = moviesWithGenres.slice(0, 10);

  const rowData = displayMovies.map((item, i) => {
    const posterUrl = item.poster_path
      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
      : `https://image.tmdb.org/t/p/w780${item.backdrop_path}`;

    return (
      <li data-index-item={i} key={item.id || i} className="shelf-item">
        <div className="apple-card" role="button" tabIndex={0}>
          <span className="rank-number">{i + 1}</span>
          <div className="poster-wrapper">
            <img
              loading="lazy"
              className="poster-img"
              src={posterUrl}
              alt={item.title || item.original_title}
            />
            <div className="card-gradient"></div>
            <div className="card-info">
              <div className="card-title">{item.title || item.original_title}</div>
              <div className="card-genre">{item.genre_name}</div>
            </div>
          </div>
        </div>
      </li>
    );
  });

  return (
    <section className="shelf-section">
      <div className="shelf-header">
        <h2 className="shelf-title">
          Top 10 Movies <span className="chevron-icon">›</span>
        </h2>
      </div>
      <div className="shelf-carousel">
        <button
          className="carousel-arrow carousel-arrow-left"
          onClick={() => scroll("left")}
          aria-label="Previous"
        >
          ‹
        </button>
        <ul ref={listRef} className="shelf-track">
          {rowData}
        </ul>
        <button
          className="carousel-arrow carousel-arrow-right"
          onClick={() => scroll("right")}
          aria-label="Next"
        >
          ›
        </button>
      </div>
    </section>
  );
};

export default TrendingMoviesList;
