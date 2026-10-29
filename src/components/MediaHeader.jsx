import React from "react";

const openLink = (link) => {
  if (link) {
    window.open(link, "_blank");
  }
  return false;
};

const MediaHeader = (props) => {
  const media = props.data?.media;
  const isEmpty = !media || Object.keys(media).length === 0;

  if (!isEmpty) {
    const network = media?.networks?.[0] || {};
    const imgpath = `http://image.tmdb.org/t/p/original/${media.backdrop_path}`;
    const networkLogo = network.logo_path
      ? `http://image.tmdb.org/t/p/w92/${network.logo_path}`
      : "";

    return (
      <div className="product-header__wrapper">
        {networkLogo && (
          <div className="product-header__image-logo clr-primary-text-on-dark">
            <picture>
              <source srcSet={networkLogo} />
              <img
                alt={network.name || ""}
                src={networkLogo}
                className="product-header__image-logo__image"
              />
            </picture>
          </div>
        )}
        <picture>
          <source type="image/jpeg" srcSet={imgpath}></source>
          <img
            style={{ width: "100%", height: "945px" }}
            className="media-artwork-v2__image"
            src={imgpath}
            decoding="async"
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
                  {network?.name || ""}
                </span>
              </div>
              {media.homepage && (
                <button
                  className="product-page__cta-button--play product-page__cta-button typ-subhead-emph clr-primary-text-on-dark product-page__cta-button--mini product-page__cta-button--primary"
                  onClick={() => openLink(media.homepage)}
                >
                  <div className="text-truncate">
                    <span className="product-page__cta-button__glyph product-page__cta-button__glyph--play"></span>
                    Link to Content Provider
                  </div>
                </button>
              )}
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
    return null;
  }
};

export default MediaHeader;
