import React, { Component } from "react";
import axios from 'axios';

import UserProfileCards from "./UserProfileCards";

// Child component of AllBuddies
class MatchedBuddies extends Component {
  constructor(props) {
		super(props); // user (has id and username), allUsers
		this.getAllUsers();
		console.log('goodbye cruel world', this.props.allUsers);
    this.state = {
			allUsers: [],
			myTrips: [],
			allUsersTrips: [],
			allUsersAttributes: [],
			usersNoTrips: [],
			threads: []
    };
	}

	getAllUsers = () => {
		axios
			.get("/users/getPics")
			.then(response => {
				const filteredUsers = response.data.filter(
					user => user.username !== this.props.user.username
				);
				console.log(filteredUsers)
				this.setState({
					allUsers: filteredUsers
				});
			})
			.then(() => {
				this.getAllThreads();
				
				
			})
			.catch(err => {
				console.log(err);
				this.setState({
					errorMsg: "Sorry, there's something wrong with your feed."
				});
			})
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
				console.log('I WANT TO SLEEEEEEP')
				console.log(res.data , 'im trying to find the dori name stuff')
				this.setState({ allUsersTrips: res.data })
				this.filterOutUsersWithTrips(this.state.allUsers)
			})
			.catch(err => console.log("Error retrieving all the trips."))

		axios // gets attributes for all users minus active users
			.get("/users/allUsersAttributes")
			.then(res => {
				this.setState({ allUsersAttributes: res.data })
			})
			.then(() => {
				this.matchingAlgorithm();
			})
			.then(() => {
				this.sortByPoints()
			})
			.catch(err => console.log("Error retrieving all User attributes."))
	}
	
		//threads is an array of thread object e.g [{id, usera, userb}]
		// ----------- THREADS ----------- //
	getAllThreads = () => {
		axios
			.get("/users/getAllThreads")
			.then(res => {
				this.setState({
					threads: res.data
				})
			})
			.then(() => {
				console.log('inside then statement', this.state.allUsers);
				// console.log("youre in the second then statement. all users: ", this.props.allUsers)
				this.state.allUsers.map(user => {
					// console.log(this.state.threads, user.username, 'bye world')
					const foundThread = this.findThreadByUsername(this.state.threads, user.username)

					if (!foundThread) {
						console.log('i am small')
						this.createThread(user.username)
					}
				})
			})
			.catch(err => console.log("Error retrieving all threads in UserProfileCards."))
	}



	findThreadByUsername = (threads, username) => {
		const foundThread = threads.find(thread => {
			return ( thread.user_b === username || thread.user_a === username );
		})
		return foundThread
	}

	createThread = (username) => {
		// let threadFound = this.findThreadByUsername(this.state.threads, username)

		// if (!threadFound) {
			axios
				.get(`/users/addThread/${username}`)
				.then(() => console.log(`Thread added for ${username}`))
				// .then(() => {
				// 	this.getAllThreads()
				// })
				.catch(err => console.log("Error adding new thread."))
		// }
	}

	// Matching Begins 
	matchingAlgorithm = () => {
		const { myTrips, allUsersTrips, allUsersAttributes } = this.state;

		const newTrips = allUsersTrips.map(tripObj => {
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
					let pts = Math.round((numOverlap / (msToDays(parseInt(new Date(myTrips.end_date) - new Date(myTrips.start_date)))) * 24) * 100) / 100;

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
            tripObj.points += 3;
          }
          if (user.drinks === tripObj.drinks) {
            tripObj.points += 3;
          }
          if (user.early_bird === tripObj.early_bird) {
            tripObj.points += 3;
          }
          if (user.extroverted === tripObj.extroverted) {
            tripObj.points += 3;
          }
          if (user.foodie === tripObj.foodie) {
            tripObj.points += 3;
          }
          if (user.nature === tripObj.nature) {
            tripObj.points += 3;
          }
          if (user.night_owl === tripObj.night_owl) {
            tripObj.points += 3;
          }
          if (user.relax === tripObj.relax) {
            tripObj.points += 3;
          }
          if (user.sightseeing === tripObj.sightseeing) {
            tripObj.points += 3;
          }
          if (user.smokes === tripObj.smokes) {
            tripObj.points += 3;
          }
          if (user.spontaneous === tripObj.spontaneous) {
            tripObj.points += 3;
          }
				}
			})

		return tripObj
		})

		this.setState({
			allUsersTrips: newTrips
		})
	}

	sortByPoints = () => {
		let sorted = this.state.allUsersTrips.sort((a, b) => b.points - a.points)
		this.setState({
			allUsersTrips: sorted
		})
	}	


	//this funct
	filterOutUsersWithTrips = (usersArr) => {
		console.log(usersArr, 'usersArr')
		const { allUsers } = this.props;
		const { allUsersTrips } = this.state;
		console.log('we are filtering users with trips', allUsersTrips)
		if(allUsersTrips){
		const tripUsernames = allUsersTrips.map(user => user.username)
		console.log(tripUsernames)
		const noTrips = usersArr.filter(user => {
			console.log('after getting the users trips usernames' , user)
			return !tripUsernames.includes(user.username)
	
		})
		console.log('trip Usernames', tripUsernames)

		this.setState({
			usersNoTrips: noTrips
		})
		console.log('setting the exact state of users with no trips' , noTrips)

	}

	}
	

  render() {
		const { myTrips, allUsersTrips, allUsersAttributes, usersNoTrips } = this.state;
		const { user, allUsers } = this.props;
		console.log('users with no trips', usersNoTrips)
		console.log(' all users trips', allUsersTrips)

    return (
      <div>
				<p className="matches-header">Other members are ranked from most to least compatible!</p>
				<p className="matches-subheader">Click <a href="/users/faq">here</a> to find out more about how we match members.</p>
        {/* <h3 className="matches-header">Your matches!</h3> */}
					<UserProfileCards allUsers={allUsersTrips} forRealUsers={allUsers}/>
				{/* <h3 className="matches-header">Everyone else</h3> */}
					<UserProfileCards allUsers={usersNoTrips} />
      </div>
    );
  }
}

export default MatchedBuddies;
