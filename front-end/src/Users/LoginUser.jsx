import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import "../Stylesheets/Login.css";


class LoginUser extends React.Component {
  constructor() {
    super();
    this.state = {
      usernameInput: "",
      passwordInput: "",
      message: "",
      loggedIn: false
    };
  }

  // Handle input change
  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitForm = e => {
    e.preventDefault();
    const { usernameInput, passwordInput, loggedIn } = this.state;

    if (usernameInput.length < 6) {
      this.setState({
        message: "Username length must be at least 6 characters"
      });
    } else {
      axios
        .post("/users/login", {
          username: usernameInput,
          password: passwordInput
        })
        .then(res => {
          console.log(res.data);
          this.props.setUser(res.data);
          this.props.active();
          this.setState({
            usernameInput: "",
            passwordInput: "",
            loggedIn: true
          });
        })
        .catch(err => {
          this.setState({
            usernameInput: "",
            passwordInput: "",
            message: "Username/password not found"
          });
        });
    }
  };

  //when the loggedIn we want to go straight to the feed;

  render() {
    const { usernameInput, passwordInput, message, loggedIn } = this.state;
    console.log(this.state);

    if (loggedIn) {
      return <Redirect to="/users/feed" />;
    }

    return (
      <div className="login-user-container">
        <h2 id="navLogoName"> D R I F T &nbsp;&nbsp; T O G E T H E R</h2>
        <div className="login-box">
          <form onSubmit={this.submitForm}>
            <input
              className="usernameBox"
              placeholder="Username"
              type="text"
              name="usernameInput"
              value={usernameInput}
              onChange={this.handleInput}
              required
            />
            <input
              className="passwordBox"
              placeholder="Password"
              type="password"
              name="passwordInput"
              value={passwordInput}
              onChange={this.handleInput}
              required
            />
            <input className="loginBtn" type="submit" value="Log in" />
          </form>

        {message}

        </div> {/* End login-box */}

        <div className='smaller-box'>
          <p><span>Don't have an account?<Link to="/users"> Sign up!</Link></span></p>
        </div> {/* End smaller-box */}

      </div>
    );
  }
}

export default LoginUser;
