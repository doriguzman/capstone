import React, { Component } from "react";
import axios from "axios";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import dateFormat from "dateformat";
import AllBuddies from "./AllBuddies";


const UserProfileCards = ({ allUsers, bffs }) => {
  console.log('in profile cards ', allUsers.map(user=> {
    return ('user first name' , user.first_name , user.age)}))
  
  
  return (
    <div className="cardHolder">
    

      {allUsers.map(user => {
        console.log('allUsers' , allUsers)
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
                {user.destination ?
                <div className="destination">
                  Destination: {user.destination}{" "}
                </div> :''}
                
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
