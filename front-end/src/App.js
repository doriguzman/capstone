import React, { Component } from 'react';
import logo from './logo.svg';
import { Route, Link, Switch } from "react-router-dom";

import './App.css';
import NewUser from './Users/NewUser'
import NewUserSurvey from './Users/NewUserSurvey'
import LoginUser from './Users/LoginUser'
import MatchedBuddies from './LoggedInUser/FEED/MatchedBuddies'
import LogOutUser from './Users/LogOutUser'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  setUser = user => {
    this.setState({ user: user })
  }

  logOutUser = () => {
    this.setState({ user: null })
  }



  //do we just want the user to be logged out on click ????
  renderLogin = () => {
    return <LoginUser setUser={this.setUser} />
  }

  renderLogOutUser = () => {
    return <LogOutUser logOutUser={this.logOutUser} />
  }

  renderNewUser = () => {
    return <NewUser setUser={this.setUser} />
  }

  renderSurvey =() =>{
    const {user}=this.state
    if(user){
    return <NewUserSurvey username={user.username}/>
  }
  }

  // Home is the feed screen
  renderFeed = () => {
    const { user } = this.state
    if (user) {
      return <MatchedBuddies user={user} />
    } else {
      return this.renderLogin()
    }
  }
  
  render() {
    console.log('HI')
    //nav bar holds 
    return (
      <div className="App">
      {/* NAV BAR GOES HERE ????*/}

        <div>
          <Route exact path='/' render={this.renderNewUser} />
          <Route exact path='/users/signup/survey' render={this.renderSurvey} />
          <Route path='/users/login' render={this.renderLogin} />
          <Route path='/users/logout' render={this.renderLogOutUser} />
          <Route path='/users/feed' render={this.renderFeed} />

        </div>
      </div>
    );
  }
}

export default App;
