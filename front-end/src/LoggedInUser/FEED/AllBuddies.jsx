import React, { Component } from "react";
import axios from "axios";
import UserProfileCards from "./UserProfileCards";
// import FilterSidebar from "./FilterSidebar";
import MatchedBuddies from "./MatchedBuddies";

import DatePicker from "react-datepicker";
import "react-dates/initialize";
import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController
} from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import dateFormat from "dateformat";
import "../../Stylesheets/Filter.css";
import Modal from "react-modal";

const isThereOverlap = (sdate1, edate1, sdate2, edate2) => {
  const minOfDates = (ed1, ed2) => (ed1 < ed2 ? ed1 : ed2);
  const maxOfDates = (sd1, sd2) => (sd1 > sd2 ? sd1 : sd2);
  const msToDays = ms => Math.floor(ms / (24 * 60 * 60 * 1000));

  const minOfEndDates = minOfDates(edate1, edate2);
  const maxOfStartDates = maxOfDates(sdate1, sdate2);
  const msOverlap = Math.max(minOfEndDates - maxOfStartDates + 1, 0);
  return msToDays(msOverlap) >= 1;
};


class AllBuddies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
      username: this.props.username,
			allUsers: [],
			holdAllUsers: [],
      dateNow: new Date(),
      userTrips: "",
      mostRecentUserTrip: "",
      errorMsg: "",
      modalIsOpen: false,
    };
  }

  toggleModal = () => {
    let { modalIsOpen } = this.state;
    this.setState({
      modalIsOpen: !modalIsOpen
    })
  }


  getUserPics = () => {
    axios
      .get("/users/getPics")
      .then(response => {
        console.log("USER PICSSSSSS, ", response.data);
        const filteredUsers = response.data.filter(
          user => user.username !== this.state.username
        );
        console.log("filteredUsers", filteredUsers);
        this.setState({
					allUsers: filteredUsers,
					holdAllUsers: filteredUsers
          // filteredUsers: filteredUsers
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          errorMsg: "Sorry, there's something wrong with your feed."
        });
      });
  };

  getUserTrips = () => {
    const { trips, username, userTrips, dateNow } = this.state;

    //get request for all trips;
    axios.get(`/users/allTrips/${username}`).then(res => {
      //       console.log("fetching all the trips", username, res.data);
      this.setState({
        userTrips: res.data
      });
      // this is getting the open trips
      const currentTrips = res.data.filter(
        trip => new Date(trip.end_date) > dateNow
      );

      // getting the most recently upcoming trip
      if (currentTrips.length >= 2) {
        console.log("going thru if statement", currentTrips);
        const nearest = currentTrips.reduce((acc, curr) => {
          if (acc.start_date < curr.start_date) {
            return acc;
          } else {
            return curr;
          }
        });
        this.setState({
          mostRecentUserTrip: nearest
        });
        // if theres only one
      } else if (currentTrips.length === 1) {
        this.setState({
          mostRecentUserTrip: currentTrips
        });
      }
    });
  };

  componentDidMount() {
    this.getUserPics();
    this.getUserTrips();
  }


  renderMatchedBuddies = () => {
    console.log(this.state.allUsers, "jesus take the wheel");
    return (
      <MatchedBuddies user={this.props.user} allUsers={this.state.allUsers} />
    );
	};
	
	renderAfterClearFilter = () => {
		return (
      <MatchedBuddies user={this.props.user} allUsers={this.state.holdAllUsers} />
    );
  }
  
  renderFilteredUserPics = e => {
    e.preventDefault();
    console.log("submitting for filters");
    const { endDate, startDate, allUsers, userFilter, flagged } = this.state;
    //have to set the state of the calendar dates in the survey (onClick)

    console.log("submitting the survey for filter");

  const filteredUsers = allUsers.filter(user => {
    let matchArr = [];
    if (startDate && endDate) {
      if (!user.start_date || !user.end_date) {
        return false;
      } else {
        const matchingDates = isThereOverlap(
          new Date(startDate._d),
          new Date(endDate._d),
          new Date(user.start_date),
          new Date(user.end_date)
        );
        matchArr.push(matchingDates);
      }
    }
    if (userFilter.destinationAdd) {
      matchArr.push(user.destination === userFilter.destinationAdd);
    }
    if (userFilter.locationAdd) {
      console.log(matchArr, user.my_location, userFilter.locationAdd);
      matchArr.push(user.my_location === userFilter.locationAdd);
    }
    if (userFilter.start_age) {
      matchArr.push(user.age >= userFilter.start_age);
    }
    if (userFilter.end_age) {
      matchArr.push(user.age <= userFilter.end_age);
    }

    return matchArr.every(elem => elem === true);
  });

  console.log("filtered users", filteredUsers);
  this.setState({
    filteredUsers: filteredUsers
  });
};

  render() {
    const {
      modalIsOpen,
      allUsers,
      filteredUsers,
      user,
      flagged,
      userFilter,
    } = this.state;

    console.log("this is state ", this.state);
    console.log("userfilters", userFilter);

    return (
      <div>
       <Modal className='modal' isOpen={modalIsOpen} contentLabel="Filter Modal">
          <FilterModal allUsers={allUsers}toggleModal={this.toggleModal} />
       </Modal>
        <h3 onClick={this.toggleModal} className="filterText">
          <span className="pointer">Filter</span>
        </h3>

        <div>
          {filteredUsers ? (
            <UserProfileCards allUsers={filteredUsers} />
          ) : (
            this.renderMatchedBuddies()
          )}
          {/* TESTING BEGINS FOR MATCHING BUDDIES */}
          {/* {this.renderMatchedBuddies()} */}

          {/* TESTING ENDS FOR MATCHING BUDDIES */}
        </div>
      </div>
    );
  }
}

export default AllBuddies;
