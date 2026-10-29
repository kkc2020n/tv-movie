import React from "react";
import { useSelector } from "react-redux";
import MediaHeader from "./MediaHeader";
import EpisodeList from "./EpisodeList";

const MediaDetail = () => {
  const { tvShow, isLoading } = useSelector((state) => state.mediaDetails);

  if (isLoading && !tvShow) {
    return (
      <div className="media-page" style={{ padding: "2rem", color: "#fff" }}>
        Loading...
      </div>
    );
  }

  if (!tvShow || Object.keys(tvShow).length === 0) {
    return null;
  }

  const allSeasons = tvShow.seasons || [];
  const specials = allSeasons.find((i) => i.season_number === 0);
  const seasons = allSeasons.filter((i) => i.season_number !== 0);
  const selectedSeason = seasons.length > 0 ? seasons[0] : specials || { season_number: 1 };

  return (
    <div className="media-page">
      <div>
        <MediaHeader data={{ media: tvShow }} />
        <div className="media-main">
          <div className="shelf-grid">
            <div className="media__header">
              <div className="ember-basic-dropdown">
                <div className="ember-basic-dropdown-trigger ember-power-select-trigger">
                  <span className="ember-power-select-selected-item">
                    Season {selectedSeason.season_number}
                  </span>
                  <span className="ember-power-select-status-icon"></span>
                </div>
              </div>
            </div>

            <EpisodeList data={tvShow} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaDetail;
