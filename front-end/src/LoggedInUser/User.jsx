import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import axios from "axios";
import UserProfile from "./UserProfile";
// import AddTrips from "./AddTrips";
// import BffFeed from './LoggedInUser/BffFeed'

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      user_id: this.props.user.id,
      username: this.props.user.username,
      active: this.props.active,
      userImageURL: "",
      firstName: "",
      location: "",
      age: "",
      bio: "",
      ethnicity: "",
      religion: "",
      earlyBird: "",
      nightOwl: "",
      clubbing: "",
      spontaneous: "",
      sightseeing: "",
      foodie: "",
      relax: "",
      nature: "",
      extroverted: "",
      smokes: "",
      drinks: ""
    };
  }

  fixUser = () => {
    const { user, username, user_id } = this.state;
    if (!this.state.username) {
      this.setState({
        username: this.state.user
      });
      if (!this.state.user_id) {
        axios.get("/users").then(response => {
          if (response.data.data.find(n => n.username === this.state.user)) {
            axios.get("/users/getUser").then(response => {
              this.setState({
                user_id: response.data.user.id
              });
            });
          }
        });
      }
    }
  };

  componentWillMount() {
    this.fixUser();
  }

  renderMyProfileInfo = () => {
    const { user, username, user_id, active } = this.state;
    return (
      <UserProfile
        user={user}
        username={username}
        userid={user_id}
        active={active}
      />
    );
  };

  render() {
    const { user, username, user_id } = this.state;

    return (
      <div>
        <Switch>
          <Route
            exact
            path={`/users/me/${username}`}
            render={this.renderMyProfileInfo}
          />
        </Switch>
      </div>
    );
  }
}

export default User;
