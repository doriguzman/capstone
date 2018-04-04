import React, { Component } from "react";
import axios from 'axios';
import { Route, Link, Switch } from 'react-router-dom'
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

// // Get the modal
// var modal = document.getElementById("modal");

// // Get the button that opens the modal
// var btn = document.getElementById("filterbtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];
// var style = { style: { display: "block" } };


const isThereOverlap = (sdate1, edate1, sdate2, edate2) => {
  const minOfDates = (ed1, ed2) => (ed1 < ed2 ? ed1 : ed2);
  const maxOfDates = (sd1, sd2) => (sd1 > sd2 ? sd1 : sd2);
  const msToDays = ms => Math.floor(ms / (24 * 60 * 60 * 1000));

  const minOfEndDates = minOfDates(edate1, edate2);
  const maxOfStartDates = maxOfDates(sdate1, sdate2);
  const msOverlap = Math.max(minOfEndDates - maxOfStartDates + 1, 0);
  return msToDays(msOverlap) >= 1;
};

class FilterModal extends Component {
    constructor(props) {
      super(props);

      this.state = {
        userFilter: {
          destinationAdd: "",
          locationAdd: "",
          start_age: "",
          end_age: "",
          start_date: "",
          end_date: ""
        }
      };
    }


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
  
    handleFilterClick = e => {
      const { filterClick } = this.state;
      this.setState({
        filterClick: !filterClick
      });
    };
  
    handleClearFilter = e => {
      const { filteredUsers, holdAllUsers } = this.state
      this.setState({
        filteredUsers: holdAllUsers,
        locationAdd: "",
        destinationAdd: "",
        start_age: "",
          end_age: "",
          start_date: "",
          end_date: ""
      })
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
        filteredUsers: filteredUsers,
      });
    };

 

  render() {
    const {
      start_date,
      end_date,
      submitted,
      filterClick,
      destinationAdd,
      locationAdd,
      // userFilter,
      age,
      start_age,
      end_age} = this.state
    const { ages } = this;

    if (submitted) {
      // console.log("this is the start date", this.state.start_date);
    }
    const AddressInputProps = {
      value: this.state.destinationAdd,
			onChange: this.inputChange,
			placeholder: "Please enter a destination"
    };

    const AddressInputProps2 = {
      value: this.state.locationAdd,
			onChange: this.inputChangeLoc,
			placeholder: "Please enter a location"
    };

    const addressCSSClasses = {
      root: "form-group",
      input: "search-input",
      autocompleteContainer: "autocomplete-container"
    };

    return (
      <div id='modal'>
        <div id='modalcontent' >
          <span className="close" onClick={this.props.toggleModal}>
            &times;
          </span>
          <p> this is a modal finally </p>
           <div className="destination">
            <PlacesAutocomplete
              classNames={addressCSSClasses}
              inputProps={AddressInputProps}
            />
          </div>
          <div
            className-travel-calendar
            className="travelDates"
            placeholder=" Travel Dates"
          >
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

          <div className="location">
            
            <PlacesAutocomplete
              classNames={addressCSSClasses}
              inputProps={AddressInputProps2}
            />
          </div>

          <div className="ages">
            <input
              placeholder="From Age"
              className="start_age"
              type="number"
              name="start_age"
              value={start_age}
              onChange={this.handleStartAgeInput}
              required="required"
            />
            <input
              placeholder="To Age"
              className="end_age"
              type="number"
              name="end_age"
              value={end_age}
              onChange={this.handleEndAgeInput}
              required="required"
            />
          </div>
          <div className="buttondiv">
            <input
              className="applyfilterBtn"
              type="submit"
              value="Apply Filters"
              onClick={this.renderFilteredUserPics}
            />
          </div>
          <div className="buttondiv">
            <input
              className="clearfilterBtn"
              type="submit"
              value="Clear Filters"
              onClick={this.handleClearFilter}
            />
          </div> 
        </div>
      </div>
    );
  }
}

export default FilterModal;
