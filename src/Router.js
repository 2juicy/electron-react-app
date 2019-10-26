import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Video from "./components/Video/Video";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/video" component={Video} />
      </Switch>
    </BrowserRouter>
  );
}
