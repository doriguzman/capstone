import React, { Component } from "react";
import dateFormat from "dateformat";
import { Redirect } from "react-router-dom";
import axios from "axios";

class GeneralListedTrips extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      trips: this.props.trips,
    };
  }



  render() {
    const { trips, activeUser, } = this.state;
    {
      this.props.trips;
    }

    return (
      <div>
        {trips.map(trip => (
          <div>
            <h3> Destination: {trip.destination}</h3>
            <h4>
              Starting Date: {dateFormat(trip.start_date, "ddd, mmm, dS, yyyy")}
              <br />
              Ending Date:{dateFormat(trip.end_date, "ddd, mmm, dS, yyyy")}
              <br />
              Planned Activities: {trip.todos}
              <br />
            </h4>
          </div>
        ))}
      </div>
    );
  }
}

export default GeneralListedTrips;