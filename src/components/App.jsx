import React from "react";
import Home from "./Home";
import MediaDetail from "./MediaDetail";
import Header from "./Header";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return { appState: state.appState };
};

const App = (props) => {
  return (
    <div className="main-content">
      <Header />
      {props.appState.isHome ? <Home /> : <MediaDetail />}
    </div>
  );
};

export default connect(mapStateToProps)(App);
