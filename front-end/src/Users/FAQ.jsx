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
          <Panel header="How do I create a Feathers Profile?">
            Go to the register page and fill-out the form. Add an upcoming trip.
            Fill-out the travel partner preference form.
          </Panel>
          <Panel header="Is it free to join feathers?">
            Yes. You can use our website free of charge.
          </Panel>
          <Panel header="How do I communicate with another member?">
            Messaging is available. You can click on a profile and message
            another member if you have the permission.
          </Panel>
          <Panel header="How do you add a trip?">
            Go to your profile, click on the Trips tab.  There you will find the Add a Trip button.
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default FAQ;
