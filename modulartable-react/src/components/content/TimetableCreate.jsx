import React, { Component, Fragment } from "react";
import axios from "axios";
import { TIMETABLE_ENDPOINT } from "../constants/endpoints";
import Slot from "./Timetable/Slot";
import TimetableForm from "./Timetable/TimetableForm";
import "./TimetableCreate.css";

export default class TimetableCreate extends Component {
  state = {
    timeslots: null,
    slots: this.props.slots,
    teachers: this.props.teachers,
    sections: this.props.sections,
    courses: this.props.courses,
    selectedTeachers: this.props.selectedTeachers
      ? this.props.selectedTeachers
      : [0],
    selectedSections: this.props.selectedSections
      ? this.props.selectedSections
      : [0],
    selectedCourses: this.props.selectedCourses
      ? this.props.selectedCourses
      : [0],
    selectedDay: 1
  };
  componentDidMount() {
    if (!this.state.slots) {
      axios
        .get(TIMETABLE_ENDPOINT)
        .then(response => {
          const slots = response.data["slots"];
          const teachers = response.data["teachers"];
          const sections = response.data["sections"];
          const courses = response.data["courses"];
          this.setState({
            slots,
            teachers,
            sections,
            courses
          });
          this.props.updateSlots({ slots });
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  }
  handleDayChange = selectedDay => {
    this.setState({ selectedDay });
  };
  handleMultipleChange = selectedParams => {
    const {
      selectedTeachers,
      selectedCourses,
      selectedSections
    } = selectedParams;
    this.setState({ selectedTeachers, selectedCourses, selectedSections });
  };
  isSlotValid = slot => {
    if (!slot.teacher) {
      return true;
    }
    const selectedTeachers = this.state.selectedTeachers;
    const selectedSections = this.state.selectedSections;
    const selectedCourses = this.state.selectedCourses;
    return (
      (selectedTeachers[0] === 0 ||
        selectedTeachers.includes(slot.teacher.teachernum)) &&
      (selectedCourses[0] === 0 ||
        selectedCourses.includes(slot.course.coursenum)) &&
      (selectedSections[0] === 0 ||
        selectedSections.includes(slot.section.sectionnum))
    );
  };
  render() {
    const slots = this.state.slots;
    const selectedDay = this.state.selectedDay;
    const teachers = this.state.teachers;
    const sections = this.state.sections;
    const courses = this.state.courses;
    const selectedTeachers = this.state.selectedTeachers;
    const selectedSections = this.state.selectedSections;
    const selectedCourses = this.state.selectedCourses;
    return (
      <Fragment>
        <div className="timetable">
          {slots && (
            <table>
              <tbody>
                <tr>
                  <th></th>
                  {slots[selectedDay][Object.keys(slots[selectedDay])[0]].map(
                    slot => (
                      <th key={slot.timeslot.timeslotnum}>
                        <div className="slotTime">
                          {`${slot.timeslot.starttime}-${slot.timeslot.endtime}`}
                        </div>
                      </th>
                    )
                  )}
                </tr>
                {Object.entries(slots[selectedDay]).map(keyValue => (
                  <tr key={keyValue[0]}>
                    <th className="slotVenue">{keyValue[0]}</th>
                    {keyValue[1].map(slot => (
                      <td
                        key={`${slot.daynum}-${slot.timeslot.timeslotnum}-${slot.venuenum}`}
                      >
                        <Slot attributes={this.isSlotValid(slot) ? slot : {}} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className={slots ? "TimetableForm" : "hidden"}>
          <TimetableForm
            teachers={teachers}
            sections={sections}
            courses={courses}
            selectedDay={selectedDay}
            selectedTeachers={selectedTeachers}
            selectedSections={selectedSections}
            selectedCourses={selectedCourses}
            handleDayChange={this.handleDayChange}
            handleMultipleChange={this.handleMultipleChange}
          />
        </div>
      </Fragment>
    );
  }
}
