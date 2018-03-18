import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";



class NewUserSurvey extends React.Component {
    constructor() {
      super();
      this.attributes = [
        'Clubbing',
        'Night Owl',
        'Early Bird',
        'Active',
        'Foodie',
        'Mainly likes to relax',
        'Nature-Lover',
        'Likes sightseeing',
        'Spontaneous'
      ]
      this.smokes=['No', 'Yes-occasionally', 'Yes-daily']
      this.drinks=['Never' , 'Social drinker' , 'Moderately', 'Regularly']
      this.state = {
        username: '',
        fullName: '',
        age: '',
        location: '',
        bio: '',
        'Clubbing':false,
        'Night Owl':false,
        'Early Bird':false,
        'Active': false,
        'Foodie': false,
        'Mainly likes to relax': false,
        'Nature-Lover': false,
        'Likes sightseeing':false,
        'Spontaneous': false, 
        extrovert:false, 
        smokes:false,
        drinks:false
      }
    }
  
  
    // componentDidMount(){
    //  axios.get('/users').then(response => {
    //      console.log('response for get request', response.data.data);
    //      let user= //trying to get the last user in the database 
    //  }
    // }
  
    handleInput = e => {
      this.setState({
        [e.target.name]: e.target.value
      });
    };
  
  
    handleCheckBoxChange = e => {
      this.setState({
        [e.target.name]: true
      })
  
    };
  
  
    render() {
      const {username, fullName, age,location,bio,attributes}= this.state
      console.log(this.state)
      return (
        <div className='register-survey-container'>
          <h2> Please fill out the form</h2>
    
  
            <form >
              Full name
              <input
                className="fullName"
                placeholder="Full Name"
                type="text"
                name="fullName"
                value={fullName}
                onChange={this.handleInput}
              />
              <br />
              Age
                          <input
                className="age"
                placeholder="Age"
                type="text"
                name="age"
                value={age}
                onChange={this.handleInput}
              />
              <br />
              Location
                          <input
                className="location"
                placeholder="location"
                type="text"
                name="location"
                value={location}
                onChange={this.handleInput}
              />
              <br />
              Bio
                          <input
                className="Bio"
                placeholder="Bio"
                type="text"
                name="bio"
                value={bio}
                onChange={this.handleInput}
              />
  
              <br />
              {/*  now we are going to start radio buttons here */}
             <br/>
          
              <div className='checkBoxes'>Check what applies to you <br />
                {this.attributes.map(value => (
                  <span> {value} {" "}
                    <input
                      type="radio"
                      name={value}
                     
                      onChange={this.handleCheckBoxChange}
                    />
                  </span>
                ))}
              </div>     
                <br />
              <div className='smoke'>Do you smoke?
              <br/> 
               {this.smokes.map(value => (
                <span> {value} {" "}
                  <input
                    type="radio"
                    name='smokes'
               
                    onChange={this.handleCheckBoxChange}
                  />
                </span>
              ))}
              </div>
              <br/>
            <div className='drink'> How often do you drink?
            <br/> 
            {this.drinks.map(value => (
              <span> {value} {" "}
                <input
                  type="radio"
                  name={value}
                 
                  onChange={this.handleCheckBoxChange}
                />
              </span>
            ))}
            </div>
  
  
  
              </form>
              </div>
  
                      )
                  }
  }  

  export default NewUserSurvey;