import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import axios from "axios";
// import OtherUserProfile from "./OtherUserProfile";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// this is the default style sheet for react-tabs
import "react-tabs/style/react-tabs.css";
import AddTrips from "./AddTrips";

class OtherUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      me: this.props.user.username,
      my_id: this.props.user.id,
      user: "",
      //   user_id:'',
      username: "",
      userImageURL: "",
      first_name: "",
      my_location: "",
      age: "",
      bio: "",
      ethnicity: "",
      religion: "",
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
      trips: "",
      userbffs: "",
      bffle: ""
    };
  }

  componentWillMount() {
    this.getUserInfo();
  }

  getUserInfo = () => {
    const username = this.props.match.params.username;
    console.log("this is the props.req", username);
    axios
      .get(`/users/userAttributes/${username}`)
      .then(res => {
        let UserInfo = res.data;
        this.setState({
          user: UserInfo,
          username: username,
          userImageURL: UserInfo.pic,
          first_name: UserInfo.first_name,
          my_location: UserInfo.my_location,
          age: UserInfo.age,
          bio: UserInfo.bio,
          ethnicity: UserInfo.ethnicity,
          religion: UserInfo.religion,
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
      })
      .then(() => {
        this.getUserTrips();
        this.getUserBFFS();
      })
      .catch(err => {
        console.log(err);
      });
  };

  getUserTrips = () => {
    const { trips } = this.state;
    axios.get(`/users/allTrips/${this.state.username}`).then(res => {
      let UserInfo = res.data;
      console.log("res.data", res.data);
      this.setState({
        trips: res.data
      });
    });
  };

  // router.get("/allBffs", loginRequired, db.getAllBffs)

  getUserBFFS = () => {
    const { userbffs, username, bffle } = this.state;
    axios
      .get("/users/allBffs")
      .then(res => {
        console.log("gettings the user BFFS", res.data);

        console.log("this is before the find ");
        if (res.data.find(n => n.bff === username)) {
          console.log("went to the data");
          this.setState({
            bffle: !bffle
          });
        }
      })

      .catch(err => {
        console.log(err);
      });
  };

  addBFF = e => {
    e.preventDefault;
    const { bffle } = this.state;
    if (!bffle) {
      axios
        .get(`/users/addBff/${this.state.username}`)
        .then(res => {
          console.log("res.data", res.data);
        })
        .catch(err => {
          console.log(err);
        });
      this.setState({
        bffle: !bffle
      });
    } else {
      axios.delete(`/users/removeBff/${this.state.username}`).then(res => {
        console.log("delete bff ", res.data);
      });
      this.setState({
        bffle: !bffle
      });
    }
  };

  componentDidMount() {
    console.log("component mounted!");
    this.getUserInfo();
    // this.getUserBFFS();
  }

  render() {
    const {
      user,
      user_id,
      username,
      activeUser,
      userImageURL,
      first_name,
      my_location,
      age,
      bio,
      ethnicity,
      religion,
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
      drinks,
      trips,
      bffle
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

          <div className="addFriend">
            {!bffle ? (
              <button onClick={this.addBFF}> Add BFFL </button>
            ) : (
              <button onClick={this.addBFF}> Remove BFFL </button>
            )}
          </div>
        </div>
        <Tabs>
          <TabList>
            <Tab>About</Tab>
            <Tab>Trips</Tab>
          </TabList>
          <TabPanel>
            <div>
              <div>
                {activeUser ? (
                  <Link to={`/users/me/${username}/editprofile`}>
                    <i className="far fa-edit fa-2x" />
                  </Link>
                ) : (
                  ""
                )}
              </div>
              <div>
                <h3>About me: {bio} </h3>
              </div>
              Ethnicity: {ethnicity}
              <div>
                <br />
                <div>Religion:{religion}</div>
                <br />
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
              {trips
                ? trips.map(trip => (
                    <div>
                      <h3> Destination: {trip.destination}</h3>
                      <h4>
                        Starting Date:{trip.start_date}
                        <br />
                        Ending Date:{trip.end_date}
                        <br />
                        Planned Activities: {trip.todos}
                        <br />
                      </h4>
                    </div>
                  ))
                : ""}

              {activeUser ? (
                <button onClick={this.handleClickAddTrip}>Add Trips</button>
              ) : (
                ""
              )}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default OtherUser;
