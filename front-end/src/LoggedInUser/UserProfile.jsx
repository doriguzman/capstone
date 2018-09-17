import React from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
// import './profile.css';
import axios from "axios";
// import Bffs from "./Bffs";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// this is the default style sheet for react-tabs
import "react-tabs/style/react-tabs.css";
import AddTrips from "./AddTrips";
import dateFormat from "dateformat";
import MyListedTrips from './MyListedTrips'

import '../Stylesheets/userProfile.css'
import '../Stylesheets/AddTrips.css'
import BucketList from './BucketList'
import { userInfo } from "os";



class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      userid: this.props.user_id,
      username: this.props.username,
      activeUser:this.props.active,
      pic: "",
      first_name: "",
      my_location: "",
      age: "",
      bio: "",
      ethnicity: "",
      religion:'', 
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
      trips:'', 
      openTrips:'', 
      pastTrips:'', 

    };
  }


  fixUser = () => {
    const {user, username, user_id}= this.state
    if(!this.state.username){
      this.setState({
        username:this.state.user
      })
    }
    if(!this.state.user_id){
      axios.get("/users/").then(response => {
        console.log('user id ', response.data.data)
        const found=response.data.data.find(n => n.username === this.state.user.username)
        console.log(found)
        if (found) 
        this.setState({
          user_id:found.id
        })
         
    })
    }
  
}
  

  getUserInfo = () => {
    const { username, user, pic } = this.state;
    console.log('HI')
    axios
      .get(`/users/userAttributes/${this.state.username}`)
      .then(res => {
        let UserInfo = res.data;
        console.log('resdata', res.data.pic)
        
        this.setState({
          user: UserInfo,
          pic: UserInfo.pic,
          first_name: UserInfo.first_name,
          my_location: UserInfo.my_location,
          age: UserInfo.age,
          bio: UserInfo.bio,
          ethnicity: UserInfo.ethnicity,
          religion:UserInfo.religion, 
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
          drinks: UserInfo.drinks, 
          bucketlist:'', 
        })
        
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



      .catch(err => {
        console.log(err);
      });
  };


  getUserTrips=()=>{
    const {trips}=this.state
      //getting the current Date;
      const dateNow= new Date()
    axios
    .get(`/users/allTrips/${this.state.username}`)
    .then(res => {
      let UserInfo = res.data;
      this.setState({
        trips:res.data, 
      })
     //have to create a date object bc its originally a string
      // comparing date objects with date objects 
      const pastTrips= this.state.trips.filter(trip=> new Date(trip.end_date)< dateNow)
      const openTrips= this.state.trips.filter(trip=> new Date(trip.end_date)> dateNow)
      this.setState({
        pastTrips:pastTrips, 
        openTrips:openTrips
      })
    });
  };

  getBucketList = ()=>{
    const {username}= this.state
    
    axios
    .get(`/users/bucketlist/${username}`)
    .then(res =>{
      this.setState({
        bucketlist: res.data 
      })
    })
    .catch(err => {
      console.log("err in getting bucketlist", err);
    });
  }



  componentWillMount() {
    this.fixUser();
    this.getUserTrips();
    this.getBucketList();
  }

  componentDidMount() {
    this.getUserInfo();
    // this.getBucketList();
  }

  // handleClickAddTrip = e => {
  //   e.preventDefault();
  //   const { username, user } = this.state;
  //   <Link to={`/users/me/${username}/trips/add`}>
    
  //   </Link> 
  //   // (window.location.href = `http://localhost:3000/users/me/${username}/trips/add`);
  // };

 

  render() {
    const {
      user,
      user_id,
      username,
      activeUser,
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
      pastTrips, bucketListTodos, startDate, endDate, address, bucketlist
    } = this.state;

    const AddressInputProps = {
      value: this.state.address,
      onChange: this.inputChange
    };

    const addressCSSClasses = {
      root: "form-group",
      input: "search-input",
      autocompleteContainer: "autocomplete-container"
    };

  
    
    return (
      <div className="userProfile">
        <div className="blurb">
          <div className="img-container">
            <img src={pic} className="profile-pic" />
          </div>
          <div className="general-info">
            <span className="my-name">
              {first_name}, {age}
            </span>
            <span>@{username}</span>
            <span className="my-location">{my_location}</span>
            <div className="my-bio">{bio}</div>
          </div>
        </div>
        
        <Tabs className="tabs">
          <TabList className="tab-list">
            <Tab className="single-tab">About</Tab>
            <Tab className="single-tab">Current Trips</Tab>
            <Tab className="single-tab">Bucket List</Tab>
          </TabList>

          {/* About tab */}
          <TabPanel className="tab-panel">
            <div>
              
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
              <div> {ethnicity}</div>
              <div className="about-header">Religion</div>
              <div>{religion}</div>
              <br />
              <div>
                {activeUser ? <Link to={`/users/me/${username}/editprofile`}>
                    <i className="far fa-edit fa-2x" />
                  </Link> : ""}
              </div>
            </div>
          </TabPanel>

          {/* Trips tab */}
          <TabPanel className="tab-panel">
            <div>
              {openTrips ? <MyListedTrips activeUser={activeUser} username={username}  /> : ""}
              {/* {activeUser
                ? <div className="add-trip" onClick={this.handleClickAddTrip}>Add Trip</div>
                : ""} */}
            </div>
          </TabPanel>

          {/* Bucketlist tab */}
          <TabPanel className="tab-panel">
            <div>
           
               <BucketList activeUser={activeUser} username={this.state.username}/> 
                </div>
            </TabPanel>
            
        </Tabs>
      </div>
    );
  }
}

export default UserProfile;
