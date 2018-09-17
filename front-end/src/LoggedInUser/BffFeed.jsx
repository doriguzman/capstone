import React, { Component } from "react";
import axios from "axios";
import UserProfile from "./UserProfile";
import UserProfileCards from "./FEED/UserProfileCards";

class BffFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      arrayOfbffs: "",
      BffsInfo: [],
      allUsers: "", 
      message: ''
    };
  }

  componentWillMount() {
    this.renderBFFsArray();
  }

  renderBFFsArray = () => {
    const { user, bffs, arrayOfbffs, BffsInfo, allUsers } = this.state;
    console.log("getting the user for bffs", user);
    if (user) {
      //getting all the bffs of this user
      axios.get("/users/allBffs").then(res => {
        this.setState({
          arrayOfbffs: res.data.map(obj => obj.bff)
        });
        console.log("set the state_", this.state.arrayOfbffs);
        // console.log("gettings the user BFFS", arrayOfbffs);
      });
      //   if (arrayOfbffs){
      //getting all the users in the system
      axios.get("/users/getPics").then(response => {
        this.setState({
          allUsers: response.data,
        });
        this.renderFilter();
      });
    }
  };

  renderFilter() {
    const { arrayOfbffs, allUsers, BffsInfo } = this.state;

    if (arrayOfbffs) {
      const filteredBFFS = arrayOfbffs.map(elem =>
        allUsers.find(obj => obj.username === elem)
      );
      const merged = [].concat.apply([], filteredBFFS);

      this.setState({
        BffsInfo: [...merged], 
      });
    } else {
      this.setState({
        message:`you haven't added any bffs!`
      })
    }
  }

  render() {
    const { arrayOfbffs, BffsInfo, message } = this.state;
    
    return (
      <div> 
        {BffsInfo[0] ? (
          //passing in bff just to know that its the bffs feed, which
          //doesnt show the dates of destination 
          <UserProfileCards allUsers={BffsInfo} bffs={BffsInfo}/>
        ) : (
          <div>
            <h2> You haven't added anyone to your Faves yet! </h2>
            <h3>Add a member to your Faves by clicking <i class="far fa-heart"></i> on their page. </h3>
          </div>
        )}
        {message}
      </div>
    );
  }
}

export default BffFeed;
