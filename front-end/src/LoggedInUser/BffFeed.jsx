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
      console.log("second axios call");
      //getting all the users in the system
      axios.get("/users/getPics").then(response => {
        console.log(response.data);
        console.log("arraybffs", arrayOfbffs);
        this.setState({
          allUsers: response.data,
    
        });
        this.renderFilter();
      });
    }
  };

  renderFilter() {
    console.log("rendering filter function");
    const { arrayOfbffs, allUsers, BffsInfo } = this.state;
    if (arrayOfbffs) {
      const filteredBFFS = arrayOfbffs.map(elem =>
        allUsers.filter(obj => obj.username === elem)
      );
      var merged = [].concat.apply([], filteredBFFS);
      console.log(filteredBFFS);
      console.log("merged", merged);
      console.log("hiii");
      this.setState({
        BffsInfo: [...merged], 
      });
    }
    else{
      this.setState({
        message:`you haven't added any bffs!`
      })
    }
  }

  render() {
    const { arrayOfbffs, BffsInfo, message } = this.state;
    console.log(
      "rendering the state after the component will mount ",
      this.state
    );
    return (
      <div>
        {BffsInfo ? (
          <UserProfileCards allUsers={BffsInfo} />
        ) : (
          ''
        )}

        {message}


      </div>
    );
  }
}

export default BffFeed;
