import React, { Component } from "react";
import logo from "./Images/logo.svg";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import "./App.css";
import "./Stylesheets/Navbar.css";
import "./Stylesheets/Login.css";
import NewUser from "./Users/NewUser";
import NewUserSurvey from "./Users/NewUserSurvey";
import LoginUser from "./Users/LoginUser";
import MatchedBuddies from "./LoggedInUser/FEED/MatchedBuddies";
import AllBuddies from "./LoggedInUser/FEED/AllBuddies";
import LogOutUser from "./Users/LogOutUser";
import AboutUs from "./Users/AboutUs";
import User from "./LoggedInUser/User";
import UserProfile from "./LoggedInUser/UserProfile";
import AddTrips from "./LoggedInUser/AddTrips";
import EditUserProfile from "./LoggedInUser/EditUserProfile";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      active: false,
      username:null
    };
  }

  setUser = user => {
    this.setState({ 
      user: user, 
      username:user.username
      
    });
    if(!user.username){
      this.setState({
        username:user
      })
    }
  };

  logOutUser = () => {
    axios
      .get("/logout")
      .then(res => {
        this.setState({
          user: null,
          username:null,
          active: false
        });
      })
      .catch(err => {
        console.log(`you have a logout err`, err);
      });
  };

  isActive = () => {
    this.setState({
      active: !this.state.active
    });
  };

  //do we just want the user to be logged out on click ????
  renderLogin = () => {
    return <LoginUser setUser={this.setUser} active={this.isActive} />;
  };

  renderLogOutUser = () => {
    console.log(`before`, this.state.user);
    return <LogOutUser logOutUser={this.logOutUser} active={this.isActive} />;
  };

  renderNewUser = () => {
    const { user, active } = this.state;
    console.log(this.state);
    if (active === false) {
      return <NewUser setUser={this.setUser} active={this.isActive} />;
    } else {
      return <Redirect to="/signup/survey" />;
    }
  };

  renderSurvey = () => {
    const { user, active } = this.state;
    console.log(this.state);
    return (
      <NewUserSurvey setUser={this.setUser} username={user} active={active} />
    );
  };

  componentWillMount() {
    const { user, active, username } = this.state;
    console.log('HIIIII')
    axios
      .get("/getUser")
      .then(res => {
        console.log("THIS IS A RESPONSE test", res);
        this.setState({
          user: res.data.user,
          username:res.data.user.username, 
          active: true
        });
      })
      .catch(err => {
        console.log(`errrr`, err);
      });
  }

  // Home is the feed screen
  renderFeed = () => {
    const { user, username } = this.state;
    if (user) {
      return <AllBuddies user={user} username={username}/>;
    } else {
      return this.renderLogin();
    }
  };

  renderAboutUs = () => {
    return <AboutUs />;
  };

  renderMyProfile = () => {
    const { user } = this.state;
    console.log(`newton asked for this`, user);
    if (user) {
      return <User user={user} setUser={this.setUser} />;
    }
  };

  renderAddTrips = () => {
    const { user } = this.state;
    if (user) {
      return <AddTrips user={user} />
    }
  }

  renderEditUserProfile = () => {
    const { user, active } = this.state;
    if (user) {
      return <EditUserProfile user={user} setUser={this.setUser} active={active} />
    }
  }

  render() {

    const {user, active,username} = this.state

    // if(user){
    //   const username=user.username
    // }
    console.log("USER: ", user, 'USERNAME: ' , username, 'ACTIVE' , active);
    //nav bar holds
    return (
      <div className="App">
        {/* NAV BAR GOES HERE */}

        <div className="top-nav-bar">
          <div className="top-nav-bar-left"><img src="https://preview.ibb.co/n47C2x/70logo.gif" /> </div>

          <div className='top-nav-bar-right'>
          <Link to ='/aboutus'>How it Works</Link>
           {' '}|{' '}

           {user ? <Link to ='/feed'>Feed</Link>: 
          <Link to ='/register'>Register</Link>}
          {' '}|{' '}
           {user ? <Link to ='/bffs'>BFFs</Link>:
          <Link to ='/login'>Log In</Link>}
          {' '}|{' '}
          {user &&!username ? <Link to= {`/me/${user.username}`}>Profile</Link> : ''}
          {' '}{' '}
          {username ? <Link to= {`/me/${username}`}>Profile</Link> : ''}
          {' '}{' '}
          {user ? <Link to='/logout'>Logout</Link>:''}
          </div> 

           </div>
        {/* logo  and how it works and login functionality  */}
        <div>
          <Switch>
            <Route exact path="/" render={this.renderNewUser} />
            <Route exact path="/" render={this.renderNewUser} />
            <Route exact path="/register" render={this.renderNewUser} />
            <Route
              exact
              path="/signup/survey"
              render={this.renderSurvey}
            />
            <Route path="/login" render={this.renderLogin} />
            <Route path="/logout" render={this.renderLogOutUser} />
            <Route path="/feed" render={this.renderFeed} />
            <Route path="/aboutus" render={this.renderAboutUs} />
            <Route exact path={`/me/${username}`} render={this.renderMyProfile} />
            <Route exact path = {`/me/${username}/trips/add`} render={this.renderAddTrips} />
            <Route path = {`/me/${username}/editprofile`} render={this.renderEditUserProfile} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;
