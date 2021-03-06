import React, { Component } from "react";
import Header from "./components/layout/Header";
import Home from "./components/content/Home";
import TimetableCreate from "./components/content/TimetableCreate";
import TimetableQuery from "./components/content/TimetableQuery";

export class App extends Component {
  state = {
    activeTabIndex: 1,
    slots: null,
    teachers: null,
    sections: null,
    courses: null
  };
  navigate = navigatedTo => {
    this.setState({ activeTabIndex: navigatedTo });
  };
  updateTimetableDataFromChild = data => {
    this.setState({
      slots: data.slots,
      teachers: data.teachers,
      sections: data.sections,
      courses: data.courses
    });
  };
  render() {
    const { activeTabIndex, slots, teachers, sections, courses } = this.state;
    return (
      <div>
        <Header navigateParent={this.navigate} />
        {activeTabIndex === 0 && (
          <TimetableCreate
            data={{ slots, teachers, sections, courses }}
            updateData={this.updateTimetableDataFromChild}
          />
        )}
        {activeTabIndex === 1 && <Home />}
        {activeTabIndex === 2 && <TimetableQuery />}
      </div>
    );
  }
}
