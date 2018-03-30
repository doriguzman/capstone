import React, { Component } from "react";
import dateFormat from "dateformat";

const ListedTrips = ({ trips }) => {
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
};

export default ListedTrips;
