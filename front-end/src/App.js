import React, { Component } from "react";
import logo from "./Images/logo.svg";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import "./Stylesheets/App.css";
import "./Stylesheets/Navbar.css";
import "./Stylesheets/Feed.css";

import NewUser from "./Users/NewUser";
import NewUserSurvey from "./Users/NewUserSurvey";
import LoginUser from "./Users/LoginUser";
import Disclaimer from "./Users/Disclaimer";
import BeforeYouFloat from "./Users/BeforeYouFloat";
import FAQ from "./Users/FAQ";
import MatchedBuddies from "./LoggedInUser/FEED/MatchedBuddies";
import AllBuddies from "./LoggedInUser/FEED/AllBuddies";
import LogOutUser from "./Users/LogOutUser";
import AboutUs from "./Users/AboutUs";
import Messages from "./LoggedInUser/Messages";
import User from "./LoggedInUser/User";
import UserProfile from "./LoggedInUser/UserProfile";
import AddTrips from "./LoggedInUser/AddTrips";
import EditUserProfile from "./LoggedInUser/EditUserProfile";
import OtherUser from './LoggedInUser/OtherUser'
import BffFeed from './LoggedInUser/BffFeed'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      active: false,
      username:null, 
      bffs:null
    };
  }

  setUser = user => {
    this.setState({
      user: user,
      username: user.username
    });
    if (!user.username) {
      this.setState({
        username: user
      });
    }
  };

  logOutUser = () => {
    axios
      .get("/users/logout")
      .then(res => {
        this.setState({
          user: null,
          username: null,
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
    console.log("HIIIII");
    axios
      .get("/users/getUser")
      .then(res => {
        console.log("THIS IS A RESPONSE test", res);
        this.setState({
          user: res.data.user,
          username: res.data.user.username,
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

  renderDisclaimer = () => {
    return <Disclaimer />
  }

  renderBeforeYouFloat = () => {
    return <BeforeYouFloat />
  }

  renderFAQ = () => {
    return <FAQ />
  }

  renderMessages = () => {
    return <Messages user={this.state.user} />
  };

  renderUserThread = (props) => {
    let username = props.match.params.username
    console.log(username)
    return <Messages user={this.state.user} username={username}/>
  };

  renderMyProfile = () => {
    const { user, active } = this.state;
    console.log(`newton asked for this`, user);
    if (user) {
      return <User user={user} setUser={this.setUser} active={active}/>;
    }
  };

  renderAddTrips = () => {
    const { user } = this.state;
    if (user) {
      return <AddTrips user={user} />;
    }
  };

  renderEditUserProfile = () => {
    const { user, active } = this.state;
    if (user) {
      return <EditUserProfile user={user} setUser={this.setUser} active={active} />
    }
  };

  renderMyBFFS = () => {
    const { user } = this.state
    if (user){
      return <BffFeed user={user}/>
    }
  }


  render() {
    const { user, active, username } = this.state;

    // if(user){
    //   const username=user.username
    // }
    console.log("USER PASSWORD: ", user);
    //nav bar holds
    return (
      <div className="App">
        {/* NAV BAR GOES HERE */}

        <div className="top-nav-bar">
          <div className="top-nav-bar-left">
            <Link to ='/users/feed'>
              <img src="https://image.ibb.co/fLe2h7/logo_Smallest.png" alt="feathers logo" />
            </Link> 
          </div>
          {/* <div className="top-nav-bar-left2">
            <Link to ='/users/feed'>
              <img src="https://image.ibb.co/g0rb9n/feathers_Smallest.png" alt="drift togeather" />
            </Link>
          </div> */}
          <div className="feathers">
            <Link to ='/users/feed'>
              feathers
            </Link>
          </div>

          <div className='top-nav-bar-right'>
            {user ? "" : <Link to ='/users/register'>Register</Link>} {' '}{' '}
            {user ? <Link to ='/users/me/bffs'>Faves </Link> : <Link to ='/users/login'>Log In</Link>} {' '}
            {user ? <Link to='/users/messages'>Messages </Link> : ""} {" "}
            {user && !username ? <Link to= {`/users/me/${user.username}`}>Profile </Link> : ''} {' '}{' '}
            {username ? <Link to= {`/users/me/${username}`}>Profile </Link> : ''} {' '}{' '}
            {user ? <Link to='/users/logout'>Logout</Link>:''}
          </div> 

           </div>
        {/* logo  and how it works and login functionality  */}
        
        <div>
          <Switch>
            <Route exact path="/" render={this.renderNewUser} />
            <Route exact path="/users/" render={this.renderNewUser} />
            <Route exact path="/users/register" render={this.renderNewUser} />
            <Route exact path="/users/signup/survey" render={this.renderSurvey} Q/>
            <Route path="/users/login" render={this.renderLogin} />
            <Route path="/users/logout" render={this.renderLogOutUser} />
            <Route path="/users/feed" render={this.renderFeed} />
            <Route path="/users/disclaimer" render={this.renderDisclaimer} />
            <Route path="/users/beforeyoufloat" render={this.renderBeforeYouFloat} />
            <Route path="/users/faq" render={this.renderFAQ} />
            <Route path="/users/aboutus" render={this.renderAboutUs} />
            <Route exact path="/users/messages" render={this.renderMessages} />
            <Route path="/users/messages/:username" render={this.renderUserThread} />
            <Route exact path={`/users/me/${username}`} render={this.renderMyProfile} />
            <Route exact path = {`/users/me/${username}/trips/add`} render={this.renderAddTrips} />
            <Route exact path = {`/users/me/${username}/editprofile`} render={this.renderEditUserProfile} />
            {user ? <Route path="/users/u/:username/profile" render={(props) => <OtherUser user={user} active={active} {...props} />} />   :''}          {/* <Route  path="/users/u/:username" component={OtherUser} /> */}
            <Route exact path = '/users/me/bffs' render = {this.renderMyBFFS}/>

          </Switch>
        </div>
        <div>
        <footer className="footer">
          <a href="/users/aboutus">About Us </a>·{" "}
          <a href="/users/disclaimer">Disclaimer </a>·{" "}
          <a href="/users/beforeyoufloat">Before You Float </a>·{" "}
          <a href="/users/faq">FAQ</a>
          </footer>
          </div>
      </div>
    );
  }
}
export default App;


// (props) => <otherUser user={user} active={active} {...props} />}
