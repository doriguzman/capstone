import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";

class LogOutUser extends Component {
  constructor() {
    super();
    this.state = {
      loggedOut: false
    };
  }

  //on Click on the link we are automatically logging out
  componentDidMount() {
    axios
      .get("/users/logout")
      .then(res => {
        console.log("logout response", res);
        // this.props.logOutUser()
        this.setState({
          loggedOut: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { loggedOut } = this.state;
    return loggedOut ? <div> you are logged out </div> : "";
  }
}

export default LogOutUser;
