import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../Stylesheets/before.css"

const BeforeYouFloat = () => {
  return (
    <div>
      <h2>Before you meet up with your travel partner </h2>
      
      <div className="before-content">
        <p className="before-p">
          <span className="dancing">feathers</span> is designed for members to initiate contact with each
          other. Please exercise caution and common sense when communicating and
          meeting with a travel partner.{" "}
        </p>
        <span className="before-traveling">What we recommend for a member before traveling together:</span>
        <ul className="before-ul">
          <li>
            When you are filling out the form, do your best to fill it out
            completely so that we can get the best match for you.
          </li>
          <li>
            If you have an upcoming trip, make sure you provide enough details
            to avoid incompatible proposals.{" "}
          </li>
          <li>Make sure to video call the other member before scheduling a meet-up.</li>
          <li>
            Your first meeting should be in a well-lit, safe, public place during the day.
          </li>
          <li>
            Always bring your cellphone with you and make sure a friend or family
            knows you are meeting with this person.
          </li>
        </ul>
      </div>

    </div>
  );
};

export default BeforeYouFloat;
