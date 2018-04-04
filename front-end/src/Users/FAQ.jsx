import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../Stylesheets/disclaimer-and-FAQ.css";
import "rc-collapse/assets/index.css";
// import 'string.prototype.repeat';
import Collapse, { Panel } from "rc-collapse";

const FAQ = () => {
  return (
    <div className="faq">
      <h2>Feathers Basic Questions</h2>
      <div>
        <Collapse>
          <Panel header="Is it free to join feathers?">
            Yes. You can use our website free of charge.
          </Panel>
          <Panel header="How do I create a Feathers Profile?">
            Go to the register page and fill-out the form. You can add an
            upcoming trip if you have one from your profile page. Fill-out the
            travel partner preference form.
          </Panel>
          <Panel header="How do I edit my profile?">
            Click on your profile. On the About tab, you will find an icon with
            a pencil. When you click on this it will take you to the edit
            profile page where you can change your photo, first name, age, bio,
            attributes, etc.
          </Panel>
          <Panel header="How do I add a trip?">
            Go to your profile, click on the Trips tab. There you will find the
            Add a Trip button.
          </Panel>
          <Panel header="How do I delete a trip?">
            When you go on the Trips tab, for every trip that you have added you
            will see a delete button.
          </Panel>
          <Panel header="How am I matched with other members?">
            You get matched by trip destination, trip dates, location and
            attributes.
          </Panel>
          <Panel header="How do I communicate with another member?">
            Messaging is available. You can click on a profile and message
            another member if you have the permission.
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default FAQ;
