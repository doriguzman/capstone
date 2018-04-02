import React, { Component } from "react";
import dateFormat from "dateformat";
import { Redirect } from "react-router-dom";
import axios from "axios";

class ListedTrips extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      trips: this.props.trips,
      activeUser: this.props.activeUser,
      isDeleted: false
    };
  }

  handleDeleteTrip = (e, id, username) => {
    // e.preventDefault();
    const { isDeleted } = this.state;
    console.log(id, username);
    axios.delete(`/users/removeTrip/${username}/${id}`).then(response => {
      window.location.reload();
    });
  };

  render() {
    const { trips, activeUser, isDeleted } = this.state;
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
              {activeUser && trips ? (
                <button
                  onClick={e =>
                    this.handleDeleteTrip(e, trip.id, trip.username)
                  }
                >
                  Delete Trip
                </button>
              ) : (
                ""
              )}
            </h4>
          </div>
        ))}
      </div>
    );
  }
}

export default ListedTrips;
