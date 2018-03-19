import React from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
// import './profile.css';
import axios from "axios";
import Bffs from "./Bffs";

class UserProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: this.props.user,
      user_id: this.props.user.user_id,
      userName: this.props.user.username,
      userImageURL: this.props.user.pic,
      first_name: this.props.user.first_name,
      my_location: this.props.user.my_location,
      age: this.props.user.age,
      bio: this.props.user.bio,
      ethnicity: this.props.user.ethnicity,
      early_bird: this.props.user.early_bird,
      night_owl: this.props.user.night_owl,
      clubbing: this.props.user.clubbing,
      spontaneous: this.props.user.spontaneous,
      active: this.props.user.active,
      sightseeing: this.props.user.sightseeing,
      foodie: this.props.user.foodie,
      relax: this.props.user.relax,
      nature: this.props.user.nature,
      extroverted: this.props.user.extroverted,
      smokes: this.props.user.smokes,
      drinks: this.props.user.drinks
    };
  }

  render() {
    const {
      user,
      user_id,
      userName,
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
      drinks
    } = this.state;

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
          <div>Location: {my_location}</div>
        </div>
        <div>
          <div>About me:{bio}</div>
          <div>
            As a traveller, I am an early bird: {early_bird}
            a night owl: {night_owl}, like clubbing: {clubbing}, am spontaneous:
            {spontaneous}, active: {active}, like sightseeing: {sightseeing}, am
            a foodie: {foodie}, relax: {relax}, enjoy nature: {nature}, am
            extroverted: {extroverted}, smoke: {smokes}, drink: {drinks}
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
