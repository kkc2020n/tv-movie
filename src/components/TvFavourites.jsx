import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchTVSeries } from "../api/tvFavouritesApi";
import { fetchMediaDetails } from "../slices/mediaDetailsSlice";
import { setHome } from "../slices/appSlice";

const TvFavourites = () => {
  const dispatch = useDispatch();
  const listRef = useRef(null);
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetchTVSeries()
      .then((data) => {
        if (isMounted) {
          setFavourites(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load TV favourites:", err);
        if (isMounted) {
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

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

  if (!loading && favourites.length === 0) {
    return null;
  }

  const rowData = favourites.map((item, i) => {
    const year = item.firstAirDate ? item.firstAirDate.slice(0, 4) : "";

    return (
      <li data-index-item={i} key={item.id || i} className="shelf-item">
        <div
          className="apple-card favourite-card"
          onClick={() => handleShowClick(item)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleShowClick(item);
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={`View details for ${item.name}`}
        >
          {item.rating > 0 && (
            <div className="favourite-rating-badge">
              <span className="star-icon">★</span>
              <span>{item.rating.toFixed(1)}</span>
            </div>
          )}
          <div className="poster-wrapper">
            {item.poster ? (
              <img
                loading="lazy"
                className="poster-img"
                src={item.poster}
                alt={item.name}
              />
            ) : (
              <div className="poster-placeholder">
                <span>{item.name}</span>
              </div>
            )}
            <div className="card-gradient"></div>
            <div className="card-info">
              <div className="card-title" title={item.name}>
                {item.name}
              </div>
              <div className="card-genre">
                {year ? `${year} • TV Series` : "TV Series"}
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  });

  return (
    <section className="shelf-section tv-favourites-section">
      <div className="shelf-header">
        <h2 className="shelf-title">
          Tv Favourites <span className="chevron-icon">›</span>
        </h2>
      </div>
      <div className="shelf-carousel">
        <button
          className="carousel-arrow carousel-arrow-left"
          onClick={() => scroll("left")}
          aria-label="Previous Favourites"
        >
          ‹
        </button>
        <ul ref={listRef} className="shelf-track">
          {rowData}
        </ul>
        <button
          className="carousel-arrow carousel-arrow-right"
          onClick={() => scroll("right")}
          aria-label="Next Favourites"
        >
          ›
        </button>
      </div>
    </section>
  );
};

export default TvFavourites;
