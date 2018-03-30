import React, { Component } from "react";
import { Link } from "react-router-dom";

const BeforeYouFloat = () => {
  return (
    <div>
      <h3> Before you meet-up with your travel partner </h3>
      <p>
        Feathers website is designed for members to initiate contact with each
        other. Please exercise caution and common sense when communicating and
        meeting with a travel partner.{" "}
      </p>
      <ul>
        {" "}
        What we recommend for a feathers member before drifting together:
        <li>
          When you are filling-up the form, do your best to fill it out
          completely so we can get the best match for you.
        </li>
        <li>
          If you do have an upcoming trip, make sure you provide enough details
          to avoid incompatible proposals.{" "}
        </li>
        <li>Make sure to do a video call before scheduling a meet-up.</li>
        <li>
          Your first meeting should be in a well-lit, safe, public place and is
          during the day.
        </li>
        <li>
          Always bring your cellphone with you and make sure a friend or family
          knows you are meeting with this person.
        </li>
      </ul>
      <p>Be smart - be a careful feather.</p>
    </div>
  );
};

export default BeforeYouFloat;
