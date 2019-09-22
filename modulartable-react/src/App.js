import React, { Component } from "react";
import Header from "./components/layout/Header";
import Home from "./components/content/Home";
import TimetableCreate from "./components/content/TimetableCreate";
import TimetableQuery from "./components/content/TimetableQuery";

export class App extends Component {
  state = { activeTabIndex: 1 };
  navigate = navigatedTo => {
    this.setState({ activeTabIndex: navigatedTo });
  };
  render() {
    const tabIndex = this.state.activeTabIndex;
    return (
      <div>
        <Header navigateParent={this.navigate} />
        {tabIndex === 0 && <TimetableCreate />}
        {tabIndex === 1 && <Home />}
        {tabIndex === 2 && <TimetableQuery />}
      </div>
    );
  }
}
