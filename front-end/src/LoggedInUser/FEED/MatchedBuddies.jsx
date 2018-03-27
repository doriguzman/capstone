import React, { Component } from "react";
import axios from 'axios';

// Child component of AllBuddies
class MatchedBuddies extends Component {
  constructor(props) {
		super(props); // user (has id and username), allUsers
    this.state = {
			myTrips: [],
			allUsersTrips: [],
			allUsersAttributes: [],
    };
	}

	componentWillMount() {
		axios // gets trips for active user
			.get(`/users/allTrips/${this.props.user.username}`)
			.then(res => {
				this.setState({ myTrips: res.data[0] })
			})
			.catch(err => console.log("Error retrieving trips for user.", err));

		axios // gets trips for all users minus active user
			.get("/users/getAllTrips")
			.then(res => {
				this.setState({ allUsersTrips: res.data })
			})
			.catch(err => console.log("Error retrieving all the trips."))

		// this.checkDestination();

		axios // gets attributes for all users minus active users
			.get("/users/allUsersAttributes")
			.then(res => {
				this.setState({ allUsersAttributes: res.data })
			})
			.catch(err => console.log("Error retrieving all User attributes."))
	}

	checkDestination = () => {
		const { myTrips, allUsersTrips, allUsersAttributes } = this.state;
		console.log("youre in the check destination function : ", allUsersTrips)

		allUsersTrips.forEach(tripObj => {
			// Give points for same trip destination
			if (myTrips) {
				if (tripObj.destination === myTrips.destination) {
					tripObj = { ...tripObj, points: 40 }
					// console.log(tripObj)
				} else {
					tripObj = { ...tripObj, points: 0 }
					// console.log(tripObj)
				}
			}

			// Check for trip dates overlap -- MAX(MIN(end1,end2)-MAX(start1,start2)+1,0)
			if (tripObj.start_date) { 
				const minOfDates = (ed1, ed2) => ed1 < ed2 ? ed1 : ed2
				const maxOfDates = (sd1, sd2) => sd1 > sd2 ? sd1 : sd2
				const msToDays = ms => Math.floor(ms / (24*60*60*1000))

				const overlap = (data1, data2) => { 
					let sdate1 = new Date(data1.start_date)
					let sdate2 = new Date(data2.start_date)
					let edate1 = new Date(data1.end_date)
					let edate2 = new Date(data2.end_date)

					const minOfEndDates = minOfDates(edate1, edate2);
					const maxOfStartDates = maxOfDates(sdate1, sdate2); 
					const msOverlap = Math.max(minOfEndDates - maxOfStartDates + 1, 0)
					// console.log("msOverlap: ", msOverlap, typeof msOverlap)
					return msToDays(msOverlap)
				}

				let numOverlap = overlap(tripObj, myTrips) // this is a pos or neg num
				// console.log("numOverlap: ", numOverlap)
				// console.log("typeof end date: ", typeof myTrips.end_date)

				const overlapPoints = (numDaysOverlap) => {
					let pts = numOverlap / (msToDays(parseInt(new Date(myTrips.end_date) - new Date(myTrips.start_date)))) * 24
					console.log("pts: ", pts)
					// console.log("typeof end date: ", typeof myTrips.end_date)

					if (pts > 0) {
						tripObj.points += pts
						console.log("trip points total: ", tripObj.points)
					}
				}
				overlapPoints();


			}
		})
	}

	componentDidUpdate() {
		this.checkDestination();
	}
	

	// myTrips returns an array with a trip object.
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
		const { myTrips, allUsersTrips, allUsersAttributes } = this.state;
		const { user, allUsers } = this.props;

		console.log("MICHELLE'S TRIPS: ", myTrips)
		// console.log("my trip dest: ", myTrips.destination)
		// console.log("ALL DE TRIPS: ", allUsersTrips)
		// console.log("ALL DE ATTRIBUTES: ", allUsersAttributes)
		
    return (
      <div>
        <h1>TESTING MATCHING BUDDIESSSSS</h1>
				{this.state.myTrips
					? "return matched buddies" // HEY YOU -- CHANGE THIS
					: "return all buddies" // THIS TOO!
				}
      </div>
    );
  }
}

export default MatchedBuddies;
