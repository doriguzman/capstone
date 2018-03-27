import React, { Component } from "react";

const ListedTrips = ({ trips }) => {
  return (
    <div>
      {trips.map(trip => (
        <div>
          <h3> Destination: {trip.destination}</h3>
          <h4>
            Starting Date:{trip.start_date}
            <br />
            Ending Date:{trip.end_date}
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
