import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import Profile from './Profile'
import '../stylesheets/login.css'

class LoginUser extends Component {
  constructor() {
    super()
    this.state = {
      usernameInput: '',
      passwordInput: '',
      message: 'Forgot password?',
      loggedIn: false
    }
  }

  // Handle input change
  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // Handle guest login button 
  handleGuestLogin = () => {
    this.setState({
      usernameInput: 'guest',
      passwordInput: '123456'
    })
  }

  submitForm = e => {
    e.preventDefault()
    const { usernameInput, passwordInput, loggedIn } = this.state

    if (usernameInput.length < 3) {
      this.setState({
        message: 'Username length must be at least 3'
      })
    } else {
      axios
        .post('/users/login', {
          username: usernameInput,
          password: passwordInput
        })
        .then(res => {
          console.log(res.data)
          this.props.setUser(res.data)
          this.setState({
            usernameInput: '',
            passwordInput: '',
            loggedIn: true
          })
        })
        .catch(err => {
          this.setState({
            usernameInput: '',
            passwordInput: '',
            message: 'Username/password not found'
          })
        })
    }
  }

  render() {
    const { usernameInput, passwordInput, message, loggedIn } = this.state
    console.log(this.state)

    if (loggedIn) {
      return <Redirect to='/users/home' />
    }

    return (
      <div className='login-user-container'>
        <div className='login-box'>
          <h1 className='sitefont'>Sinistagram</h1>

          <form onSubmit={this.submitForm}>
            <input
              placeholder='Username'
              type='text'
              name='usernameInput'
              value={usernameInput}
              onChange={this.handleInput}
              required />
            <input
              placeholder='Password'
              type='password'
              name='passwordInput'
              value={passwordInput}
              onChange={this.handleInput}
              required />
            <input type='submit' value='Log in' />
            <input type='button' value='Guest' onClick={this.handleGuestLogin} />
          </form>

          <p className='login-message'>{message}</p>

        </div> {/* End login-box */}

        <div className='smaller-box'>
          <p>Don't have an account?<Link to="/users/new"> Sign up</Link></p>
        </div> {/* End smaller-box */}

      </div>
    );
  }
}

export default LoginUser;
