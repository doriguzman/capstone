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
            <img className="pic" src={user.pic} alt="profile picture" />
            <div className="name-age"> {user.first_name}, {user.age}, {user.my_location}</div>
            {/* <div className="location">{user.my_location}</div> */}
            <div className="userName">
              <Link to={`/users/u/${user.username}/profile`}>
                @{user.username}
              </Link>
            </div>
            <div>
              <Link to={`/users/messages/${user.username}`}>
                <i class="far fa-envelope fa-1x" />
              </Link>
            </div>
            {!bffs ? (
              <div>
                {user.destination ?
                <div className="destination">
                  Destination: {user.destination}{" "}
                </div> : ''}
                
                 {user.start_date ? <div className="startDate">Trip start date: {dateFormat (user.start_date, "ddd, mmm, dS, yyyy")}</div> :''}
                 
               {user.end_date ? <div className="endDate"> Trip end date: {dateFormat (user.end_date, "ddd, mmm, dS, yyyy")}</div> :''}
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
