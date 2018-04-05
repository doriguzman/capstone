import React, { Component } from "react";
import dateFormat from "dateformat";
import { Redirect } from "react-router-dom";
import axios from "axios";

import "../Stylesheets/AddTrips.css";

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
    { this.props.trips };

    return (
      <div>
        {trips.map(trip => (
          <div className="single-trip">
            <div className="trip-destination">{trip.destination}</div>
            <div className="trip-title">Departing</div>
            <div className="trip-body">{dateFormat(trip.start_date, "ddd, mmm, dS, yyyy")}</div>
            <div className="trip-title">Returning</div>
            <div className="trip-body">{dateFormat(trip.end_date, "ddd, mmm, dS, yyyy")}</div>
            <div className="trip-title">Planned Activities</div>
            <div className="trip-todos">{trip.todos}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default GeneralListedTrips;