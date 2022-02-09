import React from "react";
import _ from "underscore";

const openLink = (link) => {
  window.open(link, "_blank");
  return false;
};

const MediaHeader = (props) => {
  const { media } = props.data;
  const isEmpty = _.isEmpty(media);

  if (!isEmpty) {
    const [network] = media?.networks ? media?.networks : [];
    const imgpath = `http://image.tmdb.org/t/p/original/${media.backdrop_path}`;
    const networkLogo = `http://image.tmdb.org/t/p/w92/${network.logo_path}`;
    return (
      <div className="product-header__wrapper">
        <div className="product-header__image-logo clr-primary-text-on-dark">
          <picture>
            <source srcSet={networkLogo} />
            <img
              alt={network.name ? network.name : ""}
              src={networkLogo}
              className="product-header__image-logo__image"
            />
          </picture>
        </div>
        <picture>
          <source type="image/jpeg" srcSet={imgpath}></source>
          <img
            style={{ width: "100%", height: "945" }}
            className="media-artwork-v2__image"
            src={imgpath}
            sizes={`(min-width:300px) and (max-width:739px) 739px, (min-width:740px) and (max-width:999px) 499px, (min-width:1000px) and (max-width:1319px) 439px, 419px`}
          />
        </picture>
        <div className="product-header__blur"></div>
        <div className="product-header__image-logo__blur"></div>
        <div className="product-header__container">
          <div className="product-header__content__container clr-primary-text-on-dark">
            <div className="product-header__content__buttons">
              <div className="product-header__cta__prefix product-header__cta__prefix--channel-name typ-caption">
                <span className="clr-secondary-text-on-dark">
                  {network?.name ? network?.name : ""}
                </span>
              </div>
              <button
                className="product-page__cta-button--play product-page__cta-button typ-subhead-emph clr-primary-text-on-dark product-page__cta-button--mini product-page__cta-button--primary"
                onClick={(e) => {
                  openLink(media.homepage);
                }}
              >
                <div className="text-truncate">
                  <span className="product-page__cta-button__glyph product-page__cta-button__glyph--play"></span>
                  Link to Content Provider
                </div>
              </button>
            </div>
            <div className="product-header__content__details">
              <div className="line-clamp-wrapper">
                <div className="line-clamp product-header__content__details__synopsis typ-subhead">
                  {media.overview}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default MediaHeader;
