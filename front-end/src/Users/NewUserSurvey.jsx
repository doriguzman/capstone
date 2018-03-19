import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Select extends React.Component {
  render() {
    const { name, values, selectedValue, handleSelected } = this.props;
    const displayValues = ["", ...values];

    return (
      <select name={name} value={selectedValue} onChange={handleSelected}>
        {displayValues.map(element => (
          <option value={element}> {element}</option>
        ))}
      </select>
    );
  }
}

class NewUserSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.attributes = [
      "Clubbing",
      "Night Owl",
      "Early Bird",
      "Active",
      "Foodie",
      "Mainly likes to relax",
      "Nature-Lover",
      "Likes sightseeing",
      "Spontaneous"
    ];
    this.smokes = ["No", "Yes-occasionally", "Yes-daily"];
    this.drinks = ["Never", "Social drinker", "Moderately", "Regularly"];
    this.ethnicities = [
      "Asian",
      "Black / African",
      "East Indian",
      "Latin / Hispanic",
      "Middle Eastern",
      "Mixed race",
      "Native American",
      "Other ethnicity",
      "Pacific Islander",
      "White / Caucasian"
    ];
    this.religions = [
      "Agnostic / Non-religious",
      "Buddhist",
      "Christian",
      "Hindu",
      "Jewish",
      "Muslim",
      "New Age (Spiritual, but not religious)",
      "Other Religion"
    ];
    this.state = {
      username: this.props.username,
      firstName: "",
      age: "",
      location: "",
      bio: "",
      Clubbing: false,
      "Night Owl": false,
      "Early Bird": false,
      Active: false,
      Foodie: false,
      "Mainly likes to relax": false,
      "Nature-Lover": false,
      "Likes sightseeing": false,
      Spontaneous: false,
      smokes: false,
      drinks: false,
      ethnicity: "",
      religion: ""
    };
  }

  renderSurvey = e => {
    e.preventDefault();
    const { username, email, password } = this.state;
    if (email) {
      axios.get("/users").then(response => {
        console.log("RESPONSE FOR GET REQUEST", response.data.data);
        console.log(email);

        if (!response.data.data.find(n => n.email === email)) {
          this.setState({
            validEmail: true
          });
        } else {
          this.setState({
            validEmail: false,
            message: "email already in use"
          });
        }
      });
    }
    if (username && password) {
      if (password.length < 6) {
        return this.setState({
          message: "Password must be at least 6 characters"
        });
      }
      axios.get("/users").then(response => {
        console.log("RESPONSE FOR GET REQUEST", response.data.data);
        if (!response.data.data.find(n => n.username === username)) {
          axios
            .post("/users/new", {
              username: username,
              email: email,
              password: password
            })
            .then(res => {
              console.log(res);
              this.setState({
                username: "",
                email: "",
                password: "",
                message: "Registered user",
                registered: true
              });
            })
            .catch(err => {
              console.log(err);
              this.setState({
                email: "",
                fullname: "",
                username: "",
                password: "",
                message: "Error registering user"
              });
            });
        } else {
          this.setState({
            message: "Username  already exists"
          });
        }
      });
    } else {
      this.setState({
        message: "Please fill all forms"
      });
    }
  };

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleCheckBoxChange = e => {
    this.setState({
      [e.target.name]: e.target.checked
    });
  };

  handleSmokes = e => {
    if (
      e.target.value === "Yes-occasionally" ||
      e.target.value === "Yes-daily"
    ) {
      this.setState({ smokes: true });
    } else {
      this.setState({ smokes: false });
    }
  };

  handleDrinks = e => {
    if (e.target.value === "Never") {
      this.setState({ drinks: false });
    } else {
      this.setState({ drinks: true });
    }
  };

  render() {
    const {
      username,
      firstName,
      age,
      location,
      bio,
      ethnicity,
      religion
    } = this.state;
    const { attributes, ethnicities, religions } = this;
    console.log(this.state);

    return (
      <div className="register-survey-container">
        <h2>Tell Us About Yourself</h2>
        <hr />
        <form>
          First Name <br />
          <input
            className="firstName"
            placeholder="First name"
            type="text"
            name="firstName"
            value={firstName}
            onChange={this.handleInput}
          />
          <br />
          Age <br />
          <input
            className="age"
            placeholder="Age"
            type="text"
            name="age"
            onChange={this.handleInput}
          />
          <br />
          Location <br />
          <input
            className="location"
            placeholder="location"
            type="text"
            name="location"
            value={location}
            onChange={this.handleInput}
          />
          <br />
          Bio <br />
          <input
            className="bio"
            placeholder="Bio"
            type="textarea"
            name="bio"
            value={bio}
            onChange={this.handleInput}
          />
          <br />
          {/*  now we are going to start radio buttons here */}
          <br />
          <div className="checkBoxes">
            What are you like on vacation? <br />
            {attributes.map(value => (
              <span>
                <input
                  type="checkbox"
                  name={value}
                  value={value}
                  onChange={this.handleCheckBoxChange}
                />{" "}
                {value}
                <br />
              </span>
            ))}
          </div>
          <br />
          <div className="smoke">
            Do you smoke?
            <br />
            {this.smokes.map(value => (
              <span>
                <input
                  type="radio"
                  name="smokes"
                  value={value}
                  onChange={this.handleSmokes}
                />{" "}
                {value}{" "}
              </span>
            ))}
          </div>
          <br />
          <div className="drink">
            {" "}
            How often do you drink?
            <br />
            {this.drinks.map(value => (
              <span>
                <input
                  type="radio"
                  name="drinks"
                  value={value}
                  onChange={this.handleDrinks}
                />{" "}
                {value}{" "}
              </span>
            ))}
          </div>
          <br />
          <div className="ethnicity">
            Which ethnicity best describes you?{" "}
            <Select
              values={ethnicities}
              name="ethnicity"
              selectedValue={ethnicity}
              handleSelected={this.handleInput}
            />
          </div>
          <br />
          <div className="religion">
            What is your religion?{" "}
            <Select
              values={religions}
              name="religion"
              selectedValue={religion}
              handleSelected={this.handleInput}
            />
          </div>
          <input
            className="surveyBtn"
            type="submit"
            value="Submit"
            onClick={this.renderSurvey}
          />
        </form>
      </div>
    );
  }
}
export default NewUserSurvey;
