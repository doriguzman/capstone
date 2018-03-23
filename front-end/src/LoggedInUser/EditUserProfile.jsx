import React, { Component } from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
// import './profile.css';
import axios from "axios";
// import Bffs from "./Bffs";
import NewUserSurvey from "../Users/NewUserSurvey"

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
      userImageURL: "",
      firstName: "",
      location: "",
      age: "",
      bio: "",
      ethnicity: "",
      early_bird: "",
      night_owl: "",
      clubbing: "",
      spontaneous: "",
      active: "",
      sightseeing: "",
      foodie: "",
      relax: "",
      nature: "",
      extroverted: "",
      smokes: "",
      drinks: "",
      editing: false
    };
  }

  getUserInfo = () => {
    const { username, user } = this.state;
    console.log("user:", user, "username:", username);
    // console.log("get user info"), console.log("this is the username", username);

    axios
      .get(`/userAttributes/${this.state.username}`)
      .then(res => {
        let UserInfo = res.data;
        console.log("res.data", res.data);

        this.setState({
          user: UserInfo,
          userImageURL: UserInfo.pic,
          firstName: UserInfo.first_name,
          location: UserInfo.my_location,
          age: UserInfo.age,
          bio: UserInfo.bio,
          ethnicity: UserInfo.ethnicity,
          earlyBird: UserInfo.early_bird,
          nightOwl: UserInfo.night_owl,
          clubbing: UserInfo.clubbing,
          spontaneous: UserInfo.spontaneous,
          active: UserInfo.active,
          sightseeing: UserInfo.sightseeing,
          foodie: UserInfo.foodie,
          relax: UserInfo.relax,
          nature: UserInfo.nature,
          extroverted: UserInfo.extroverted,
          smokes: UserInfo.smokes,
          drinks: UserInfo.drinks
        });
        console.log("UserINFO: ", UserInfo);
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
    console.log("component mounted!");
    this.getUserInfo();
  }


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
      editing
    } = this.state;

    this.setState({
      editing: !this.state.editing
    });

    console.log("the state when the submitForm:", this.state);
    console.log("id", this.props.user.user_id);

    axios
      .put(`/edit/attributes`)
      .then(res => {
        let UserInfo = res.data;
        console.log("res.data", res.data);

        this.setState({
          user: UserInfo,
          userImageURL: UserInfo.pic,
          firstName: UserInfo.first_name,
          location: UserInfo.my_location,
          age: UserInfo.age,
          bio: UserInfo.bio,
          ethnicity: UserInfo.ethnicity,
          religion: UserInfo.religion,
          earlyBird: UserInfo.early_bird,
          nightOwl: UserInfo.night_owl,
          clubbing: UserInfo.clubbing,
          spontaneous: UserInfo.spontaneous,
          active: UserInfo.active,
          sightseeing: UserInfo.sightseeing,
          foodie: UserInfo.foodie,
          relax: UserInfo.relax,
          nature: UserInfo.nature,
          extroverted: UserInfo.extroverted,
          smokes: UserInfo.smokes,
          drinks: UserInfo.drinks
        });
        console.log("UserINFO: ", UserInfo);
        console.log("this is after editing", this.state)
        // this.getUserLikes();
      })
      .catch(err => {
        console.log(err);
      });
  };

  // fetch(`/users/u/${this.props.user.user_id}/edit`, {
  //     headers: {
  //         "ACCEPT": "application/json",
  //         "Content-Type": "application/json"
  //     },
  //     method: "PATCH",
  //     body: JSON.stringify({
  //         newName: username,
  //         newEmail: email,
  //         newFullname: fullname,
  //         newProfile_pic: profilepicUrl,
  //         newDescription: userdescription,
  //         id: this.props.user.user_id
  //     })
  // })

  render() {
    const {
      username,
      firstName,
      age,
      location,
      bio,
      ethnicity,
      religion,
      smokes,
      drinks,
      submitted,
      editing
    } = this.state;
    console.log(this.state);
    console.log("edit profile page loads");
    console.log("the state of things", this.state);
    const { attributes, ethnicities, religions } = this;
    console.log(this.state);
    // if (submitted) {
    //   return <Redirect to="/users/feed" />;
    // }

    return (
      
        <div>
          <div>
            <div className="register-survey-container">
              <h2>Edit your Profile</h2>
              <hr />
              <form>
                First Name <br />
                <input
                  className="firstName"
                //   placeholder="First name"
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={this.handleInput}
                />
                <br />
                Age <br />
                <input
                  className="age"
                //   placeholder="Age"
                  value={age}
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
                        value={drinks}
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
            {editing && <Redirect to={`/me/${username}`} />}
          </div>
        </div>
      
    );
  }
}
export default EditUserProfile;
