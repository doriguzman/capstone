import React, { Component } from "react";
import logo from "./logo.svg";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import axios from 'axios'


import './App.css';
import NewUser from './Users/NewUser'
import NewUserSurvey from './Users/NewUserSurvey'
import LoginUser from './Users/LoginUser'
import MatchedBuddies from './LoggedInUser/FEED/MatchedBuddies'
import LogOutUser from './Users/LogOutUser'
import AboutUs from './Users/AboutUs'
import User from './LoggedInUser/User'

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



  //do we just want the user to be logged out on click ????
  renderLogin = () => {
    return <LoginUser setUser={this.setUser} />
  }

  renderLogOutUser = () => {
    return <LogOutUser logOutUser={this.logOutUser} active={this.isActive} />
  }

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
  renderFeed = () => {
    const { user } = this.state
    if (user) {
      return <MatchedBuddies user={user} />
    } else {
      return this.renderLogin()
    }
  }

  renderAboutUs =()=>{
    return <AboutUs/>
  }

  renderMyProfile =()=>{
    const {user}=this.state
    if(user){
      return <User user={user} />
  }
}
  
  render() {
    const {user} = this.state
    console.log(this.state)

    return (
      <div className="App">
      {/* NAV BAR GOES HERE */}

      <div className = 'top-nav-bar'>
          <div className ='top-nav-bar-left'>
          logo icon goes here 
          </div>

          <div className='top-nav-bar-right'>
          <Link to ='/users/aboutus'>How it Works</Link>
           {' '}

           {user ? <Link to ='/users/feed'>Feed</Link>: 
          <Link to ='/users/register'>Register</Link>}
          {' '}
           {user ? <Link to ='/users/bffs'>BFFs</Link>:
          <Link to ='/users/login'>Log In</Link>}
          {' '}
          {user ? <Link to= {`/users/me/:${user.username}`}>Profile</Link> :''}
          {' '}
          {user ? <Link to='/users/logout'>Logout</Link>:''}
          </div> 

           </div>
        {/* logo  and how it works and login functionality  */}
        <div>
          <Switch>
          <Route exact path='/' render={this.renderNewUser} />
          <Route exact path='/users' render={this.renderNewUser} />
          <Route exact path='/users/register' render={this.renderNewUser} />
          <Route exact path='/users/signup/survey' render={this.renderSurvey} />
          <Route path='/users/login' render={this.renderLogin} />
          <Route path='/users/logout' render={this.renderLogOutUser} />
          <Route path='/users/feed' render={this.renderFeed} />
          <Route path='/users/aboutus' render={this.renderAboutUs}/>
          <Route path='/users/me/:username' render={this.renderMyProfile}/>
        </Switch>
        </div>
      </div>
    );
  }
}

export default App;
