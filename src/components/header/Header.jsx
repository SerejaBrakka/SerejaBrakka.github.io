import React from "react";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
class Header extends React.Component {
  // навигация по приложению
  render() {
    return (
      <div className={classes.header}>
        <Link to="/home">Home</Link>
        <Link to="/about"> About</Link>
        <Link to="/resources">Resources</Link>
      </div>
    );
  }
}

export default Header;
