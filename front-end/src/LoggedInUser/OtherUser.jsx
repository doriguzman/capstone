import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// this is the default style sheet for react-tabs
import "react-tabs/style/react-tabs.css";
import AddTrips from "./AddTrips";
// import ListedTrips from "./ListedTrips";
import "../Stylesheets/otherUser.css";
import GeneralListedTrips from "./GeneralListedTrips";
import BucketList from "./BucketList";


class OtherUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      me: this.props.user.username,
      my_id: this.props.user.id,
      user: "",
      //   user_id:'',
      username: "",
      pic: "",
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
    const {pic}=this.state
    console.log("this is the props.req", username);
    axios
      .get(`/users/userAttributes/${username}`)
      .then(res => {
        let UserInfo = res.data;
        this.setState({
          user: UserInfo,
          username: username,
          pic: UserInfo.pic,
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

        if (
          pic === "" ||
          !pic.includes(".png") ||
          !pic.includes(".img") ||
          !pic.includes(".jpeg") ||
          !pic.includes(".jpg")
        ) {
          this.setState({
            pic: "https://image.ibb.co/mP5Xuz/image_placeholder_female_1.png"
          });
        };
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
    this.getUserInfo();
    // this.getUserBFFS();
  }

  render() {
    const {
      user,
      user_id,
      username,
      pic,
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
      <div className="userProfile">
        <div className="blurb">
          <div className="img-container">
            <img src={pic} className="profile-pic" />
          </div>
          <div className="general-info">
            <span className="my-name">{first_name}, {age}</span>
            <span>@{username}</span>
            <span className="my-location">{my_location}</span>
            <div className="other-user-bio">{bio}</div>
            <div className="btnLine">
              <link 
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
              />
              {!bffle ? (
                <div onClick={this.addBFF} className="noFriend">
                  <i class="far fa-heart"></i>
                </div>
              ) : (
                <div 
                  onClick={this.addBFF}
                  className={bffle ? "addFriend" : "noFriend"}
                >
                  {this.state.bffle ? <i class="fas fa-heart"></i> : "" }
                </div>
              )}
              {!flagged ? (
                <div onClick={this.addFlag} className="flagBtn">
                  <i class="far fa-flag fa-1x" />
                </div>
              ) : (
                <div
                  onClick={this.addFlag}
                  className={flagged ? "redflagBtn" : "flagBtn"}
                >
                  <i class="far fa-flag fa-1x" />
                </div>
              )}
                
              <div className='message-div'>
                <Link to={`/users/messages/${this.state.username}`}>
                  <i class="far fa-envelope fa-1x" />
                </Link> 
              </div>
            </div>   
          </div>
        </div>

        <div>
          <Tabs className="tabs">
            <TabList className="tab-list">
              <Tab className="single-tab">About</Tab>
              <Tab className="single-tab">Current Trips</Tab>
              <Tab className="single-tab">Bucket List</Tab>
            </TabList>

            <TabPanel className="tab-panel">
              <div className="about-header">As a traveler...</div>
              <div className="attributes-container">
                {this.state["early_bird"]
                  ? <div className="attributes-true">I'm an early bird.</div>
                  : <div className="attributes-false">I'm an early bird.</div>}
                {this.state["night_owl"]
                  ? <div className="attributes-true">I'm a night owl.</div>
                  : <div className="attributes-false">I'm a night owl.</div>}
                {this.state["clubbing"]
                  ? <div className="attributes-true">I enjoy clubbing.</div>
                  : <div className="attributes-false">I enjoy clubbing.</div>}
                {this.state["spontaneous"]
                  ? <div className="attributes-true">I'm spontaneous.</div>
                  : <div className="attributes-false">I'm spontaneous.</div>}
                {this.state["active"]
                  ? <div className="attributes-true">I'm active.</div>
                  : <div className="attributes-false">I'm active.</div>}
                {this.state["sightseeing"]
                  ? <div className="attributes-true">I like sightseeing.</div>
                  : <div className="attributes-false">I like sightseeing.</div>}
                {this.state["foodie"]
                  ? <div className="attributes-true">I'm a foodie.</div>
                  : <div className="attributes-false">I'm a foodie.</div>}
                {this.state["relax"]
                  ? <div className="attributes-true">I mainly like to relax.</div>
                  : <div className="attributes-false">I mainly like to relax.</div>}
                {this.state["nature"]
                  ? <div className="attributes-true">I enjoy nature.</div>
                  : <div className="attributes-false">I enjoy nature.</div>}
                {this.state["extroverted"]
                  ? <div className="attributes-true">I'm extroverted.</div>
                  : <div className="attributes-false">I'm extroverted.</div>}
                {this.state["smokes"]
                  ? <div className="attributes-true">I smoke.</div>
                  : <div className="attributes-false">I smoke.</div>}
                {this.state["drinks"]
                  ? <div className="attributes-true">I drink.</div>
                  : <div className="attributes-false">I drink.</div>}
              </div>

                <div className="about-header">Ethnicity</div>
                <div>{ethnicity}</div>
                <div className="about-header">Religion</div>
                <div>{religion}</div>
            </TabPanel>
            
            <TabPanel className="tab-panel">
              <div>
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
            
            <TabPanel className="tab-panel">
              <BucketList username={username}/>
            </TabPanel>

          </Tabs>
        </div>
      </div>
    );
  }
}

export default OtherUser;
