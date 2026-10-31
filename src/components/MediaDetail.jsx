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

  return (
    <div className="media-page">
      <MediaHeader data={{ media: tvShow }} />
      <div className="media-main">
        <EpisodeList data={tvShow} />
      </div>
    </div>
  );
};

export default MediaDetail;
