import React from "react";

const Banner = (props) => {
  const imgpath = `http://image.tmdb.org/t/p/original/5KRZVpkAavioxKezPjqznkF2q7u.jpg`;
  return (
    <div className="shelf-grid shelf-grid--onhover" style={{ width: "100%" }}>
      <div className="shelf-grid__body">
        <ul className="trending-list epic">
          <li>
            <a className="movie-item"></a>
            <div className="epic-showcase-shelf__container">
              <picture>
                <source type="image/jpeg" srcSet={imgpath}></source>
                <img className="epic-showcase__artwork" src={imgpath} />
              </picture>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Banner;
