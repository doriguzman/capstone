import React, { Component } from "react";
import axios from "axios";

import UserProfileCards from './UserProfileCards';
import FilterSidebar from './FilterSidebar';



class AllBuddies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      username: this.props.username,
      allUsers: [],
      errorMsg: ""
    };
  }

  getUserPics = () => {
    axios
      .get("/users/getPics")
      .then(response => {
        const filteredUsers = response.data.filter(
          user => user.username !== this.state.username
        );
        console.log("filteredUsers", filteredUsers);
        this.setState({
          allUsers: filteredUsers
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          errorMsg: "Sorry, there's something wrong with your feed."
        });
      });
  };

  componentDidMount() {
    this.getUserPics();
  }

  render() {
    const { allUsers } = this.state;

    return (
      <div>
        	<div><FilterSidebar allUsers={allUsers} /></div>
        {allUsers[0] ? <UserProfileCards allUsers={allUsers} />
					: 
          ""
        }
      </div>
    );
  }
}

export default AllBuddies;
