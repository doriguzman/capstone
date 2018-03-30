import React, { Component } from "react";
import axios from "axios";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import dateFormat from "dateformat";
import AllBuddies from "./AllBuddies";


const UserProfileCards = ({ allUsers, bffs }) => {
  return (
    <div className="cardHolder">

      {allUsers.map(user => {
        return (
          <div className="card">
            <br />
            <img
              className="pic"
              src={user.pic}
              alt="profile picture"
              height="230"
              width="260"
            />

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
            <div>
              <Link to={`/users/messages/${user.username}`}>Message</Link>

            </div>
            {!bffs ? (
              <div>
                <div className="destination">
                  Destination: {user.destination}{" "}
                </div>
                <div className="startDate">
                  Trip start date: {dateFormat (user.start_date, "ddd, mmm, dS, yyyy")} 
                 
                </div>
                <div className="endDate"> Trip end date: {dateFormat (user.end_date, "ddd, mmm, dS, yyyy")}</div>
              </div>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
};

export default UserProfileCards;
