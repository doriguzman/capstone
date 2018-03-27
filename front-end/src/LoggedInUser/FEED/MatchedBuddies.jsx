import React, { Component } from "react";
import axios from 'axios';

// Child component of AllBuddies
class MatchedBuddies extends Component {
  constructor(props) {
		super(props); // user (has id and username), allUsers
    this.state = {
			userTrips: [],
			allTrips: []
    };
	}

	getUserTrips = () => {
		axios
			.get(`/users/allTrips/${this.props.user.username}`)
			.then(res => {
				console.log(`all trips for ${this.props.user.username}: `, res.data)
				this.setState({
					userTrips: res.data
				})
			})
			.catch(err => console.log("Error retrieving trips for user."));
	}

	getAllTrips = () => {
		axios
		.get("/users/getTrips")
		.then(res => {
			this.setState({
				allTrips: res.data
			})
		})
	}
	
	componentWillMount() {
		let usersTrips = this.getUserTrips()
		let allTrips = this.getAllTrips()

		const getMatches = () => {
			// let userDest = this.state.userTrips[0].destination
			// let pointsForDest = this.props.allUsers.map(user => {
			// 	if (user.destination === this.state.userTrips[0].destination) {
			// 		console.log("wow finally")
			// 	}
			// })
			console.log(this.state.userTrips)
			console.log("user trips at 0: ", this.state.userTrips[0])
			// do we want to return all the usernames from trips that have the same destination?
			// or do we want to go through all the users, grab their username, then compare the arrays of usernames?
		}

		getMatches()
	}

	// userTrips returns an array with a trip object.
	// each obj looks like: 
	 /* active false
			clubbing: false
			destination: "China"
			drinks: false
			early_bird: false
			end_date: "2018-04-14T16:00:00.000Z"
			extroverted: false
			foodie:	true
			id: 1 
			nature: true
			night_owl: true
			relax: true
			sightseeing: false
			smokes: false
			spontaneous: true
			start_date: "2018-04-08T16:00:00.000Z"
			todos: ""
			user_id: 4
			username: "michelle" */

	

  render() {
		const { userTrips } = this.state;
		const { user, allUsers } = this.props;
		
    return (
      <div>
        <h1>TESTING MATCHING BUDDIESSSSS</h1>
				{this.state.userTrips[0]
					? "return matched buddies" // HEY YOU -- CHANGE THIS
					: "return all buddies" // THIS TOO!
				}
      </div>
    );
  }
}

export default MatchedBuddies;
