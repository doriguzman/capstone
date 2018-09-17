import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../Stylesheets/disclaimer-and-FAQ.css";
import "rc-collapse/assets/index.css";
// import 'string.prototype.repeat';
import Collapse, { Panel } from "rc-collapse";

const FAQ = () => {
  return (
    <div className="faq">
      <h2>Frequently Asked Questions</h2>
      <div>
        <Collapse>
          <Panel header="Is it free to join feathers?">
            Yes. You can use our website free of charge.
          </Panel>
          <Panel header="How do I create a Feathers Profile?">
            Go to the register page and fill out the form. You can add an
            upcoming trip if you have one from your profile page. Fill out the
            travel partner preference form.
          </Panel>
          <Panel header="How do I edit my profile?">
            Click on your profile. In the About tab, you will find an icon with
            a pencil. When you click on this, it will take you to the edit
            profile pag. There, you can change your personal information and define
            what you are like on vacation.
          </Panel>
          <Panel header="How do I add a trip?">
            Go to your profile and click on the Current Trips tab. There, you will find the
            Add a Trip button.
          </Panel>
          <Panel header="How do I delete a trip?">
            Go to your profile and click on the Current Trips tab.
            For every trip that you have added, you will see a corresponding delete button.
          </Panel>
          <Panel header="How am I matched with other members?">
            You are matched with other members based on trip destination, overlapping trip dates, 
            and the preferences that you specified for a travel buddy.
          </Panel>
          <Panel header="How do I communicate with another member?">
            In your homepage and for each individual member, there is a <i class="far fa-envelope fa-1x" /> icon.
            Clicking on this icon will bring you to your message thread with that member!<br />
            As a reminder, we encourage all <span className="dancing">feathers</span> members to 
            live video chat or connect on social media with someone 
            you're interested in traveling with prior to meeting up in real life.
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default FAQ;
