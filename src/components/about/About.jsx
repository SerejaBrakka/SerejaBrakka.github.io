import React from "react";
import classes from "./About.module.css";
class About extends React.Component {
  render() {
    return (
      <div className={classes.about}>
        <h1>About page here!</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, modi!
        </p>
      </div>
    );
  }
}

export default About;
