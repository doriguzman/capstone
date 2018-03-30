import React, { Component } from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const places = [
    "see the ruins of Machu Picchu in Peru",
    "climb to the peaks of Mount Everest",
    "relax on a sandy beach in Greece",
    "test the waters of the Pacific in Southern California",
    "taste all the cheeses Wisconsin has to offer",
    "get your skin scrubbed baby-soft at a spa in South Korea",
    "party like it's 1999 in Berlin",
    "go whale watching in Seattle",
    "go for a long walk on the Great Wall in China",
    "see the pyramids up close in Egypt",
    "adopt a pet spider from Australia",
    "discover Hobbiton in New Zealand",
    "find out if dragons are real in Gaztelugatxe"
  ];
  const randomPlace = arr => arr[Math.floor(Math.random() * arr.length)];

  return (
    <div className="info">
      <div>
        <div className="about-us-header-div"> Who You Are </div>
        <div>
          <p className="about-us-p">
            You're an independent woman just dying to {randomPlace(places)}, but
            your girlfriends are all busy or broke.
            <br />
            Or maybe you're a cautious woman, and would prefer not to travel
            alone to avoid some potentially dangerous situations.
            <br />
            Well, you're not alone.
          </p>
        </div>
        <div className="about-us-header-div"> Who We Are </div>
        <div>
          <p className="about-us-p">
            At feathers, we aim to connect solo female travellers with others
            just like them. <br />
            We'll match you with other women based on a variety of things
            including:<br />
            <span className="features">Destination</span>
            <br />
            <span className="features">Trip dates</span>
            <br />
            <span className="features">Compatibility</span>
            <br />
          </p>
          <p className="about-us-p">
            Message, favorite, or simply browse through other members' profiles,
            trips, or send them a message to start discussing your next trip.
          </p>
          <p className="about-us-p">

            Are you ready for your next adventure?
            <Link to="/users/register">Join Us Now!</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
