import React, { Component } from "react";
import LoginPage from "./pages/login";
import Dashboard from "./pages/dashboard";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./app.css";

export default class app extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {" "}
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/">
            <LoginPage />
          </Route>
        </Switch>
      </Router>
    );
  }
}
