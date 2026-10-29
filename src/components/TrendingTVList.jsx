import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTrendingTV, fetchTVGenres } from "../slices/trendingTVSlice";
import { fetchMediaDetails } from "../slices/mediaDetailsSlice";
import { setHome } from "../slices/appSlice";

const TrendingTVList = () => {
  const dispatch = useDispatch();
  const listRef = useRef(null);
  const { trendingTV, genres } = useSelector((state) => state.trendingTV);

  useEffect(() => {
    dispatch(fetchTrendingTV());
    dispatch(fetchTVGenres());
  }, [dispatch]);

  const handleShowClick = (item) => {
    dispatch(fetchMediaDetails(item.id));
    dispatch(setHome(false));
  };

  const scroll = (direction) => {
    if (listRef.current) {
      const scrollAmount = listRef.current.clientWidth * 0.75;
      listRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const tvsWithGenres = (trendingTV || []).map((item) => {
    const genreId = item.genre_ids?.[0];
    const genre = (genres || []).find((g) => g.id === genreId);
    return { ...item, genre_name: genre?.name || "TV Series" };
  });

  const displayTVs = tvsWithGenres.slice(0, 10);

  const rowData = displayTVs.map((item, i) => {
    const posterUrl = item.poster_path
      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
      : `https://image.tmdb.org/t/p/w780${item.backdrop_path}`;

    return (
      <li data-index-item={i} key={item.id || i} className="shelf-item">
        <div
          className="apple-card"
          onClick={() => handleShowClick(item)}
          role="button"
          tabIndex={0}
        >
          <span className="rank-number">{i + 1}</span>
          <div className="poster-wrapper">
            <img
              loading="lazy"
              className="poster-img"
              src={posterUrl}
              alt={item.name || item.original_name}
            />
            <div className="card-gradient"></div>
            <div className="card-info">
              <div className="card-title">{item.name || item.original_name}</div>
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
          Top 10 TV Shows <span className="chevron-icon">›</span>
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

export default TrendingTVList;
