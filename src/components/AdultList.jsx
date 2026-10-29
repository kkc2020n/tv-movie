import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ADULT_LIST } from "../utils/ServiceUrls";

const BADGES = [
  "New Episode Every Wednesday",
  "New Season 2 Dec",
  "Must-See Hit",
  "Critically Acclaimed",
  "#1 Trending",
];

const TAGLINES = [
  "#1 in Crime on Apple TV",
  "#1 in Comedy on Apple TV",
  "Top Rated on Apple TV",
  "#1 in Drama on Apple TV",
  "Apple TV+ Original",
];

const AdultList = () => {
  const [movies, setMovies] = useState([]);
  const listRef = useRef(null);

  useEffect(() => {
    axios
      .get(ADULT_LIST)
      .then((res) => {
        const items = (res.data.items || []).filter(
          (item) => item.backdrop_path || item.poster_path
        );
        setMovies(items);
      })
      .catch(console.error);
  }, []);

  const scroll = (direction) => {
    if (listRef.current) {
      const scrollAmount = listRef.current.clientWidth * 0.75;
      listRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!movies.length) return null;

  return (
    <section className="shelf-section showcase-shelf-section">
      <div className="shelf-header">
        <h2 className="shelf-title">
          Armchair Detectives Wanted
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
        <ul ref={listRef} className="showcase-track">
          {movies.map((item, i) => {
            const imgUrl = item.backdrop_path
              ? `https://image.tmdb.org/t/p/w780${item.backdrop_path}`
              : `https://image.tmdb.org/t/p/w500${item.poster_path}`;

            const badgeText = BADGES[i % BADGES.length];
            const taglineText = TAGLINES[i % TAGLINES.length];

            return (
              <li key={item.id || i} className="showcase-item">
                <div className="showcase-card" role="button" tabIndex={0}>
                  <button
                    className="card-action-btn"
                    aria-label="Audio / Info"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                    </svg>
                  </button>
                  <img
                    loading="lazy"
                    className="showcase-card-img"
                    src={imgUrl}
                    alt={item.title || item.name}
                  />
                  <div className="showcase-card-gradient"></div>
                  <div className="showcase-card-content">
                    {badgeText && (
                      <span className="showcase-badge">{badgeText}</span>
                    )}
                    <h3 className="showcase-card-title">
                      {item.title || item.name}
                    </h3>
                    <div className="showcase-meta">
                      <span className="apple-tv-pill">tv</span>
                      <span>TV Show · Drama · Thriller</span>
                    </div>
                    <div className="showcase-tagline">{taglineText}</div>
                  </div>
                </div>
              </li>
            );
          })}
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

export default AdultList;
