import React from "react";
import _ from "underscore";

const CastList = (props) => {
  let cast = props.data;
  cast = _.filter(cast, (r) => r.profile_path !== null);
  const profiles = cast.map((item, i) => {
    const imgpath = `http://image.tmdb.org/t/p/w235_and_h235_face/${item.profile_path}`;
    return (
      <li key={i} data-index-item={i}>
        <a>
          <div className="canvas-lockup">
            <div className="profile-lockup__image">
              <picture>
                <source type="image/jpeg" srcSet={imgpath}></source>
                <img
                  style={{ width: "140px", position: "relative" }}
                  className="media-artwork-v2__image"
                  src={imgpath}
                  sizes={`(min-width:300px) and (max-width:739px) 246px, (min-width:740px) and (max-width:999px) 166px, (min-width:1000px) and (max-width:1319px) 164px, 167px`}
                />
              </picture>
            </div>
            <div className="profile-lockup__details">
              <p className="typ-caption"> {item.name}</p>
              <p className="typ-caption clr-secondary-text">{item.character}</p>
            </div>
          </div>
        </a>
      </li>
    );
  });
  return <ul className="profile-list">{profiles}</ul>;
};

export default CastList;
