import React from "react";
import { updateisHome } from "../actions/app_actions";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => {
  return {
    updateisHome: (data) => dispatch(updateisHome(data))
  };
};

const Header = (props) => {
  const goToHome = () => {
    props.updateisHome(true);
  };
  return (
    <div className="header">
      <div
        className="app-name"
        onClick={goToHome}
        style={{ cursor: "pointer" }}
      >
        Movies & TV
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Header);
