import React, { Component } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import SVGComponent from "./components/ZoomableSVG/SVGComponent";
import DeviceDetails from "./components/ZoomableSVG/DeviceDetails"


class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={SVGComponent} exact={true} />
            <Route path="/deviceDetails" component={DeviceDetails} exact={true} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;