import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Image from "./components/Image/Image";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/image" component={Image} />
      </Switch>
    </BrowserRouter>
  );
}
