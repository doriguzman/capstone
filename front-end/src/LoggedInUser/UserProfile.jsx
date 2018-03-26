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

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      user_id: this.props.user.id,
      username: this.props.username,
      activeUser:this.props.active,
      userImageURL: "",
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
      trips:''
    };
  }

  fixUser = () => {
    const {user, username, user_id}= this.state
    if(!this.state.username){
      this.setState({
        username:this.state.user
      })
    if(!this.state.user_id){
      axios.get("/users").then(response => {
        console.log("RESPONSE FOR GET REQUEST", response.data.data);
        if (response.data.data.find(n => n.username === this.state.user)) {
          console.log('this is the username' , this.state.user )
            axios.get('/users/getUser')
            .then(response=>{
              console.log('this is getting one user:' , response )
            this.setState({
              user_id:response.data.user.id
            })
            })
    }
    })
  }
}
  }

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
          drinks: UserInfo.drinks
        });
        console.log("UserINFO: ", UserInfo);

        // this.getUserLikes();
      })
      .catch(err => {
        console.log(err);
      });
  };

  getUserTrips=()=>{
    const {trips}=this.state
    axios
    .get(`/users/allTrips/${this.state.username}`)
    .then(res => {
      let UserInfo = res.data;
      console.log("res.data", res.data);
      this.setState({
        trips:res.data, 
      })
  })
}

  componentWillMount() {
    this.fixUser();
    this.getUserTrips();
  }

  componentDidMount() {
    console.log("component mounted!");
    // this.fixUser();
    this.getUserInfo();
    // this.getUserTrips();
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
      trips
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
               {activeUser ? <Link to={`/users/me/${username}/editprofile`}><i className="far fa-edit fa-2x" /></Link>  :''} 
              </div>
              <div>
                <h3>About me: {bio} </h3>
              </div>
              Ethnicity: {ethnicity}
              <div>
                <br/>
                <div> 
                  Religion: {religion}
                  </div>
                  <br/>
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
              
{/*    
    //   start_date:dateFormat(this.state.startDate._d, "mmmm dS, yyyy"),
    //   end_date: dateFormat(this.state.endDate._d, "mmmm dS, yyyy"), */}

              
              {trips ? trips.map(trip => (
                <div> 
                  <h3> Destination: {trip.destination}
                    </h3>
                    <h4>
                      Starting Date:{dateFormat(trip.start_date, 'mmmm dS, yyyy')}
                      <br/>
                      Ending Date: {dateFormat(trip.end_date, 'mmmm dS, yyyy')}
                      
                      <br/>
                      Planned Activities: {trip.todos}
                      <br/>
                       </h4>
                    
                  </div>
                  )
              ) : ""}



              {activeUser ? <button onClick={this.handleClickAddTrip}>Add Trips</button> :''}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default UserProfile;
