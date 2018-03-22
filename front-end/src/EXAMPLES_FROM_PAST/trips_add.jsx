import React, { Component } from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
// import './profile.css';
import axios from "axios";
import Calendar from "react-input-calendar";
// import Bffs from "./Bffs";
import DatePicker from "react-datepicker";
import moment from "moment";
class AddTrips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      user_id: this.props.user.id,
      username: this.props.user.username,
      destination: null,
      start_date: null,
      end_date: null,
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
      message:null
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

    // this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      start_date: date
    });
  }

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
  // startDate = date => this.setState({ start_date: dateFormat(date, "dddd, mmmm dS, yyyy")})

  // startDate_calender= (e)=>{
  //   // e.preventDefault();
  // return(<Calendar
  //   onChange={this.startDate}
  //   value={this.state.date}
  // /> )
  // }

  renderSurvey = e => {
    console.log('submitting survey')
    e.preventDefault()
    axios
      .post("/users/userPreferences", {
  
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
          submitted: true, 
          message:'trip added!'
        });
      })
      .catch(err => {
        console.log("err sending post req in NewUserSurvey", err);
      });
   
  };

  render() {
    const { start_date, end_date, message } = this.state;
    const { attributes } = this;
    console.log("this is add trips:", this.state);

    return (
      <div className="add-Trip-form">
        <h2> Add an up-coming trip!</h2>
        <hr />

        <div>this is where you add trips</div>
        <form>
          Destination:
          <br />
          Start Date:
          <div>
            <Calendar format="DD/MM/YYYY" date="4-12-2014" />
          </div>
          <br />
          End Date:
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
          {/* Start Date: <input type='text' onChange={this.startDate_calender}/> */}
          {/* <Calendar
    onChange={this.startDate}
    value={this.state.date}
  />  */}
          <br />
          <input
            className="companionBtn"
            type="submit"
            value="Add trip!"
            onClick={this.renderSurvey}
          />
        </form>

        {/* <Calendar
    onChange={this.startDate}
    value={this.state.date}
  /> */}

  {message ? <h3> {message} </h3> :''}
      </div>
    );
  }
}
export default AddTrips;
