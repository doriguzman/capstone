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
import "../Stylesheets/BucketList.css";

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
        this.setState({
          address: "",
          bucketListTodos: ""
        });

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

    ///////------ starting the return ---------//////////

    if (activeUser && bucketlistArray[0]) {
      return (
        <div className="mainDiv">
          <h3 className="header">
            Hover over each circle to see planned activities!{" "}
          </h3>
          <div className="bucketlist-Container">
            {bucketlistArray.map(list => (
              <div className="bucketlist-Item">
                <div className="bucketlist-Item-Destination">
                  <h4>{list.destination} </h4>
                  {activeUser ? (
                    <button
                      className="delete-Bucketlist-Button"
                      onClick={e =>
                        this.handleDeleteBucket(e, list.id, list.username)
                      }
                    >
                      <img
                        className="trash-Icon"
                        src="https://cdn1.iconfinder.com/data/icons/hawcons/32/699013-icon-27-trash-can-128.png"
                      />
                    </button>
                  ) : (
                    ""
                  )}
                </div>

                {list.todos ? (
                  <div className="bucketlist-Item-Planned">
                    <h3>
                      {/* brings back an array of split values, now get them in a sentence  */}
                      {list.todos.split()}
                    </h3>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
          <br />
          <div className="add-Bucketlist-Div">
            Destination
            <PlacesAutocomplete
              classNames={addressCSSClasses}
              inputProps={AddressInputProps}
            />
            <br />
            <div className="bucketlist-Todos">
              Planned Activites <span>(separate with commas)</span>
              <br />
              <input
                className="bucketlist-Todos-Input"
                type="text"
                name="bucketListTodos"
                value={bucketListTodos}
                onChange={this.handleInput}
              />
            </div>
            <br />
            {address ? (
              <input
                className="add-Bucketlist-Button"
                type="submit"
                value="Add to my bucket list"
                onClick={this.addToBucketList}
              />
            ) : (
              <input
                className="add-Bucketlist-Button"
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
        <div className="add-Bucketlist-Div">
          Destination:{" "}
          <PlacesAutocomplete
            classNames={addressCSSClasses}
            inputProps={AddressInputProps}
          />
          <br />
          <div className="bucketlist-Todos">
            Planned Activites:
            <br />
            <input
              className="bucketlist-Todos-Input"
              type="text"
              name="bucketListTodos"
              value={bucketListTodos}
              onChange={this.handleInput}
            />
          </div>
          <br />
          {address ? (
            <input
              className="add-Bucketlist-Button"
              type="submit"
              value="Add to my bucket list"
              onClick={this.addToBucketList}
            />
          ) : (
            <input
              className="add-Bucketlist-Button"
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
        <div className="mainDiv">
          <h3 className="header">
            {" "}
            Hover over the bucklists to see planned activities!{" "}
          </h3>
          <div className="bucketlist-Container">
            {bucketlistArray.map(list => (
              <div className="bucketlist-Item">
                <div className="bucketlist-Item-Destination">
                  <h4>{list.destination} </h4>
                </div>

                {list.todos ? (
                  <div className="bucketlist-Item-Planned">
                    <h3>
                      {/* brings back an array of split values, now get them in a sentence  */}
                      {list.todos.split()}
                    </h3>
                  </div>
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
