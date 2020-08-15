import React from "react";
import axios from "axios";
import Signup from "./components/SignUp/SignUp.jsx";
import Login from "./components/LogIn/Login.jsx";
import Demo from "./components/Demo/Demo.jsx";
import Main from "./Main.jsx";


import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/main">
            <Main />
          </Route>
          <Route path="/">
            <Demo />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}