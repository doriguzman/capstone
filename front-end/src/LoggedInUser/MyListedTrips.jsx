import React, { Component } from "react";
import dateFormat from "dateformat";
import { Redirect } from "react-router-dom";
import axios from "axios";

class MyListedTrips extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      username: this.props.username,
      //   trips: this.props.trips,
      activeUser: this.props.activeUser,
      isDeleted: false,
      trips: ""
    };
  }

  handleDeleteTrip = (e, id, username) => {
    e.preventDefault();
    const { isDeleted } = this.state;
    console.log(id, username);
    axios.delete(`/users/removeTrip/${username}/${id}`).then(response => {
      this.getUserTrips();
      //   window.location.reload();
    });
  };

  getUserTrips = () => {
    console.log("getting user trips");
    console.log("username", this.state.username);
    const { trips } = this.state;
    //getting the current Date;
    const dateNow = new Date();

    axios.get(`/users/allTrips/${this.state.username}`).then(res => {
      console.log("res.data", res);
      let UserInfo = res.data;
      this.setState({
        trips: res.data
      });
    });
  };
  componentWillMount() {
    this.getUserTrips();
  }

  render() {
    const { trips, activeUser, isDeleted } = this.state;

    if (trips) {
      return (
        <div className="trips-container">
          {trips.map(trip => (
            <div className="single-trip">
              <div className="trip-destination">{trip.destination}</div>
              <div className="trip-title">Departing</div>
              <div className="trip-body">{dateFormat(trip.start_date, "ddd, mmm, dS, yyyy")}</div>
              <div className="trip-title">Returning</div>
              <div className="trip-body">{dateFormat(trip.end_date, "ddd, mmm, dS, yyyy")}</div>
              <div className="trip-title">Planned Activities</div>
              <div className="trip-todos">{trip.todos}</div>
              {activeUser && trips ? (
                <div
                  className="delete-trip"
                  onClick={e =>this.handleDeleteTrip(e, trip.id, trip.username)}
                >
                  Delete Trip
                </div>
              ) : (
                ""
              )}
              </div>
          ))}
        </div>
      );
    }else{
        return(<div>
            </div> )
    }
  }
}

export default MyListedTrips;
