import React, { Component } from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
// import './profile.css';
import axios from "axios";
// import Bffs from "./Bffs";
import NewUserSurvey from "../Users/NewUserSurvey";
import '../Stylesheets/survey.css'
// import "../Stylesheets/AddTrips.css";

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

class EditUserProfile extends Component {
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
      user: this.props.user,
      user_id: this.props.user.id,
      username: this.props.user.username,
      firstName: "",
      age: "",
      location: "",
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
      USERLOGGED:this.props.active, 
      edited: false
    };
  }

  getUserInfo = () => {
    const { username, user } = this.state;
    console.log("user:", user, "username:", username);

    axios
      .get(`/users/userAttributes/${this.state.username}`)
      .then(res => {
        let UserInfo = res.data;
        console.log("res.data", res.data);

        this.setState({
          user: UserInfo,
          pic: UserInfo.pic,
          firstName: UserInfo.first_name,
          location: UserInfo.my_location,
          age: UserInfo.age,
          bio: UserInfo.bio,
          ethnicity: UserInfo.ethnicity,
          religion: UserInfo.religion,
          "Early Bird": UserInfo.early_bird,
          "Night Owl": UserInfo.night_owl,
          Clubbing: UserInfo.clubbing,
          Spontaneous: UserInfo.spontaneous,
          Active: UserInfo.active,
          "Likes sightseeing": UserInfo.sightseeing,
          Foodie: UserInfo.foodie,
          "Mainly likes to relax": UserInfo.relax,
          "Nature-Lover": UserInfo.nature,
          Extroverted: UserInfo.extroverted,
          smokes: UserInfo.smokes,
          drinks: UserInfo.drinks
        });
        console.log("UserINFO: ", UserInfo);
        console.log("drinks ", this.state.drinks)
      })
      .catch(err => {
        console.log(err);
      });
  };

  fixUser = () => {
    const { username, user } = this.state;
    console.log("user:", user, "username:", username);
    if (!username) {
      this.setState({
        username: this.state.user
      });
    }
  };

  componentWillMount() {
    this.fixUser();
  }

  componentDidMount() {
    this.getUserInfo();
  }

  inputChange = location => {
    this.setState({
      location: location
    });
  };

  switchMode = () => {
    const lastMode = this.state.editing;
    return this.setState({
      editing: !lastMode
    });
    console.log("Currently changing info/ editing?:", this.state.editing);
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

  submitForm = e => {
    e.preventDefault();
    const {
      username,
      userImageURL,
      firstName,
      location,
      age,
      bio,
      ethnicity,
      religion,
      earlyBird,
      nightOwl,
      clubbing,
      spontaneous,
      active,
      sightseeing,
      foodie,
      relax,
      nature,
      extroverted,
      smokes,
      drinks,
      edited
    } = this.state;

    this.setState({
      editing: !this.state.editing
    });

    console.log("the state when the submitForm:", this.state);
    console.log("id", this.props.user.user_id);

    axios
      .put(`/users/edit/attributes`, {
        firstName: this.state.firstName,
        age: this.state.age,
        location: this.state.location,
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
        console.log("res.data", res.data);
        this.setState({
          edited: !edited
        });
        console.log("this is after editing", this.state);
        // this.getUserLikes();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const {
      username,
      pic,
      firstName,
      age,
      location,
      bio,
      ethnicity,
      religion,
      smokes,
      drinks,
      edited
    } = this.state;
    console.log(this.state);
    console.log("edit profile page loads");
    console.log("the state of things", this.state);
    const { attributes, ethnicities, religions } = this;
    console.log(this.state);
    // if (submitted) {
    //   return <Redirect to="/users/feed" />;
    // }

    const AddressInputProps = {
      value: this.state.location,
      onChange: this.inputChange
    };

    const addressCSSClasses = {
      root: "form-group",
      input: "search-input",
      autocompleteContainer: "autocomplete-container"
    };

    return (
      <div>
        <div>
          <div className="register-survey-container">
            <h2>Edit your Profile</h2>
            <hr />
            <form>
              Photo <br />
              <input
                className="pic"
                placeholder="URL"
                type="text"
                name="pic"
                value={pic}
                onChange={this.handleInput}
              />
              <br />
              First Name <br />
              <input
                className="firstName"
                type="text"
                name="firstName"
                value={firstName}
                onChange={this.handleInput}
              />
              <br />
              Age <br />
              <input
                className="age"
                value={age}
                type="text"
                name="age"
                onChange={this.handleInput}
              />
              <br />
              Location:
              <br />
              <PlacesAutocomplete
                classNames={addressCSSClasses}
                inputProps={AddressInputProps}
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
                  <span className="surveyCheck-EUP">
                    <input
                      type="checkbox"
                      name={value}
                      value={value}
                      checked={this.state[value]}
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
                onClick={this.submitForm}
              />
            </form>
          </div>
          {edited && <Redirect to={`/users/me/${username}`} />}
        </div>
      </div>
    );
  }
}
export default EditUserProfile;
