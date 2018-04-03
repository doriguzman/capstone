import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../Stylesheets/disclaimer-and-FAQ.css";

const Disclaimer = () => {
  return (
    <div className="disclaimer-div">
      <h2>Disclaimer:</h2>
      <p>
        Anyone that identifies as a woman is welcome to register and become a
        member. You must be 18 years of age or older to use feathers.com.
      </p>

      <p>
        All members are expected to complete their profile and upload a photo.
        Once you have connected with another member and agreed upon a trip,
        exchange contact info via our in-app messaging to wrap up your final
        plans. 
      </p>

      <p>
        We strongly recommend our members to set-up a video call prior to
        meeting with other members. Practice a common sense approach when
        meeting up with anyone you meet online for the first time.
      </p>
    </div>
  );
};

export default Disclaimer;
