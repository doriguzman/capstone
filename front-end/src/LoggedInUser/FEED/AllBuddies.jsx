import React, { Component } from "react";
import axios from "axios";
import UserProfileCards from "./UserProfileCards";
import FilterSidebar from "./FilterSidebar";
import MatchedBuddies from './MatchedBuddies';
        
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

class AllBuddies extends Component {
  constructor(props) {
    super(props);
    // this.ages = [
    //   "18-21",
    //   "22-25",
    //   "26-30",
    //   "31-35",
    //   "36-40",
    //   "41-45",
    //   "46-50",
    //   "51-55",
    //   "56-60",
    //   "61-65",
    //   "66-70+"
    // ];
    this.state = {
      user: this.props.user,
      username: this.props.username,
      allUsers: [],
      dateNow: new Date(),
      userTrips: "",
      mostRecentUserTrip: "",
      errorMsg: "",
      //starting states for the filter functionality
      userFilter: {destinationAdd: "", locationAdd: ""},
      start_date: "",
      end_date: "",
      address:'', 
      locationAdd: "",
      start_age:'',
      end_age:''
    };
  }

  getAllUsers = () => {
    axios
      .get("/getAllTrips")
      .then(response => {
        this.setState({
          allUsers: response.data
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
      } else if (currentTrips.length ===1){
        this.setState({
          mostRecentUserTrip: currentTrips
        });
      }
    });
  };

  componentDidMount() {
    this.getAllUsers();
    this.getUserTrips();
  }

  renderMatchedBuddies = () => {
    return <MatchedBuddies user={this.props.user} allUsers={this.state.allUsers} />
  }

  //starting the filter functionality
  inputChange = destinationAdd => {
    console.log(destinationAdd);
    const { userFilter } = this.state;
    this.setState({
			destinationAdd: destinationAdd,
			// userFilter:[...userFilter, destinationAdd]
			userFilter:{destinationAdd: destinationAdd}
    });
  };

  inputChangeLoc = locationAdd => {
    console.log(locationAdd);
    this.setState((prevState) => {
			return {locationAdd: locationAdd,
			userFilter: {...prevState.userFilter, locationAdd: locationAdd}}
		});
  };

  handleInput = e =>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  renderFilteredUserProfiles = e => {
		e.preventDefault();
    console.log("submitting the survey for filter");	
    // if(destination)	
    const filteredUserProfiles = this.state.allUsers.filter(user => { 
// 			console.log("================>")  
// 			console.log("destinationAdd", this.state.userFilter.destinationAdd)
// 			console.log(this.state.userFilter)
// 			console.log("user", user)
// 			console.log("result", user.destination === this.state.userFilter.destinationAdd)
				return user.destination === this.state.userFilter.destinationAdd || user.my_location === this.state.userFilter.locationAdd
			});
// 		console.log("this is destination add", this.state.destinationAdd)
// 		console.log(this.state.allUsers)
    console.log("what filters we use", this.state.userFilter);
    console.log("filtered users", filteredUserProfiles);
    this.setState({
      allUsers: filteredUserProfiles
    });
  };

  render() {
    const {
      allUsers,
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

    console.log(this.state);
//     console.log("destinationAdd", destinationAdd);
//     console.log("userfilters", userFilter);
//     console.log("users", allUsers);
    
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
                  this.setState({ startDate, endDate });
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
            <div>
               Age range:
              <input
            className="start_age"
            type="number"
            name="start_age"
            value={start_age}
            onChange={this.handleInput}
            required= 'required'
          /> {'  '} to
              <input
            className="end_age"
            type="number"
            name="end_age"
            // value={end_age}
            onChange={this.handleInput}
            required= 'required'
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

        {userFilter[0] ? (
          <UserProfileCards allUsers={allUsers} />
        ) : (
          <UserProfileCards allUsers={allUsers} />
        )}

        {/* TESTING BEGINS FOR MATCHING BUDDIES */}
        {this.renderMatchedBuddies()}
        {/* TESTING ENDS FOR MATCHING BUDDIES */}
      </div>
    );
  }
}

export default AllBuddies;
