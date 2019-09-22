import React, { Component } from "react";
import axios from "axios";
import { SLOTS_ENDPOINT } from "../constants/endpoints";
export default class TimetableCreate extends Component {
  state = {
    timeslots: null,
    days: null,
    slots: []
  };
  componentDidMount() {
    console.log(this.state.firstTime);
    axios
      .get(SLOTS_ENDPOINT)
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
    return (
      <ul>
        {slots.map(slot => (
          <li
            key={`${slot.daynum}-${slot.venue.venuenum}-${slot.timeslot.timeslotnum}`}
          >
            <div>
              <p>Venue: {slot.venue.venuename}</p>
              <p>
                Timeslot:
                {`${slot.timeslot.starttime} - ${slot.timeslot.endtime}`}
              </p>
              {slot.teacher && <p>Teacher: {slot.teacher.teachername}</p>}
              {slot.section && (
                <p>
                  Section:{`${slot.section.semester}${slot.section.section}`}
                </p>
              )}
              {slot.course && <p>Course: {slot.course.coursecode}</p>}
            </div>
          </li>
        ))}
      </ul>
    );
  }
}
