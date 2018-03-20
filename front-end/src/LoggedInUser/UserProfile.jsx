import React from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
// import './profile.css';
import axios from "axios";
import Bffs from "./Bffs";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      user_id: this.props.user.id,
      username: this.props.user.username,
      userImageURL: "",
      first_name: "",
      my_location: "",
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
      toggleTripsBtn: false,
      toggleAboutBtn: false
    };
  }

  getUserInfo = () => {
    const { username } = this.state;
    console.log("get user info");
    axios
      .get(`/users/userAttributes/${username}`)
      .then(res => {
        let UserInfo = res.data;
        console.log("res.data", res.data);

        this.setState({
          user: UserInfo,
          userImageURL: UserInfo.pic,
          first_name: UserInfo.first_name,
          my_location: UserInfo.my_location,
          age: UserInfo.age,
          bio: UserInfo.bio,
          ethnicity: UserInfo.ethnicity,
          early_bird: UserInfo.early_bird,
          night_owl: UserInfo.night_owl,
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

        // this.getUserLikes();
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    console.log("component mounted!");
    this.getUserInfo();
  }

  handleClickAddTrip = e => {
    const { username } = this.state;
    window.location = `/users/me/${username}/trips/add`;
  };

  handleClickTrips = e => {
    const { username } = this.state;
    window.location = `/users/me/${username}/trips`;
    this.setState({
        toggleTripsBtn: true
    })   
  }

  render() {
    const {
      user,
      user_id,
      username,
      userImageURL,
      first_name,
      my_location,
      age,
      bio,
      ethnicity,
      early_bird,
      night_owl,
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
      toggleTripsBtn,
      toggleAboutBtn
    } = this.state;
    console.log("THE STATE IS", this.state);
    console.log("USER_id IS ", user_id);
    console.log(this.state);
    console.log("this is userprofile");

    return (
      <div>
        <div>
          <img src={userImageURL} />
        </div>
        <div>
          <div>
            Name:{first_name}, Age:{age}
          </div>
          <div>@{username}</div>
          <div>Location: {my_location}</div>
        </div>
           <div >About</div>
           <div>About me:{this.state.bio}
          Ethnicity: {this.state.ethnicity} 
          
            As a traveller, I am an early bird:{" "}
            {this.state["early_bird"] ? "yes" : "no"} a night owl:{" "}
            {this.state["night_owl"] ? "yes" : "no"}, like clubbing:{" "}
            {this.state["clubbing"] ? "yes" : "no"}, am spontaneous:
            {this.state["spontaneous"] ? "yes" : "no"}, active:{" "}
            {this.state["active"] ? "yes" : "no"}, like sightseeing:{" "}
            {this.state["sightseeing"] ? "yes" : "no"}, am a foodie:{" "}
            {this.state["foodie"] ? "yes" : "no"}, relax:{" "}
            {this.state["relax"] ? "yes" : "no"}, enjoy nature:{" "}
            {this.state["nature"] ? "yes" : "no"}, am extroverted:{" "}
            {this.state["extroverted"] ? "yes" : "no"}, smoke:{" "}
            {this.state["smokes"] ? "yes" : "no"}, drink:{" "}
            {this.state["drinks"] ? "yes" : "no"}
           </div>
        <div onClick={this.handleClickTrips}>Trips
            {toggleTripsBtn ? <button onClick={this.handleClickAddTrip}>Add trips</button> : ""}
          
        </div>
      </div>
    );
  }
}

export default UserProfile;
