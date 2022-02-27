import React from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import { updateMediaFullDetail } from "../actions/media_details_action";
import MediaHeader from "./MediaHeader";
import EpisodeList from "./EpisodeList";
import _ from "underscore";

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
  const isEmpty = _.isEmpty(media);

  useEffect(() => {}, []);
  if (!isEmpty) {
    const allseasons = media.seasons;
    const [specials] = _.filter(allseasons, (i) => i.season_number === 0);
    const seasons = _.filter(allseasons, (i) => i.season_number !== 0);
    const [season] = seasons;

    return (
      <div className="media-page">
        <div>
          <MediaHeader data={{ media: media }} />
          <div className="media-main">
            <div className="shelf-grid">
              <div className="media__header">
                <div className="ember-basic-dropdown">
                  <div className="ember-basic-dropdown-trigger ember-power-select-trigger">
                    <span className="ember-power-select-selected-item">
                      Season {season.season_number}
                    </span>
                    <span className="ember-power-select-status-icon"></span>
                  </div>
                </div>
              </div>

              <EpisodeList data={media ? media : {}} />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaDetail);
