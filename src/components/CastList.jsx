import React from "react";
import _ from "underscore";

const CastList = (props) => {
  let cast = props.data;
  cast = _.filter(cast, (r) => r.profile_path !== null);
  const gridcoltmpl = cast.length >= 10 ? `repeat(${cast.length}, 1fr)` : `repeat(10, 1fr)`;
  const profiles = cast.map((item, i) => {
    const imgpath = `http://image.tmdb.org/t/p/w235_and_h235_face/${item.profile_path}`;
    const tmp = `https://tv.apple.com/assets/artwork/1x1-42817eea7ade52607a760cbee00d1495.gif`;
    return (
      <li key={i} data-index-item={i} style={{ scrollSnapAlign: "start" }}>
        <a>
          <div className="canvas-lockup">
            <div className="profile-lockup__image">
              <picture>
                <source type="image/jpeg" srcSet={imgpath}></source>
                <img
                  loading="lazy"
                  className="media-artwork-v2__image img-profile"
                  src={tmp}
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
  return (
    <div className="shelf-grid__body">
      <ul className="profile-list" style={{ gridTemplateColumns: gridcoltmpl }}>
        {profiles}
      </ul>
    </div>
  );
};

export default CastList;
