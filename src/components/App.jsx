import React from "react";
import { useSelector } from "react-redux";
import Home from "./Home";
import MediaDetail from "./MediaDetail";
import Header from "./Header";

const App = () => {
  const { isHome } = useSelector((state) => state.app);

  return (
    <div className="main-content">
      <Header />
      {isHome ? <Home /> : <MediaDetail />}
    </div>
  );
};

export default App;
