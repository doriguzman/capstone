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

	matchingAlgorithm = () => {
		const { myTrips, allUsersTrips, allUsersAttributes } = this.state;

		allUsersTrips.forEach(tripObj => {
			// Give points for same trip destination
			if (myTrips) {
				if (tripObj.destination === myTrips.destination) {
					tripObj = { ...tripObj, points: 40 }
				} else {
					tripObj = { ...tripObj, points: 0 }
				}
			}

			// Check for trip dates overlap -- MAX(MIN(end1,end2)-MAX(start1,start2)+1,0)
			if (tripObj.start_date) { 
				const minOfDates = (ed1, ed2) => ed1 < ed2 ? ed1 : ed2;
				const maxOfDates = (sd1, sd2) => sd1 > sd2 ? sd1 : sd2;
				const msToDays = ms => Math.floor(ms / (24 * 60 * 60 * 1000));

				const overlap = (data1, data2) => { 
					let sdate1 = new Date(data1.start_date);
					let sdate2 = new Date(data2.start_date);
					let edate1 = new Date(data1.end_date);
					let edate2 = new Date(data2.end_date);

					const minOfEndDates = minOfDates(edate1, edate2);
					const maxOfStartDates = maxOfDates(sdate1, sdate2); 
					const msOverlap = Math.max(minOfEndDates - maxOfStartDates + 1, 0);
					return msToDays(msOverlap);
				}

				let numOverlap = overlap(tripObj, myTrips) // this is either a positive or neg num

				const overlapPoints = (numDaysOverlap) => {
					let pts = numOverlap / (msToDays(parseInt(new Date(myTrips.end_date) - new Date(myTrips.start_date)))) * 24;

					if (pts > 0) {
						tripObj.points += pts;
					}
				}
				overlapPoints();
			}

			// Check for matching between active user's preferences and other user's attributes
			allUsersAttributes.forEach(user => {
				// Only check for those that have trips entered in the database
				if (user.username === tripObj.username) {
					if (user.active === tripObj.active) {
						tripObj.points += 3
					}
					if (user.clubbing === tripObj.clubbing) {
						tripObj.points += 3
					}
					if (user.drinks === tripObj.drinks) {
						tripObj.points += 3
					}
					if (user.early_bird === tripObj.early_bird) {
						tripObj.points += 3
					}
					if (user.extroverted === tripObj.extroverted) {
						tripObj.points += 3
					}
					if (user.foodie === tripObj.foodie) {
						tripObj.points += 3
					}
					if (user.nature === tripObj.nature) {
						tripObj.points += 3
					}
					if (user.night_owl === tripObj.night_owl) {
						tripObj.points += 3
					}
					if (user.relax === tripObj.relax) {
						tripObj.points += 3
					}
					if (user.sightseeing === tripObj.sightseeing) {
						tripObj.points += 3
					}
					if (user.smokes === tripObj.smokes) {
						tripObj.points += 3
					}
					if (user.spontaneous === tripObj.spontaneous) {
						tripObj.points += 3
					}
				}
			})
		})
	}

	componentDidUpdate() {
		this.matchingAlgorithm();
	}

  render() {
		const { myTrips, allUsersTrips, allUsersAttributes } = this.state;
		const { user, allUsers } = this.props;

		console.log("MICHELLE'S TRIPS: ", myTrips)
		
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
