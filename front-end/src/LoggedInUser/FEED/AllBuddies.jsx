import React, { Component } from "react";
import axios from "axios";

class AllBuddies extends Component {
  constructor() {
    super();
    this.state = {
			user: null,
			allUsers: [],
			errorMsg: "",
			photoURLs: []
    };
  }

  componentDidMount() {
		axios
			.get("/users/")
			.then(response => {
				console.log(response)
				let usernames = response.data.data.map(userObj => userObj.username)

				this.setState({
					allUsers: usernames
				})
			})
			.catch(err => {
				console.log(err)
				this.setState({
					errorMsg: "Sorry, there's something wrong with your feed."
				})
			});
	}

  render() {
		console.log("all users: ", this.state.allUsers)
		console.log("photo urls: ", this.state.photoURLs)
    return <div />;
  }
}

export default AllBuddies;
