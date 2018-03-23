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
import Chatroom from "./LoggedInUser/Chat/ChatRoom";
import EditUserProfile from "./LoggedInUser/EditUserProfile";
import otherUser from './LoggedInUser/otherUser'

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
      .get("/users/logout")
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
      return <Redirect to="/users/signup/survey" />;
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
      .get("/users/getUser")
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

  renderMessaging = () => {
    const { user } = this.state;
    if (user) {
      return <Chatroom user={user} />;
    } else {
      return this.renderLogin();
    }
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
          <Link to ='/users/aboutus'>How it Works</Link>
           {' '}|{' '}

           {user ? <Link to ='/users/feed'>Feed</Link>: 
          <Link to ='/users/register'>Register</Link>}
          {' '}|{' '}
           {user ? <Link to ='/users/bffs'>BFFs</Link>:
          <Link to ='/users/login'>Log In</Link>}
          {' '}|{' '}
          {user &&!username ? <Link to= {`/users//me/${user.username}`}>Profile</Link> : ''}
          {' '}{' '}
          {username ? <Link to= {`/users/me/${username}`}>Profile</Link> : ''}
          {' '}
          {username ? <Link to= {`/users/messaging`}>Messages</Link> : ''}
          {' '}
          {user ? <Link to='/users/logout'>Logout</Link>:''}
          </div> 

           </div>
        {/* logo  and how it works and login functionality  */}
        <div>
          <Switch>
            <Route exact path="/" render={this.renderNewUser} />
            <Route exact path="/users" render={this.renderNewUser} />
            <Route exact path="/users/register" render={this.renderNewUser} />
            <Route
              exact
              path="/users/signup/survey"
              render={this.renderSurvey}
            />
            <Route path="/users/login" render={this.renderLogin} />
            <Route path="/users/logout" render={this.renderLogOutUser} />
            <Route path="/users/feed" render={this.renderFeed} />
            <Route path="/users/aboutus" render={this.renderAboutUs} />
            <Route path="/users/messaging" render={this.renderMessaging} />
            <Route exact path={`/users/me/${username}`} render={this.renderMyProfile} />
            <Route exact path = {`/users/me/${username}/trips/add`} render={this.renderAddTrips} />
            <Route exact path = {`/users/me/${username}/editprofile`} render={this.renderEditUserProfile} />
            <Route exact path="/users/u/:username/profile" component={otherUser} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;


// (props) => <otherUser user={user} active={active} {...props} />}