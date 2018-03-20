import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import axios from "axios";
import UserProfile from "./UserProfile";
// import EditUserProfile from './EditUserProfile'

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

  render() {
      const  {user}=this.state
    console.log("The state:", this.state);

    return (
      <div>
       <UserProfile user={user}/>
        {/* <Route path="users/me/:myusername/edit" render={this.editUserProfile} />
        <Route path="users/me/:myusername/likes" render={this.renderLikes} /> */}
      </div>
    );
  }
}

export default User;
