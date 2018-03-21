import React from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
// import './profile.css';
import axios from "axios";
// import Bffs from "./Bffs";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// this is the default style sheet for react-tabs
import "react-tabs/style/react-tabs.css";

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
      drinks: ""
    };
  }

  fixUser = () => {
    const { username, user } = this.state;
    console.log("user:", user, "username:", username);
    if (!username) {
      this.setState({
        username: this.state.user
      });
    }
  };

  getUserInfo = () => {
    const { username, user } = this.state;
    console.log("user:", user, "username:", username);
    // console.log("get user info"), console.log("this is the username", username);

    axios
      .get(`/users/userAttributes/${this.state.username}`)
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
  componentWillMount() {
    this.fixUser();
  }

  componentDidMount() {
    console.log("component mounted!");
    // this.fixUser();
    this.getUserInfo();
  }

  handleClickAddTrip = e => {
    const { username } = this.state;
    console.log("this is add trip");
    window.location = `/users/me/${username}/trips/add`;
  };

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
      sightseeing,
      foodie,
      relax,
      nature,
      extroverted,
      smokes,
      drinks
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
            Name: {first_name}, Age: {age}
          </div>

          <div>@{username}</div>
          <div>Location: {my_location}</div>
        </div>
        <Tabs>
          <TabList>
            <Tab>About</Tab>
            <Tab>Trips</Tab>
          </TabList>
          <TabPanel>
            <div>
              <div>
                <h3>About me: {bio} </h3>
              </div>
              Ethnicity: {ethnicity}
              <div>
                <pre>
                  <b>As a traveller: </b>
                  <br />
                  <br /> I am an early bird:{" "}
                  {this.state["early_bird"] ? "yes" : "no"} ,
                  <br /> A night owl: {this.state["night_owl"] ? "yes" : "no"},
                  <br /> Like clubbing: {this.state["clubbing"] ? "yes" : "no"},
                  <br /> I am spontaneous:{" "}
                  {this.state["spontaneous"] ? "yes" : "no"},
                  <br /> I am active: {this.state["active"] ? "yes" : "no"},
                  <br /> I like sightseeing:{" "}
                  {this.state["sightseeing"] ? "yes" : "no"},
                  <br /> I am a foodie: {this.state["foodie"] ? "yes" : "no"},
                  <br /> Relax: {this.state["relax"] ? "yes" : "no"},
                  <br /> Enjoy nature: {this.state["nature"] ? "yes" : "no"},
                  <br /> I am extroverted:{" "}
                  {this.state["extroverted"] ? "yes" : "no"},
                  <br /> Smoke: {this.state["smokes"] ? "yes" : "no"},
                  <br /> Drink: {this.state["drinks"] ? "yes" : "no"}
                </pre>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div>
              <a href="http://localhost:3000/users/me/:username/trips/add">
                Add Trips
              </a>
              {/* <button onClick={this.handleClickAddTrip}>Add trips</button> */}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default UserProfile;
