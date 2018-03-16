import React, { Component } from 'react';
import logo from './logo.svg';
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

  renderLogin = () => {
    return <LoginUser setUser={this.setUser} />
  }

  renderLogOut = () => {
    return <LogOut logOutUser={this.logOutUser} />
  }

  renderNewUser = () => {
    return <NewUser />
  }

  // Home is the feed screen
  renderHome = () => {
    const { user } = this.state
    if (user) {
      return <Home user={user} />
    } else {
      return this.renderLogin()
    }
  }
  
  render() {
    //nav bar holds 
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <div>
        <Route exact path='/' render={this.NewUser} />
          <Route exact path='/users' render={this.renderLogin} />
          <Route path='/users/login' render={this.renderLogin} />
          <Route path='/users/new' render={this.renderNew} />
          <Route path='/users/logout' render={this.renderLogout} />
          <Route path='/users/home' render={this.renderHome} />
          <Route path="/users/u/:id" render={(props) => <User loggedInAs={user} {...props} />} />
        </div>
      </div>
    );
  }
}

export default App;
