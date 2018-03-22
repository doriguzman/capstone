import React, { Component } from "react";
import axios from "axios";

class AllBuddies extends Component {
  constructor() {
    super();
    this.state = {
			user: null,
			allUsers: [],
			errorMsg: ""
    };
  }

  componentWillMount() {
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
	
	componentDidMount() {
		
	}

  render() {
		console.log(this.state.allUsers)
    return <div />;
  }
}

export default AllBuddies;
