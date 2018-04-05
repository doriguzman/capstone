import React, { Component } from "react";
import axios from "axios";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import dateFormat from "dateformat";
import AllBuddies from "./AllBuddies";

const UserProfileCards = ({ allUsers, bffs }) => {
  allUsers.map(user => {
    return "user first name", user.first_name, user.age;
  });

  return (
    <div className="cardHolder">
      {allUsers.map(user => {
        return <div className="card">
            <Link to={`/users/u/${user.username}/profile`}>
              <img className="pic" src={user.pic} alt="profile picture" />
            </Link>

            <div className="card-content">
              <div className="card-general">
                <div className="name-age">
                  <span className="blue">{user.first_name}</span>, {user.age}, <Link
                    to={`/users/u/${user.username}/profile`}
                  >
                    @{user.username}
                  </Link>
                </div>

                <div className="card-location">{user.my_location}</div>

                <div className="match-percent">
                  {user.points ? <div> {user.points}% matched </div> : ""}
                </div>

                <div>
                  <Link to={`/users/messages/${user.username}`}>
                    <i class="far fa-envelope fa-1x" />
                  </Link>
                </div>
              </div>
<<<<<<< HEAD
            ) : (
              ""
            )}
            <div >
              <Link to={`/users/messages/${user.username}`}>Message Me</Link>
            </div>
          </div>
        );
=======

              <div className="card-trips">
                
                  <div>
                  <div className="upcoming-trips">Upcoming Trips</div>
                    {user.destination ? 
                      <div className="card-destination">
                        {user.destination}
                      </div> : ""}

                    {user.start_date ? 
                      <div className="card-trip-date">
                        Departing:{" "}
                        {dateFormat(
                          user.start_date,
                          "ddd, mmm, dS, yyyy"
                        )}
                      </div> : ""}

                    {user.end_date ? 
                      <div className="card-trip-date">
                        Returning:{" "}
                        {dateFormat(
                          user.end_date,
                          "ddd, mmm, dS, yyyy"
                        )}
                      </div> : ""} 
                  </div>
              </div>
            </div>
          </div>;
>>>>>>> b88a1d76701edfe975262e9f846eac2fa0930f09
      })}
    </div>
  );
};

export default UserProfileCards;
