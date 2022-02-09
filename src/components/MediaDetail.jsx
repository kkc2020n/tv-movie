import React from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import { get } from "../utils/Request";
import { API_KEY, BASE_TV_URL } from "../utils/Constants";
import { updateMediaFullDetail } from "../actions/media_details_action";
import MediaHeader from "./MediaHeader";
import EpisodeList from "./EpisodeList";

const mapStateToProps = (state) => {
  return {
    mediaDetails: state.mediaDetails,
    mediaEpisodes: state.mediaEpisodes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateMediaFullDetail: (data) => dispatch(updateMediaFullDetail(data))
  };
};

const MediaDetail = (props) => {
  const { media } = props.mediaDetails;

  useEffect(() => {}, []);

  return (
    <div className="media-page">
      <div>
        <MediaHeader data={{ media: media }} />
        <div className="media-main">
          <div className="media__header">
            <span className="media__header__span">Season 1</span>
          </div>

          <EpisodeList data={media ? media : {}} />
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaDetail);
