import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../stylesheets/login.css'

class NewUserMain extends Component {
  constructor() {
    super()
    this.state = {
      users: '',
      email: '',
      fullname: '',
      username: '',
      password: '',
      profilepic: 'https://i.imgur.com/7L40Htk.jpg',
      userAvailable: '',
      message: 'By signing up, you agree to give us your firstborn.',
      validEmail: false
    }
  }

  componentDidMount() {
    this.getAllUsers()
  }

  // Get all users and put in state for later use 
  getAllUsers = () => {
    axios
      .get('/users')
      .then(res => {
        this.setState({
          users: res.data.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  // Track username and password input inside state
  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // When user submits form
  handleFormSubmit = e => {
    e.preventDefault()
    const { users, email, username, password, fullname, profilepic } = this.state
    let emailExists = users.find(user => user.email === email)
    let userExists = users.find(user => user.username === username)

    // If all fields are filled out 
    if (email && fullname && username && password) {
      // Check that username is at least 3 characters 
      if (username.length < 3) {
        this.setState({
          message: 'Username length must be at least 3'
        })
      }
      // Check that password is at least 6 characters 
      if (password.length < 6) {
        this.setState({
          message: 'Password must be at least 6 characters'
        })
      }

      // Check that email isn't already in use 
      if (emailExists) {
        this.setState({
          message: 'Email already in use'
        })
        // Check that username isn't already in use 
      } else if (userExists) {
        this.setState({
          message: 'Username already in use'
        })
      } else {
        // Send post request to add registration information to database 
        axios
          .post('/users/new', {
            username: username,
            password: password,
            email: email,
            fullname: fullname,
            profile_url: profilepic
          })
          .then(res => {
            let id = res.data.data[0].user_id
            return id
          })
          // Then send post request to add self as followee to database 
          .then(id => {
            axios
              .post(`/users/u/${id}/follow`, {
                followee_id: id
              })
              .then(res => {
                console.log(res.data)
                this.setState({
                  email: '',
                  fullname: '',
                  username: '',
                  password: '',
                  message: 'Registered successfully'
                })
              })
              .catch(err => {
                console.log(err)
              })
          })
          .catch(err => {
            console.log(err)
            this.setState({
              email: '',
              fullname: '',
              username: '',
              password: '',
              message: 'Error registering'
            })
          })
      }
    } else {
      this.setState({
        message: 'Please fill all forms'
      })
    }
  }

  render() {
    const { email, username, password, message, fullname } = this.state
    console.log(this.state)

    return (
      <div className='register-user-container'>
        <div className='register-box'>
          <h1 className='sitefont'>Sinistagram</h1>

          <form onSubmit={this.handleFormSubmit}>
            <input
              type='email'
              placeholder='Email'
              name='email'
              onChange={this.handleInput}
              value={email}
              required />
            <input
              type='text'
              placeholder='Full Name'
              name='fullname'
              onChange={this.handleInput}
              value={fullname}
              required />
            <input
              type='text'
              placeholder='Username'
              name='username'
              onChange={this.handleInput}
              value={username}
              required />
            <input
              type='password'
              placeholder='Password'
              name='password'
              onChange={this.handleInput}
              value={password}
              required />
            <input
              type='submit'
              value='Sign up' />
          </form>
          <p className='register-message'>{message}</p>
        </div> {/* End register-box */}

        <div className='smaller-box'>
          <p>Have an account? <Link to='/users/login'>Login</Link></p>
        </div> {/* End smaller-box */}
      </div>
    );
  }
}

export default NewUserMain
