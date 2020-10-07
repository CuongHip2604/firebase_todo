import React, { useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./Api/firebase";
import "./App.scss";
import LitsTask from "./components/LitsTask";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import { auth } from './Api/firebase'


function App() {

  //handle firebase auth change
  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        //user logout
        return;
      }

      console.log('login user', user.displayName);

      const token = await user.getIdToken()
      console.log('token', token);
    })
    return () => unregisterAuthObserver();
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Redirect exact from="/" to="/todos" />
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/todos">
            <LitsTask />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
