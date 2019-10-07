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
    const tabIndex = this.state.activeTabIndex;
    const slots = this.state.slots;
    const teachers = this.state.teachers;
    const sections = this.state.sections;
    const courses = this.state.courses;
    return (
      <div>
        <Header navigateParent={this.navigate} />
        {tabIndex === 0 && (
          <TimetableCreate
            data={{ slots, teachers, sections, courses }}
            updateData={this.updateTimetableDataFromChild}
          />
        )}
        {tabIndex === 1 && <Home />}
        {tabIndex === 2 && <TimetableQuery />}
      </div>
    );
  }
}
