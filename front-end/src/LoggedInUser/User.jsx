import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import axios from "axios";
import UserProfile from "./UserProfile";
// import AddTrips from "./AddTrips";

class User extends Component {
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

  // Render the user's profile based on user ID
  //   renderUserProfile = () => {
  //     const { user } = this.state;
  //     console.log("trying to get userprofile")
  //     if (user) {
  //       return <UserProfile user={user} />;
  //     } else {
  //       return <h1>Must be logged in</h1>;
  //     }
  //   };

  //   getUserLikes = () => {
  //     const { userID } = this.state;
  //     const id = userID;
  //     console.log("we about to call axios");
  //     axios.get(`/users/u/${id}/likes`).then(res => {
  //       let Following = res.data.data;
  //       console.log(Following);
  //       this.setState({
  //         bffs: bffs
  //       });
  //     });
  //   };

  //   renderLikes = () => {
  //     const { bffs } = this.state;
  //     return <Bffs bffs={bffs} />;
  //   };

  //   editUserProfile = () => {
  //     const { user } = this.state;
  //     return <EditUserProfile user={user} />;
  //   };


  renderMyProfileInfo = () =>{
    const {user, username, user_id}=this.state
    console.log('im seeing if these things are passed correctly', 
  user, username, user_id)
    return(
      <UserProfile user={user} username={username} />
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
          {/* <Route
            exact
            path={`/users/me/${username}/trips/add`}
            Component={AddTrips}
          /> */}
          {/* <Route path="users/me/:myusername/edit" render={this.editUserProfile} />
        <Route path="users/me/:myusername/likes" render={this.renderLikes} /> */}
        </Switch>
      </div>
    );
  }
}

export default User;
