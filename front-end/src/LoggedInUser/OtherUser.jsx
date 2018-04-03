import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// this is the default style sheet for react-tabs
import "react-tabs/style/react-tabs.css";
import AddTrips from "./AddTrips";
import ListedTrips from "./ListedTrips";
import "../Stylesheets/otherUser.css";
import GeneralListedTrips from "./GeneralListedTrips";
import '../index.css'

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
      openTrips: "",
      pastTrips: "",
      userbffs: "",
      bffle: "",
      flagged: ""
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
        this.getFlaggedUsers();
      })
      .catch(err => {
        console.log(err);
        console.log('its working')
      });
  };

  getUserTrips = () => {
    const { trips } = this.state;
    //getting the current Date;
    const dateNow = new Date();

    //get request for all trips;
    axios.get(`/users/allTrips/${this.state.username}`).then(res => {
      console.log("fetching all the trips", res.data);
      this.setState({
        trips: res.data
      });

      //have to create a date object bc its originally a string
      // comparing date objects with date objects
      const pastTrips = this.state.trips.filter(
        trip => new Date(trip.end_date) < dateNow
      );
      const openTrips = this.state.trips.filter(
        trip => new Date(trip.end_date) > dateNow
      );
      this.setState({
        pastTrips: pastTrips,
        openTrips: openTrips
      });
    });
  };

  getUserBFFS = () => {
    const { userbffs, username, bffle } = this.state;
    axios
      .get("/users/allBffs")
      .then(res => {
        if (res.data.find(n => n.bff === username)) {
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

  addFlag = e => {
    e.preventDefault;
    const { flagged, username, user } = this.state;
    if (!flagged) {
      axios
        .get(`/users/addFlag/${this.state.username}`)
        .then(res => {
          console.log("res.data", res.data);
        })
        .catch(err => {
          console.log(err);
        });
      this.setState({
        flagged: !flagged
      });
    } else {
      axios.delete(`/users/removeFlag/${this.state.username}`).then(res => {
        console.log("delete bff ", res.data);
      });
      this.setState({
        flagged: !flagged
      });
    }
  };

  getFlaggedUsers = username => {
    const { allUsers, bffs, user, flagged } = this.props;
    axios
      .get("/users/getFlagged")
      .then(res => {
        console.log("gettings the user's flagged people ", res.data);

        console.log("this is before the find ");
        if (res.data.find(n => n.flagged === username)) {
          console.log("went to the data");
          this.setState({
            flagged: !flagged
          });
        }
      })

      .catch(err => {
        console.log(err);
      });
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
      openTrips,
      pastTrips,
      bffle,
      flagged
    } = this.state;

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
          <div className="btnLine">
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            />
            {!bffle ? (
              <button onClick={this.addBFF} className="noFriend" >

                {" "}
                <i class="far fa-user fa-2x"></i>,
               
              </button>
            ) : (
              <button
                onClick={this.addBFF}
                className={bffle ? "addFriend" : "noFriend"}
              >
                {" "}
                <i class="far fa-user fa-2x" />{" "} 
                {this.state.bffle ? <i class="far fa-check-circle"></i> : "" }
              </button>
            )}
               {" "}
            {!flagged ? (
              <button onClick={this.addFlag} className="flagBtn">
                {" "}
                <i class="far fa-flag fa-2x" />{" "}
              </button>
            ) : (
              <button
                onClick={this.addFlag}
                className={flagged ? "redflagBtn" : "flagBtn"}
              >
                {" "}
                <i class="far fa-flag fa-2x" />{" "}
              </button>
            )}
              {" "}
            <button className='message-button'>
              <Link className='message' to={`/users/messages/${this.state.username}`}>
                <i class="far fa-envelope fa-2x" />
              </Link> 
            </button>
          </div>
        </div>
        <Tabs>
          <TabList>
            <Tab>About</Tab>
            <Tab>Trips</Tab>
          </TabList>
          <TabPanel>
            <div>
              <div />
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
              <h2> Current Trips</h2>
              {openTrips ? <GeneralListedTrips trips={openTrips} /> : ""}

              {pastTrips[0] ? (
                <div>
                  <h2> Past Trips </h2>
                  <GeneralListedTrips trips={openTrips} />
                </div>
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
