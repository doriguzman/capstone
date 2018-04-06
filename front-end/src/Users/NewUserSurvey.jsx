import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import MatchedBuddies from "../LoggedInUser/FEED/MatchedBuddies";
import "../Stylesheets/App.css";
import "../Stylesheets/Navbar.css";
import "../Stylesheets/Login.css";
import "../Stylesheets/survey.css";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

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
      "Spontaneous",
      "Extroverted"
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
      address: "",
      bio: "",
      pic: "",
      Clubbing: false,
      "Night Owl": false,
      "Early Bird": false,
      Active: false,
      Foodie: false,
      "Mainly likes to relax": false,
      "Nature-Lover": false,
      "Likes sightseeing": false,
      Spontaneous: false,
      Extroverted: false,
      smokes: "",
      drinks: "",
      ethnicity: "",
      religion: "",
      submitted: false,
      USERLOGGED: this.props.active,
      message: "Please fill out all inputs"
    };
  }

  inputChange = address => {
    this.setState({
      address: address
    });
  };

  renderSurvey = e => {
    console.log("submitting survey");
    e.preventDefault();
    axios
      .post("/users/survey", {
        firstName: this.state.firstName,
        age: this.state.age,
        location: this.state["address"],
        bio: this.state.bio,
        pic: this.state.pic,
        ethnicity: this.state.ethnicity,
        religion: this.state.religion,
        earlyBird: this.state["Early Bird"],
        nightOwl: this.state["Night Owl"],
        clubbing: this.state.Clubbing,
        spontaneous: this.state.Spontaneous,
        active: this.state.Active,
        sightseeing: this.state["Likes sightseeing"],
        foodie: this.state.Foodie,
        relax: this.state["Mainly likes to relax"],
        nature: this.state["Nature-Lover"],
        extroverted: this.state.Extroverted,
        smokes: this.state.smokes,
        drinks: this.state.drinks
      })
      .then(res => {
        console.log(res);
        this.setState({
          submitted: true
        });
      })
      .catch(err => {
        console.log("err sending post req in NewUserSurvey", err);
      });
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

  // handleCheckboxes = () => {
  //   const { } = this.state
  //   return !this.state.address || !this.state.smokes || !this.state.drinks && !clubbing || !
  // }

  render() {
    const {
      username,
      firstName,
      age,
      address,
      bio,
      pic,
      ethnicity,
      religion,
      submitted,
      message,
      smokes,
      drinks
    } = this.state;
    const { attributes, ethnicities, religions } = this;
    console.log("NewUserSurvey", this.state);
    if (submitted) {
      return <Redirect to="/users/feed" />;
    }

    const AddressInputProps = {
      value: this.state.address,
      onChange: this.inputChange
    };

    const addressCSSClasses = {
      root: "form-group",
      input: "search-input",
      autocompleteContainer: "autocomplete-container"
    };
    return (
      <div className="register-survey-container">
        <h2 id="navLogoName">Tell Us About Yourself</h2>
        <hr />
        <form>
          First Name <br />
          <input
            className="firstName"
            type="text"
            name="firstName"
            value={firstName}
            onChange={this.handleInput}
            required
          />
          <br />
          Age <br />
          <input
            className="age"
            type="number"
            name="age"
            onChange={this.handleInput}
            required
          />
          <br />
          Location:
          <br />
          <PlacesAutocomplete
            id='location'
            classNames={addressCSSClasses}
            inputProps={AddressInputProps}
          />
          Bio <br />
          <input
            className="bio"
            type="textarea"
            name="bio"
            value={bio}
            onChange={this.handleInput}
          />
          <br />
          Photo <br />
          <input
            className="pic"
            placeholder="URL"
            type="text"
            name="pic"
            value={pic}
            onChange={this.handleInput}
          />
          {/*  now we are going to start radio buttons here */}
          <br />
          <h4> What are you like on vacation?</h4>
          <div className="checkBoxes">
            {attributes.map(value => (
                <span className="surveyCheck">
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
            <strong>Do you smoke?</strong>
            <br />
            {this.smokes.map(value => (
              <span>
                <input
                  type="radio"
                  name="smokes"
                  value={value}
                  onChange={this.handleSmokes}
                  // required="true"
                />{" "}
                {value}{" "}
              </span>
            ))}
          </div>
          <br />
          <div className="drink">
            {" "}
            <strong>How often do you drink?</strong>
            <br />
            {this.drinks.map(value => (
              <span>
                <input
                  type="radio"
                  name="drinks"
                  value={value}
                  onChange={this.handleDrinks}
                  // required
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
            disabled={
              !this.state.address ||
              this.state.smokes === "" ||
              !this.state.drinks === ""
            }
            onClick={this.renderSurvey}
            disabled={!address || smokes === "" || drinks === ""}
          />
        </form>

        {message ? <h2> {message} </h2> : ""}
      </div>
    );
  }
}
export default NewUserSurvey;
