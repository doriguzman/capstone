import React, { Component } from "react";
import logo from "./logo.svg";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import axios from 'axios'
import "./App.css";
import NewUser from "./Users/NewUser";
import NewUserSurvey from "./Users/NewUserSurvey";
import LoginUser from './Users/LoginUser'
import LogOutUser from './Users/LogOutUser'


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      active: false,
    };
  }

  setUser = user => {
    this.setState({ user: user });
  };

  logOutUser = () => {
    this.setState({ user: null });
  };

  isActive = () => {
    this.setState({
      active: !this.state.active
    })
  }

  // renderLogin = () => {
  //   return <LoginUser setUser={this.setUser} />
  // }

  // renderLogOut = () => {
  //   return <LogOut logOutUser={this.logOutUser} />
  // }

  renderNewUser = () => {
    const { user, active} = this.state
    if(active === false) {
      return <NewUser setUser={this.setUser} active={this.isActive} />;
    } else {
        return <Redirect to="/users/signup/survey" />
    }
  };

  renderSurvey = () => {
    // const { user, active} = this.state;
      return <NewUserSurvey setUser={this.setUser} />;
  };

  componentDidMount() {
    const { user, active } = this.state;
    axios
      .get("/users/getUser")
      .then(res => {
        console.log("THIS IS A RESPONSE test" , res)
        this.setState({
          user: res.data.user,
          active: true
        });
      })
      .catch(err => {
        console.log(`errrr`, err);
      });
  } 

  // Home is the feed screen
  // renderHome = () => {
  //   const { user } = this.state
  //   if (user) {
  //     return <Home user={user} />
  //   } else {
  //     return this.renderLogin()
  //   }
  // }

  render() {

    //nav bar holds
    return (
      <div className="App">
        {/* NAV BAR GOES HERE ????*/}

        <div>
          <Route exact path="/" render={this.renderNewUser} />
          <Route exact path="/users/signup/survey" render={this.renderSurvey} />
          <Route path="/users/login" render={this.renderLogin} />
          <Route path="/users/new" render={this.renderNew} />
          <Route path="/users/logout" render={this.renderLogout} />
          <Route path="/users/home" render={this.renderHome} />
        </div>
      </div>
    );
  }
}

export default App;
