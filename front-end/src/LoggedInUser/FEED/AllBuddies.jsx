import React, { Component } from "react";
import axios from "axios";
import UserProfileCards from "./UserProfileCards";
import FilterSidebar from "./FilterSidebar";
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
      dateNow: new Date(),
      userTrips: "",
      mostRecentUserTrip: "",
      errorMsg: "",
      //starting states for the filter functionality
      userFilter: {
        destinationAdd: "",
        locationAdd: "",
        start_age: "",
        end_age: "",
        start_date: "",
        end_date: ""
      },
      start_date: "",
      end_date: "",
      address: "",
      locationAdd: "",
      start_age: "",
      end_age: ""
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
          allUsers: filteredUsers,
          filteredUsers: filteredUsers
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
    console.log(this.state.allUsers, 'jesus take the wheel');
    return (
      <MatchedBuddies user={this.props.user} allUsers={this.state.allUsers} />
    );
  };

  //starting the filter functionality
  inputChange = destinationAdd => {
    console.log(destinationAdd);
    const { userFilter } = this.state;
    this.setState({
      destinationAdd: destinationAdd,
      // userFilter:[...userFilter, destinationAdd]
      userFilter: { ...userFilter, destinationAdd: destinationAdd }
    });
  };

  inputChangeLoc = locationAdd => {
    const { userFilter } = this.state;
    console.log(locationAdd);
    this.setState({
      locationAdd: locationAdd,
      userFilter: { ...userFilter, locationAdd: locationAdd }
    });
  };

  handleStartAgeInput = e => {
    const { userFilter, start_age } = this.state;
    const newStartAge = e.target.value ? Number(e.target.value) : "";
    this.setState({
      start_age: newStartAge
    });
    this.setState({
      userFilter: { ...userFilter, start_age: newStartAge }
    });
  };

  handleEndAgeInput = e => {
    const { userFilter, end_age } = this.state;
    const newEndAge = e.target.value ? Number(e.target.value) : "";
    this.setState({
      end_age: newEndAge
    });
    this.setState({
      userFilter: { ...userFilter, end_age: newEndAge }
    });
  };

  renderFilteredUserPics = e => {
    e.preventDefault();
    console.log("submitting for filters");
    const { endDate, startDate, allUsers, userFilter } = this.state;
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
      if(userFilter.destinationAdd){
        matchArr.push(user.destination === userFilter.destinationAdd)
      }
      if (userFilter.locationAdd) {
        matchArr.push(user.my_location === userFilter.locationAdd);
      }
      if (userFilter.start_age) {
        matchArr.push(user.age >= userFilter.start_age);
      }
      if (userFilter.end_age) {
        matchArr.push(user.age <= userFilter.end_age);
      }

      return matchArr.every(elem => elem === true);
      // if (
      //   // userFilter.destinationAdd &&
      //   userFilter.locationAdd
      //   // userFilter.start_date &&
      //   // userFilter.end_date &&
      //   // userFilter.start_age &&
      //   // userFilter.end_age
      // ) {
      //   return (
      //     // user.destination === userFilter.destinationAdd &&
      //     user.my_location === userFilter.locationAdd
      //     // (user.start_date >= userFilter.start_date &&
      //       // user.end_date <= userFilter.end_date) &&
      //     // (user.age >= userFilter.start_age && user.age <= userFilter.end_age)
      //   );
      // }
    });

    console.log("filtered users", filteredUsers);
    this.setState({
      filteredUsers: filteredUsers
    });
  };

  //  getFilteredUsers  = (user, userFilter) =>{

  //   if (
  //     userFilter.destinationAdd &&
  //     userFilter.locationAdd &&
  //     userFilter.start_date &&
  //     userFilter.end_date &&
  //     userFilter.start_age &&
  //     userFilter.end_age
  //   ) {
  //     return (
  //       user.destination === userFilter.destinationAdd &&
  //       user.my_location === userFilter.locationAdd &&
  //       (user.start_date >= userFilter.start_date &&
  //         user.end_date <= userFilter.end_date) &&
  //       (user.age >= userFilter.start_age && user.age <= userFilter.end_age)
  //     );
  //   }
  //   if (
  //     userFilter.destinationAdd &&
  //     userFilter.locationAdd &&
  //     userFilter.start_date &&
  //     userFilter.end_date &&
  //     userFilter.start_age &&
  //     userFilter.end_age
  //   )

  // }

  render() {
    const {
      allUsers,
      filteredUsers,
      user,
      start_date,
      end_date,
      submitted,
      destinationAdd,
      locationAdd,
      userFilter,
      age,
      start_age,
      end_age
    } = this.state;

    console.log("this is state ", this.state);
    console.log("userfilters", userFilter);

    // console.log("address in state: ", address)
    const { ages } = this;

    if (submitted) {
      // console.log("this is the start date", this.state.start_date);
    }
    const AddressInputProps = {
      value: this.state.destinationAdd,
      onChange: this.inputChange
    };

    const AddressInputProps2 = {
      value: this.state.locationAdd,
      onChange: this.inputChangeLoc
    };

    const addressCSSClasses = {
      root: "form-group",
      input: "search-input",
      autocompleteContainer: "autocomplete-container"
    };

    return (
      <div>
        <div className="sidebar">
          <h3>Filter</h3>
          <br />
          <form>
            <div>
              Please enter a destination:{" "}
              <PlacesAutocomplete
                classNames={addressCSSClasses}
                inputProps={AddressInputProps}
              />
            </div>
            <br />
            <div className-travel-calendar>
              Please Select Travel Dates:
              <br />
              <DateRangePicker
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onDatesChange={({ startDate, endDate }) => {
                  console.log("date changes", startDate, endDate);
                  this.setState({
                    startDate,
                    endDate
                    // userFilter:{ ...userFilter, start_date:startDate._d, end_date: endDate._d }
                  });
                }}
                focusedInput={this.state.focusedInput}
                onFocusChange={focusedInput => {
                  this.setState({ focusedInput });
                }}
              />
            </div>
            <br />
            <div>
              Enter your location:{"  "}
              {/* <input type="text" /> */}
              <PlacesAutocomplete
                classNames={addressCSSClasses}
                inputProps={AddressInputProps2}
              />
            </div>
            <br />
            <div>
              Age range:
              <input
                className="start_age"
                type="number"
                name="start_age"
                value={start_age}
                onChange={this.handleStartAgeInput}
                required="required"
              />{" "}
              {"  "} to
              <input
                className="end_age"
                type="number"
                name="end_age"
                value={end_age}
                onChange={this.handleEndAgeInput}
                required="required"
              />
            </div>
            <input
              className="filterBtn"
              type="submit"
              value="Add Filters"
              onClick={this.renderFilteredUserPics}
            />
          </form>
        </div>

        {/* {filteredUsers ? (
          <UserProfileCards allUsers={filteredUsers} />
        ) : ( 
          <div> no users found </div>
        )} */}
        {/* TESTING BEGINS FOR MATCHING BUDDIES */}
        {this.renderMatchedBuddies()}
        {/* TESTING ENDS FOR MATCHING BUDDIES */}
      </div>
    );
  }
}

export default AllBuddies;
