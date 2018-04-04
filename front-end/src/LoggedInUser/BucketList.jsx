import React, { Component } from "react";
import dateFormat from "dateformat";
import { Redirect } from "react-router-dom";
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

class BucketList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bucketlistArray: "",
      activeUser: this.props.activeUser,
      username: this.props.username,
      bucketListTodos: "",
      // focusedInput: null,
      address: "",
      submitted: false,
      bucketlist: []
    };
    console.log(this.state);
  }

  getBucketList = () => {
    console.log("hitting the bucket list!", username);
    const { username } = this.state;
    axios
      .get(`/users/bucketlist/${username}`)
      .then(res => {
        console.log("this is the response,", res.data);
        this.setState({
          bucketlistArray: res.data
        });
      })
      .catch(err => {
        console.log("err in getting bucketlist", err);
      });
  };

  addToBucketList = e => {
    e.preventDefault();
    console.log("submitting survey");
    console.log(this.state.startDate._d);
    axios

      .post("/users/addBucketList", {
        id: this.state.user_id,
        username: this.state.username,
        destination: this.state.address,
        todos: this.state.bucketListTodos
      })
      .then(res => {
        console.log(res);
        this.getBucketList();

        // window.location.reload();
      })
      .catch(err => {
        console.log("err posting bucket list", err);
      });
  };

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  inputChange = address => {
    this.setState({
      address: address
    });
  };

  handleDeleteBucket = (e, id, username) => {
    e.preventDefault();
    console.log(id, username);
    axios.delete(`/users/removeBucket/${username}/${id}`).then(response => {
      console.log(this.state.bucketlistArray);
      //   window.location.reload();
      this.getBucketList();
    });
  };

  componentDidMount() {
    this.getBucketList();
  }
  render() {
    const {
      username,
      bucketlistArray,
      activeUser,
      bucketListTodos,
      startDate,
      endDate,
      address,
      bucketlist
    } = this.state;
    const AddressInputProps = {
      value: this.state.address,
      onChange: this.inputChange
    };

    const addressCSSClasses = {
      root: "form-group",
      input: "search-input",
      autocompleteContainer: "autocomplete-container"
    };

    console.log("im trying to get the bucketlist Array");
    console.log(bucketlistArray, activeUser, username);
    console.log(this.state);

    if (activeUser && bucketlistArray) {
      return (
        <div className="main div">
          <div>
            {bucketlistArray.map(list => (
              <div>
                <h3>
                  Wish Destination:
                  {list.destination}{" "}
                </h3>

             <br/>
                <h3> Planned Activities: {list.todos}</h3>

                {activeUser ? (
                  <button
                    onClick={e =>
                      this.handleDeleteBucket(e, list.id, list.username)
                    }
                  >
                    Delete Bucketlist
                  </button>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>

          <div>
            Destination:{" "}
            <PlacesAutocomplete
              classNames={addressCSSClasses}
              inputProps={AddressInputProps}
            />
            <br />
      
            <div className="bucketListTodos">
              Planned Activites:
              <input
                type="text"
                placeholder="todos"
                name="bucketListTodos"
                value={bucketListTodos}
                onChange={this.handleInput}
              />
            </div>
            <br />
            {startDate && endDate && address ? (
              <input
                className="companionBtn"
                type="submit"
                value="Add to my bucket list"
                onClick={this.addToBucketList}
              />
            ) : (
              <input
                className="companionBtn"
                type="submit"
                value="Add  to my bucket list!"
                onClick={this.addToBucketList}
                disabled
              />
            )}
          </div>
        </div>
      );
    } else if (activeUser) {
      return (
        <div>
          <h2> hiihihiihhhi</h2>
          Destination:{" "}
          <PlacesAutocomplete
            classNames={addressCSSClasses}
            inputProps={AddressInputProps}
          />
          <br />
 
          <div className="bucketListTodos">
            Planned Activites:
            <input
              type="text"
              placeholder="todos"
              name="bucketListTodos"
              value={bucketListTodos}
              onChange={this.handleInput}
            />
          </div>
          <br />
          {address ? (
            <input
              className="companionBtn"
              type="submit"
              value="Add to my bucket list"
              onClick={this.addToBucketList}
            />
          ) : (
            <input
              className="companionBtn"
              type="submit"
              value="Add  to my bucket list!"
              onClick={this.addToBucketList}
              disabled
            />
          )}
        </div>
      );
    } else if (bucketlistArray[0]) {
      return (
        <div className="main div">
          <div>
            {bucketlistArray.map(list => (
              <div>
                <h3>
                  Wish Destination:
                  {list.destination}{" "}
                </h3>

            <br/>

                <h3> Planned Activities: {list.todos}</h3>

                {activeUser ? (
                  <button
                    onClick={e =>
                      this.handleDeleteBucket(e, list.id, list.username)
                    }
                  >
                    Delete Bucketlist
                  </button>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return <div> </div>;
    }
  }
}

export default BucketList;
