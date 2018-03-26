import React, { Component } from "react";
import axios from "axios";
import UserProfileCards from "./UserProfileCards";
import FilterSidebar from "./FilterSidebar";
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
		this.ages = [
			"18-21",
			"22-25",
			"26-30",
			"31-35", "36-40", "41-45", "46-50", "51-55", "56-60", "61-65", "66-70+"
		]
    this.state = {
      user: this.props.user,
      username: this.props.username,
      allUsers: [],
      errorMsg: "",
      //starting states for the filter functionality
      userFilter: [],
      start_date: "",
      end_date: "",
			destinationAdd: "",
			locationAdd: "",
			age: []
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

  //starting the filter functionality
  inputChange = destinationAdd => {
		console.log(destinationAdd);
		const {userFilter}= this.state
    this.setState({
			destinationAdd: destinationAdd,
			// userFilter:[...userFilter, destinationAdd]

    });
	};
	
	inputChangeLoc = locationAdd => {
    console.log(locationAdd);
    this.setState({
      locationAdd: locationAdd
    });
  };

  renderFilteredUserPics = e => {
		e.preventDefault();
		console.log("submitting the survey for filter");
		const { user, allUsers, userFilter, destinationAdd } = this.state;
		this.setState({
			userFilter:[...userFilter, destinationAdd]
		})

    const filteredUserPics = allUsers.filter(
      user => user.destination === this.state.userFilter[0]
    );
    console.log("what filters we use", this.state.userFilter);
    console.log("filtered users", filteredUserPics);
    this.setState({
      allUsers: filteredUserPics
		});

}

  render() {
    const {
      allUsers,
      user,
      start_date,
      end_date,
      message,
      todos,
      submitted,
			destinationAdd,
			locationAdd,
      userFilter
    } = this.state;
console.log('destinationAdd', destinationAdd)
console.log('userfilters' , userFilter)
console.log('users' , allUsers)
		// console.log("address in state: ", address)
		const {ages} = this

    if (submitted) {
      console.log("this is the start date", this.state.start_date);
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
              Age:
							<br />
              {ages.map(value => (
              <span>
                <input
                  type="checkbox"
                  name={value}
                  value={value}
                  onChange={this.handleCheckBoxChange}
                />{" "}
                {value}
                <br />
              </span>
            ))}
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
      </div>
    );
  }
}

export default AllBuddies;
