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
import "../../Stylesheets/FilterSidebar.css";

class FilterSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      username: this.props.username,
      userFilter: []
    };
  }

  inputChange = address => {
    this.setState({
      address: address
    });
  };

  render() {
    const {
      start_date,
      end_date,
      message,
      todos,
      username,
      submitted
    } = this.state;
    console.log(this.state);
    if (submitted) {
      console.log("this is the start date", this.state.start_date);
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
          <PlacesAutocomplete
            classNames={addressCSSClasses}
            inputProps={AddressInputProps}
          />
        </div>
        <div>
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
          <div>66-70</div>
        </div>
      </div>
    );
  }
}

export default FilterSidebar;
