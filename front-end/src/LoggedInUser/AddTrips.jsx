import React, { Component } from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
// import './profile.css';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-dates/initialize";
import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController
} from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import dateFormat from "dateformat";
import "../Stylesheets/AddTrips.css";

//AIzaSyDXrD14HzNu5D-8-apQ9TLJpDhaHwC4IAk <--- googleAPI KEY

class AddTrips extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      user_id: this.props.user.id,
      username: this.props.user.username,
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
      smokes: false,
      drinks: false,
      submitted: false,
      message: null,
      startDate: null,
      endDate: null,
      focusedInput: null,
      start_date: "",
      end_date: "",
      address: "",
      todos: ""
    };

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
  }
  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  inputChange = address => {
    this.setState({
      address: address
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

  renderSurvey = e => {
    e.preventDefault();
    console.log("submitting survey");

    axios
      .post("/users/addTrip", {
        id: this.state.user_id,
        username: this.state.username,
        destination: this.state.address,
        startDate: this.state.startDate._d,
        endDate: this.state.endDate._d,
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
        drinks: this.state.drinks,
        todos: this.state.todos
      })
      .then(res => {
        console.log(res);
        this.setState({
          submitted: true,
          message: "trip added!"
        });
      })
      .catch(err => {
        console.log("err sending post req in NewUserSurvey", err);
      });
  };

  render() {
    const {
      start_date,
      end_date,
      message,
      todos,
      username,
      submitted
    } = this.state;
    const { attributes } = this;
    console.log(this.state);
    if (submitted) {
      console.log("this is the start date", this.state.start_date);
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
      <div className="add-Trip-form">
        <br />

        <h2> Add an up-coming trip!</h2>
        <hr />
        <form>
          <br />
          Destination:{" "}
          <PlacesAutocomplete
            classNames={addressCSSClasses}
            inputProps={AddressInputProps}
          />
          <br />
          <div className-travel-calendar>
            <br />
            Please Select Your Travel Dates:
            <DateRangePicker
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onDatesChange={({ startDate, endDate }) => {
                this.setState({ startDate, endDate });
              }}
              focusedInput={this.state.focusedInput}
              onFocusChange={focusedInput => {
                this.setState({ focusedInput });
              }}
            />
          </div>
          <br />
          What would you like in a travel buddy (check all that apply)?
          <br />
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
          <br />
          <div className="smoke">
            Smokes:
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
            Drinks:
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
          <div className="todos">
            Planned Activites:
            <input
              type="text"
              placeholder="todos"
              name="todos"
              value={todos}
              onChange={this.handleInput}
            />
          </div>
          <br />
          <input
            className="companionBtn"
            type="submit"
            value="Add trip!"
            onClick={this.renderSurvey}
          />
        </form>

        {message ? <Redirect to={`/users/me/${username}`} /> : ""}
      </div>
    );
  }
}
export default AddTrips;
