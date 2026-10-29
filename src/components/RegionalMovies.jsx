import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTeluguMovies,
  fetchHindiMovies,
  fetchMovieGenres,
} from "../slices/regionalMoviesSlice";

const RegionalMovies = () => {
  const dispatch = useDispatch();
  const teluguRef = useRef(null);
  const hindiRef = useRef(null);
  const { teluguMovies, hindiMovies, genres } = useSelector(
    (state) => state.regionalMovies
  );

  useEffect(() => {
    dispatch(fetchTeluguMovies());
    dispatch(fetchHindiMovies());
    dispatch(fetchMovieGenres());
  }, [dispatch]);

  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = ref.current.clientWidth * 0.75;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const teluguWithGenres = (teluguMovies || []).map((item) => {
    const genreId = item.genre_ids?.[0];
    const genre = (genres || []).find((g) => g.id === genreId);
    return { ...item, genre_name: genre?.name || "Action" };
  });

  const hindiWithGenres = (hindiMovies || []).map((item) => {
    const genreId = item.genre_ids?.[0];
    const genre = (genres || []).find((g) => g.id === genreId);
    return { ...item, genre_name: genre?.name || "Drama" };
  });

  const renderCardList = (list) => {
    return list.slice(0, 10).map((item, i) => {
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
  };

  return (
    <>
      <section className="shelf-section">
        <div className="shelf-header">
          <h2 className="shelf-title">
            Top 10 Telugu Movies <span className="chevron-icon">›</span>
          </h2>
        </div>
        <div className="shelf-carousel">
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={() => scroll(teluguRef, "left")}
            aria-label="Previous"
          >
            ‹
          </button>
          <ul ref={teluguRef} className="shelf-track">
            {renderCardList(teluguWithGenres)}
          </ul>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={() => scroll(teluguRef, "right")}
            aria-label="Next"
          >
            ›
          </button>
        </div>
      </section>

      <section className="shelf-section">
        <div className="shelf-header">
          <h2 className="shelf-title">
            Top 10 Hindi Movies <span className="chevron-icon">›</span>
          </h2>
        </div>
        <div className="shelf-carousel">
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={() => scroll(hindiRef, "left")}
            aria-label="Previous"
          >
            ‹
          </button>
          <ul ref={hindiRef} className="shelf-track">
            {renderCardList(hindiWithGenres)}
          </ul>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={() => scroll(hindiRef, "right")}
            aria-label="Next"
          >
            ›
          </button>
        </div>
      </section>
    </>
  );
};

export default RegionalMovies;
