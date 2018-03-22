import React from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
// import './profile.css';
import axios from "axios";
// import Bffs from "./Bffs";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// this is the default style sheet for react-tabs
import "react-tabs/style/react-tabs.css";
import AddTrips from "./AddTrips";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      user_id: this.props.user.id,
      username: this.props.user.username,
      active: this.props.user.active,
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
        let userInfo = res.data;
        console.log("res.data", res.data);

        this.setState({
          user: userInfo,
          userImageURL: userInfo.pic,
          first_name: userInfo.first_name,
          my_location: userInfo.my_location,
          age: userInfo.age,
          bio: userInfo.bio,
          ethnicity: userInfo.ethnicity,
          early_bird: userInfo.early_bird,
          night_owl: userInfo.night_owl,
          clubbing: userInfo.clubbing,
          spontaneous: userInfo.spontaneous,
          active: userInfo.active,
          sightseeing: userInfo.sightseeing,
          foodie: userInfo.foodie,
          relax: userInfo.relax,
          nature: userInfo.nature,
          extroverted: userInfo.extroverted,
          smokes: userInfo.smokes,
          drinks: userInfo.drinks
        });
        console.log("UserINFO: ", userInfo);

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
    e.preventDefault();
    const { username, user } = this.state;
    console.log("this is handle click add trip");
    console.log("please redirect fam");
    //  return <Redirect to = '/'/>
    return (window.location.href = `http://localhost:3000/users/me/${username}/trips/add`);
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
                <Link to={`/users/me/${username}/editprofile`}><i className="far fa-edit fa-2x" /></Link>
              </div>
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
              <button onClick={this.handleClickAddTrip}>Add Trips</button>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default UserProfile;
