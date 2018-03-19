import React, { Component } from 'react';
import logo from './logo.svg';
import { Route, Link, Switch } from "react-router-dom";

import './App.css';
import NewUser from './Users/NewUser'

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

  // renderLogin = () => {
  //   return <LoginUser setUser={this.setUser} />
  // }

  // renderLogOut = () => {
  //   return <LogOut logOutUser={this.logOutUser} />
  // }

  renderNewUser = () => {
    return <NewUser />
  }

  renderSurvey =() =>{
    return <NewUserSurvey/>
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
    console.log('HI')
    //nav bar holds 
    return (
      <div className="App">
      {/* NAV BAR GOES HERE ????*/}

        <div>
          <Route exact path='/' render={this.renderNewUser} />
          <Route exact path='/users/signup/survey' render={this.renderSurvey} />
          <Route path='/users/login' render={this.renderLogin} />
          <Route path='/users/new' render={this.renderNew} />
          <Route path='/users/logout' render={this.renderLogout} />
          <Route path='/users/home' render={this.renderHome} />

        </div>
      </div>
    );
  }
}

export default App;
