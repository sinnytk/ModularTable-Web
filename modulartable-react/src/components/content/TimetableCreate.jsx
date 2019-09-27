import React, { Component } from "react";
import axios from "axios";
import { TIMETABLE_ENDPOINT } from "../constants/endpoints";
import Slot from "./Timetable/Slot";
import { Paper } from "@material-ui/core";
import "./TimetableCreate.css";

export default class TimetableCreate extends Component {
  state = {
    timeslots: null,
    slots: this.props.slots,
    selectedDay: 1
  };
  componentDidMount() {
    if (!this.state.slots) {
      axios
        .get(TIMETABLE_ENDPOINT)
        .then(response => {
          const slots = response.data;
          this.setState({ slots });
          this.props.updateSlots({ slots });
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  }
  render() {
    const slots = this.state.slots;
    const selectedDay = this.state.selectedDay;
    return (
      <div style={{ width: "100%", height: "100%" }}>
        {slots && (
          <table>
            <tbody>
              <tr>
                <th></th>
                {slots[selectedDay][Object.keys(slots[selectedDay])[0]].map(
                  slot => (
                    <th className="slotTime" key={slot.timeslot.timeslotnum}>
                      {`${slot.timeslot.starttime}-${slot.timeslot.endtime}`}
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
                      item
                    >
                      <Slot attributes={slot} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}
