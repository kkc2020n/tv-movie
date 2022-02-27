import React, { useEffect } from "react";
import { connect } from "react-redux";
import { updateMediaSeasonsDetail } from "../actions/media_details_action";
import { get } from "../utils/Request";
import { API_KEY, BASE_TV_URL } from "../utils/Constants";
import CastList from "./CastList";

const mapStateToProps = (state) => {
  return {
    mediaDetails: state.mediaDetails,
    mediaEpisodes: state.mediaEpisodes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateMediaSeasonsDetail: (data) => dispatch(updateMediaSeasonsDetail(data))
  };
};

const EpisodeList = (props) => {
  const media = props.data;

  const fetchEpisodeData = (media) => {
    const url = `${BASE_TV_URL}/${media.id}/season/1?api_key=${API_KEY}&language=en-US`;
    const season = Promise.all([get(url)]);
    season.then(([resp]) => {
      props.updateMediaSeasonsDetail(resp.data.episodes);
    });
  };

  useEffect(() => {
    if (media.id) {
      fetchEpisodeData(media);
    }
  }, [props.mediaDetails.media]);

  console.log("prrr", props);
  const epData = props.mediaEpisodes.epdata ? props.mediaEpisodes.epdata : [];
  const rowData = epData.map((item, i) => {
    const imgpath = `http://image.tmdb.org/t/p/w780/${item.still_path}`;
    //const imgpath =
    //"https://cdn.blacked.com/scene/videoimages/100040/mainLandscape/1538995812636/blacked-dani-daniels-blacked_627x353.jpeg?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9jZG4uYmxhY2tlZC5jb20vc2NlbmUvdmlkZW9pbWFnZXMvMTAwMDQwLyovKi8qXyp4Ki4qIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjQ0NDg0MTU5fX19XX0_&Key-Pair-Id=K18SM53O8A1CFO&Signature=dJy8iCJi6PbYyqwIpfe7EZ3VK1Neftgm9TC036moxYQhj0mDtz1Vsn5o5~7IXKeJY6on3Coooho0pb2KZO5dayQZuqK7r7ZYN0IWkMftGKYCNDa6qOkUsBziWEyBFID8CieSdxEN4I3YOAqUa-sLtqeODsEPLHw-MF1O2lJK6E6GmnV8wfZPRo8ZEVFcdVQpFLAuYyDgBLNgJJk2O7Nyic9tlajzS3fc7ioFmgwHrI59pgF2x2JQ-cRWiXTSphhm~iI6zVXTfSPOKIAA~VSc7W7kONg7BI0ooRNVsQBF-zphJM8llEIvUt5pB80JEAKuIdqqNpcv560GMGs1zk9D4Q__";
    return (
      <li data-index-item={i} key={i}>
        <a className="movie-item">
          <div className="canvas-left">
            <div className="canvas-artwork">
              <div className="artwork">
                <picture>
                  <source type="image/jpeg" srcSet={imgpath}></source>
                  <img
                    loading="lazy"
                    className="media-artwork-v2__image"
                    src={imgpath}
                    sizes={`(min-width:300px) and (max-width:739px) 739px, (min-width:740px) and (max-width:999px) 499px, (min-width:1000px) and (max-width:1319px) 439px, 419px`}
                  />
                </picture>
              </div>
            </div>
          </div>
        </a>
        <div>
          <div className="ep-title">{item.name}</div>
          <div className="--overview ">{item.overview}</div>
        </div>
      </li>
    );
  });
  return (
    <div className="grid-container media">
      <div className="media_div">
        <ul className="trending-list big">{rowData}</ul>
      </div>
      <div className="divider"></div>
      <div className="media_div">
        <div className="shelf-grid__header">
          <h2>Cast & Crew</h2>
        </div>
        <CastList data={media?.credits?.cast ? media.credits.cast : []} />
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeList);
