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
  handleDayChange = selectedDay => {
    this.setState({ selectedDay });
  };
  render() {
    const slots = this.state.slots;
    const selectedDay = this.state.selectedDay;
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
                        <Slot attributes={slot} />
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
            selectedDay={this.state.selectedDay}
            handleDayChange={this.handleDayChange}
          />
        </div>
      </Fragment>
    );
  }
}
