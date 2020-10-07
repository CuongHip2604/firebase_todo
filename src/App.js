import React from "react";

import "./App.scss";
import LitsTask from "./components/LitsTask";
import "./Api/firebase";
import NotFound from "./pages/NotFound/NotFound";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Login from "./pages/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <LitsTask />
        {/* <NotFound /> */}
        <Switch>
          <Redirect exact from="/" to="/"></Redirect>
          <Route path="/" component={App} />
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
