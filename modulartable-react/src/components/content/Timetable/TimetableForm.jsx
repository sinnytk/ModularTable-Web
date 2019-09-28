import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
const TimetableForm = props => {
  const handleDayChange = event => {
    props.handleDayChange(event.target.value);
  };
  return (
    <form autoComplete="off">
      <FormControl>
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
    </form>
  );
};
export default TimetableForm;
