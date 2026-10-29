import React from "react";
import { useDispatch } from "react-redux";
import { setHome } from "../slices/appSlice";

const Header = () => {
  const dispatch = useDispatch();

  const goToHome = () => {
    dispatch(setHome(true));
  };

  return (
    <header className="app-header">
      <div className="header-inner">
        <div
          className="brand"
          onClick={goToHome}
          style={{ cursor: "pointer" }}
        >
          <span className="brand-tv-icon">tv</span>
          <span className="brand-title">Movies &amp; TV</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
