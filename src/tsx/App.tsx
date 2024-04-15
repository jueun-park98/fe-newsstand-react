import React from "react";
import "../css/App.css";
import Header from "./Header";
import RollingContainer from "./RollingContainer";
import PressContainer from "./PressContainer";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <RollingContainer></RollingContainer>
      <PressContainer></PressContainer>
    </div>
  );
}

export default App;
