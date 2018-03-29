import React, { Component } from "react";
import axios from "axios";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import AllBuddies from "./AllBuddies";

class UserProfileCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flagged: false
    };
  }

  flagUser = username => {
    const { allUsers, bffs, user, flagged } = this.props;

    //  e.preventDefault()
    //   console.log(`testing`);

    // this.setState({ flagged: !this.state.flagged });
    
    this.state.flagged = true
 
    // if(flagged) {
    //   this.setState(prevState => ({
    //     flagged: !prevState.flagged
    //   }))
    // }
  console.log(
      "You (",
      username,
      ") were flagged: (",
      this.state.flagged,
      ") by : ",
      user.username
    ); 
   
  };

  render() {
    const { allUsers, bffs, user, username } = this.props;
    const { flagged } = this.state;
     
    
    return (
      <div className="cardHolder">
        {allUsers.map(user => (
          <div className="card">
            <br />
            <img
              className="pic"
              src={user.pic}
              alt="profile picture"
              height="230"
              width="260"
            />
            <div className="BtnStrip">
              <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
              />
              <button
                onClick={() => this.flagUser(user.username)}
                className={flagged ?  "redflagBtn": "flagBtn" }
                // value={user.username}
              >
                <i class="fas fa-flag" />
              </button>{" "}
              <button className="heartBtn">
                <i class="fas fa-heart" />
              </button>{" "}
              <button className="msgBtn">
                <i class="fas fa-envelope" />
              </button>
            </div>
            <div className="userName">
              {" "}
              Username:{" "}
              <Link to={`/users/u/${user.username}/profile`}>
                {user.username}
              </Link>{" "}
            </div>
            <div className="firstName"> First Name: {user.first_name} </div>

            <div className="age"> Age: {user.age}</div>

            <div className="location"> Location: {user.my_location}</div>
            {!bffs ? (
              <div>
                <div className="destination">
                  Destination: {user.destination}{" "}
                </div>
                <div className="startDate">
                  Trip start date: {user.start_date}
                </div>
                <div className="endDate"> Trip end date: {user.end_date}</div>
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default UserProfileCards;
