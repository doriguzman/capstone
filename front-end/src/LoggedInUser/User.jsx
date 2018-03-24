import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import axios from "axios";
import UserProfile from "./UserProfile";
// import AddTrips from "./AddTrips";
// import BffFeed from './LoggedInUser/BffFeed'

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      user_id: this.props.user.id,
      username: this.props.user.username,
      active:this.props.active,
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
      sightseeing: "",
      foodie: "",
      relax: "",
      nature: "",
      extroverted: "",
      smokes: "",
      drinks: ""
    };
  }


  fixUser =()=>{
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

  componentWillMount(){
    this.fixUser();
  }

  renderMyProfileInfo = () =>{
    const {user, username, user_id, active}=this.state
    console.log('im seeing if these things are passed correctly', 
  user, username, user_id)
    return(
      <UserProfile user={user} username={username} active={active}/>
    )
  }

  

//   renderAddTrips = () => {
//     const { user } = this.state;
//     return <AddTrips user={user} />;
//   };

  render() {
    const { user, username } = this.state;
    console.log("The profile ...... state :", this.state);

    return (
      <div>
        <Switch>
          <Route
            exact
            path={`/users/me/${username}`}
            render={this.renderMyProfileInfo}
          />
        </Switch>
      </div>
    );
  }
}

export default User;
