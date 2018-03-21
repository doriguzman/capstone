import React, { Component } from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
// import './profile.css';
import axios from "axios";
// import Bffs from "./Bffs";

class AddTrips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      user_id: this.props.user.id,
      username: this.props.user.username,
    };
  }

  render() {
    return <div>this is where you add trips</div>;
  }
}
export default AddTrips;
