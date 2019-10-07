import React, { useState, Fragment } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
  Menu,
  Button
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  downloadBtn: {
    margin: "10px"
  }
}));

const TimetableForm = props => {
  const classes = useStyles();

  const teachers = props.teachers;
  const sections = props.sections;
  const courses = props.courses;
  const [selectedTeachers, setSelectedTeachers] = useState(
    props.selectedTeachers
  );
  const [selectedCourses, setSelectedCourses] = useState(props.selectedCourses);
  const [selectedSections, setSelectedSections] = useState(
    props.selectedSections
  );

  const handleDayChange = event => {
    props.handleDayChange(event.target.value);
  };
  const handleTeacherChange = event => {
    let values = event.target.value;

    if (values.length > 1) {
      values[0] === 0 && (values = values.slice(1));
      values[values.length - 1] === 0 && (values = [0]);
    }
    setSelectedTeachers(values);
  };

  const handleCourseChange = event => {
    let values = event.target.value;

    if (values.length > 1) {
      values[0] === 0 && (values = values.slice(1));
      values[values.length - 1] === 0 && (values = [0]);
    }
    setSelectedCourses(values);
  };

  const handleSectionChange = event => {
    let values = event.target.value;

    if (values.length > 1) {
      values[0] === 0 && (values = values.slice(1));
      values[values.length - 1] === 0 && (values = [0]);
    }
    setSelectedSections(values);
  };
  const submitChanges = () => {
    props.handleMultipleChange({
      selectedTeachers,
      selectedCourses,
      selectedSections
    });
  };
  return (
    <Fragment>
      <form autoComplete="off" className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel>Day</InputLabel>
          <Select
            value={props.selectedDay}
            onChange={handleDayChange}
            inputProps={{
              name: "day",
              id: "timetable-day"
            }}
          >
            <MenuItem value={1}>Monday</MenuItem>
            <MenuItem value={2}>Tuesday</MenuItem>
            <MenuItem value={3}>Wednesday</MenuItem>
            <MenuItem value={4}>Thursday</MenuItem>
            <MenuItem value={5}>Friday</MenuItem>
            <MenuItem value={6}>Saturday</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Teacher(s)</InputLabel>
          <Select
            multiple
            value={selectedTeachers}
            onChange={handleTeacherChange}
            onClose={submitChanges}
            inputProps={{
              name: "teacher(s)",
              id: "timetable-teacher"
            }}
          >
            <MenuItem value={0}>ALL</MenuItem>
            {teachers &&
              teachers.map(teacher => (
                <MenuItem value={teacher.teachernum} key={teacher.teachernum}>
                  {teacher.teachername}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Courses(s)</InputLabel>
          <Select
            multiple
            value={selectedCourses}
            onChange={handleCourseChange}
            inputProps={{
              name: "course(s)",
              id: "timetable-course"
            }}
            onClose={submitChanges}
          >
            <MenuItem value={0}>ALL</MenuItem>
            {courses &&
              courses.map(course => (
                <MenuItem value={course.coursenum} key={course.coursenum}>
                  {course.coursecode}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Section(s)</InputLabel>
          <Select
            multiple
            value={selectedSections}
            onChange={handleSectionChange}
            inputProps={{
              name: "section(s)",
              id: "timetable-section"
            }}
            onClose={submitChanges}
          >
            <MenuItem value={0}>ALL</MenuItem>
            {sections &&
              sections.map(section => (
                <MenuItem value={section.sectionnum} key={section.sectionnum}>
                  {`${section.semester}${section.section}`}
                </MenuItem>
              ))}
          </Select>
          <Button
            className={classes.downloadBtn}
            variant="contained"
            color="primary"
          >
            Download Excel
          </Button>
        </FormControl>
      </form>
    </Fragment>
  );
};
export default TimetableForm;
