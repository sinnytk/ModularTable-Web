import React, { Component } from "react";
import Header from "./components/layout/Header";
import Home from "./components/content/Home";
import TimetableCreate from "./components/content/TimetableCreate";
import TimetableQuery from "./components/content/TimetableQuery";

export class App extends Component {
  state = { activeTabIndex: 1, slots: null };
  navigate = navigatedTo => {
    this.setState({ activeTabIndex: navigatedTo });
  };
  updateSlotsFromChild = slots => {
    this.setState({ slots: slots.slots });
  };
  render() {
    const tabIndex = this.state.activeTabIndex;
    return (
      <div>
        <Header navigateParent={this.navigate} />
        {tabIndex === 0 && (
          <TimetableCreate
            slots={this.state.slots}
            updateSlots={this.updateSlotsFromChild}
          />
        )}
        {tabIndex === 1 && <Home />}
        {tabIndex === 2 && <TimetableQuery />}
      </div>
    );
  }
}
