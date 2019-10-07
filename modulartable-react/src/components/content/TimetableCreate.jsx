import React, { Component, Fragment } from "react";
import axios from "axios";
import {
  TIMETABLE_ENDPOINT,
  TIMETABLE_DOWNLOAD_ENDPOINT
} from "../constants/endpoints";
import Slot from "./Timetable/Slot";
import TimetableForm from "./Timetable/TimetableForm";
import "./TimetableCreate.css";
import {
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Container,
  Hidden
} from "@material-ui/core";

export default class TimetableCreate extends Component {
  state = {
    slots: this.props.data.slots,
    teachers: this.props.data.teachers,
    sections: this.props.data.sections,
    courses: this.props.data.courses,
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
          this.props.updateData({ slots, teachers, sections, courses });
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
  downloadXLSX = () => {
    if (this.state.slots) {
      const selectedTeachers = this.state.selectedTeachers.toString();
      const selectedSections = this.state.selectedSections.toString();
      const selectedCourses = this.state.selectedCourses.toString();
      const teacher_param =
        selectedTeachers !== "0" ? `teacherNum=${selectedTeachers}` : "";
      const section_param =
        selectedSections !== "0" ? `&sectionNum=${selectedSections}` : "";
      const course_param =
        selectedCourses !== "0" ? `&courseNum=${selectedCourses}` : "";
      axios
        .get(
          `${TIMETABLE_DOWNLOAD_ENDPOINT}?${teacher_param}${section_param}${course_param}`,
          { responseType: "blob" }
        )
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "ModularTable.xlsx");
          document.body.appendChild(link);
          link.click();
        })
        .catch(error => {
          console.log(error.response);
        });
    }
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
      <Container>
        <Hidden lgDown>
          <div className="timetable" id={`timetable-${selectedDay}`}>
            {slots && (
              <Table padding="none">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    {slots[selectedDay][Object.keys(slots[selectedDay])[0]].map(
                      slot => (
                        <TableCell
                          key={slot.timeslot.timeslotnum}
                          align="center"
                          variant="head"
                        >
                          <div className="slotTime">
                            {`${slot.timeslot.starttime}-${slot.timeslot.endtime}`}
                          </div>
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(slots[selectedDay]).map(keyValue => (
                    <TableRow key={keyValue[0]}>
                      <TableCell className="slotVenue" variant="head">
                        {keyValue[0]}
                      </TableCell>
                      {keyValue[1].map(slot => (
                        <TableCell
                          key={`${slot.daynum}-${slot.timeslot.timeslotnum}-${slot.venuenum}`}
                        >
                          <Slot
                            attributes={this.isSlotValid(slot) ? slot : {}}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </Hidden>
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
            downloadXLSX={this.downloadXLSX}
          />
        </div>
      </Container>
    );
  }
}
