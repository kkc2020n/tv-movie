import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSeasonEpisodes } from "../slices/mediaDetailsSlice";
import CastList from "./CastList";

const EpisodeList = ({ data }) => {
  const dispatch = useDispatch();
  const listRef = useRef(null);
  const { tvShow, seasonEpisodes, isLoading } = useSelector(
    (state) => state.mediaDetails
  );

  const media = data || tvShow;
  const allSeasons = media?.seasons || [];
  // Exclude season 0 (Specials) unless it is the only season
  const regularSeasons = allSeasons.filter((s) => s.season_number > 0);
  const availableSeasons = regularSeasons.length > 0 ? regularSeasons : allSeasons;

  const [selectedSeason, setSelectedSeason] = useState(
    availableSeasons[0]?.season_number || 1
  );

  useEffect(() => {
    if (media?.id) {
      dispatch(
        fetchSeasonEpisodes({ id: media.id, seasonNumber: selectedSeason })
      );
    }
  }, [dispatch, media?.id, selectedSeason]);

  const handleSeasonChange = (e) => {
    const seasonNum = Number(e.target.value);
    setSelectedSeason(seasonNum);
    if (listRef.current) {
      listRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
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

  const episodes = seasonEpisodes || [];
  const defaultRuntime = media?.episode_run_time?.[0]
    ? `${media.episode_run_time[0]}m`
    : "";

  const rowData = episodes.map((item, i) => {
    const stillUrl = item.still_path
      ? `https://image.tmdb.org/t/p/w780${item.still_path}`
      : media?.backdrop_path
      ? `https://image.tmdb.org/t/p/w780${media.backdrop_path}`
      : "";

    const runtimeText = item.runtime ? `${item.runtime}m` : defaultRuntime;
    const epNumber = item.episode_number ?? i + 1;

    return (
      <li data-index-item={i} key={item.id || i} className="episode-shelf-item">
        <div className="episode-card" role="button" tabIndex={0}>
          <div className="episode-card__thumbnail-wrapper">
            {stillUrl ? (
              <img
                loading="lazy"
                className="episode-card__thumbnail"
                src={stillUrl}
                alt={item.name || `Episode ${epNumber}`}
                onError={(e) => {
                  if (media?.backdrop_path) {
                    e.currentTarget.src = `https://image.tmdb.org/t/p/w780${media.backdrop_path}`;
                  }
                }}
              />
            ) : (
              <div className="episode-card__placeholder">
                <span className="episode-card__placeholder-icon">🎬</span>
              </div>
            )}
            <div className="episode-card__gradient"></div>
            <div className="episode-card__content">
              <span className="episode-card__badge">EPISODE {epNumber}</span>
              <h3 className="episode-card__title" title={item.name}>
                {item.name || `Episode ${epNumber}`}
              </h3>
              <p className="episode-card__overview">
                {item.overview || "No description available for this episode."}
              </p>
              {runtimeText && (
                <span className="episode-card__runtime">{runtimeText}</span>
              )}
            </div>
          </div>
        </div>
      </li>
    );
  });

  const castData = media?.credits?.cast || [];

  return (
    <div className="episodes-section">
      <div className="episodes-header">
        <div className="season-select-wrapper">
          <span className="season-select-title">Season {selectedSeason}</span>
          <span className="season-select-chevron">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="7 15 12 20 17 15"></polyline>
              <polyline points="7 9 12 4 17 9"></polyline>
            </svg>
          </span>
          {availableSeasons.length > 1 && (
            <select
              className="season-native-select"
              value={selectedSeason}
              onChange={handleSeasonChange}
              aria-label="Select Season"
            >
              {availableSeasons.map((s) => (
                <option key={s.id || s.season_number} value={s.season_number}>
                  Season {s.season_number}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div className="shelf-carousel episode-carousel-container">
        <button
          className="carousel-arrow carousel-arrow-left"
          onClick={() => scroll("left")}
          aria-label="Previous Episodes"
        >
          ‹
        </button>
        <ul ref={listRef} className="episodes-track">
          {rowData.length > 0 ? (
            rowData
          ) : (
            <li className="episodes-empty">
              {isLoading ? "Loading episodes..." : "No episodes found for this season."}
            </li>
          )}
        </ul>
        <button
          className="carousel-arrow carousel-arrow-right"
          onClick={() => scroll("right")}
          aria-label="Next Episodes"
        >
          ›
        </button>
      </div>

      {castData.length > 0 && (
        <div className="media-cast-section">
          <div className="shelf-header">
            <h2 className="shelf-title">Cast & Crew</h2>
          </div>
          <CastList data={castData} />
        </div>
      )}
    </div>
  );
};

export default EpisodeList;
