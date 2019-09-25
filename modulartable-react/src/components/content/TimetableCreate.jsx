import React, { Component } from "react";
import axios from "axios";
import { TIMETABLE_ENDPOINT } from "../constants/endpoints";
import Slot from "./Timetable/Slot";
import Grid from "@material-ui/core/Grid";

export default class TimetableCreate extends Component {
  state = {
    timeslots: null,
    days: null,
    slots: null,
    selectedDay: 1
  };
  componentDidMount() {
    axios
      .get(TIMETABLE_ENDPOINT)
      .then(response => {
        const slots = response.data;
        this.setState({ slots });
      })
      .catch(error => {
        console.log(error.response);
      });
  }
  render() {
    const slots = this.state.slots;
    {
      console.log(slots);
    }
    const selectedDay = this.state.selectedDay;

    return (
      <div>
        <Grid container direction="row" justify="center">
          {slots &&
            Object.entries(slots[selectedDay]).map(keyValue =>
              keyValue[1].map(slot => (
                <Grid
                  key={`${slot.daynum}-${slot.timeslot.timeslotnum}-${slot.venuenum}`}
                  item
                >
                  <Slot attributes={slot} />
                </Grid>
              ))
            )}
        </Grid>
      </div>
    );
  }
}
