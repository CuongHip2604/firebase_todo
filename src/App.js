import React from "react";

import "./App.scss";
import LitsTask from "./components/LitsTask";
import "./Api/firebase";

function App() {
  return (
    <div className="App">
      <LitsTask />
    </div>
  );
}

export default App;
