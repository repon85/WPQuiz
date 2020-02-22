import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route } from "react-router-dom";

import App from "./App";
import Quiz from './Quiz';

const WPQuizApp = () => {
  return (
    <HashRouter>
      <Route exact path="/" component={App} />
      <Route exact path="/add-quiz" component={Quiz} />
      <Route exact path="/:id/:quiz" component={Quiz} />
    </HashRouter>
  );
};

if (document.getElementById("wpquiz-app")) {
  ReactDOM.render(<WPQuizApp />, document.getElementById("wpquiz-app"));
}
