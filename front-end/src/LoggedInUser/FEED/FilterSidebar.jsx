import React from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import axios from "axios";
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
import "../../Stylesheets/AddTrips.css";

class FilterSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      allUsers: this.props.allUsers,
      userFilter: [],
      start_date: "",
      end_date: "",
      address: "",
      location: ""
    };
  }

  inputChange = address => {
    this.setState({
      address: address
    });
  };

  renderFilteredUserPics = ({ allUsers }) => {
    const { user } = this.state;
    const filteredUserPics = allUsers.filter(
      user.destination === this.state.address
    );
  };

  render() {
    const {
      start_date,
      end_date,
      message,
      todos,
      submitted,
      allUsers,
      userFilter
    } = this.state;
    if (submitted) {
    }
    const AddressInputProps = {
      value: this.state.address,
      onChange: this.inputChange
    };

    const addressCSSClasses = {
      root: "form-group",
      input: "search-input",
      autocompleteContainer: "autocomplete-container"
    };
    return (
      <div className="sidebar">
        <h3>Filter</h3>
        <br />
        <form>
          <div className="destination">
            Please enter a destination:{" "}
            <PlacesAutocomplete
              classNames={addressCSSClasses}
              inputProps={AddressInputProps}
            />
          </div>
          <br />
          <div className-travel-calendar className="dates">
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
          <div className="location">
            Enter your location:{"  "}
            <input type="text" />
          </div>
          <div className="ages">
            Age:
            <div>18-21</div>
            <div>22-25</div>
            <div>26-30</div>
            <div>31-35</div>
            <div>36-40</div>
            <div>41-45</div>
            <div>46-50</div>
            <div>51-55</div>
            <div>56-60</div>
            <div>61-65</div>
            <div>66-70+</div>
          </div>
          <input
            className="filterBtn"
            type="submit"
            value="Add Filters"
            onClick={this.renderFilteredUserPics}
          />
        </form>
      </div>
    );
  }
}

export default FilterSidebar;
