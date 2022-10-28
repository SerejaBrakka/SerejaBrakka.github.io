import React from "react";
import { Route, Routes } from "react-router-dom";
import classes from "./App.module.css";
import About from "../about/About";
import Header from "../header/Header";
import Home from "../home/Home";
import Resources from "../resources/Resources";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      someSites: [],
    };
  }
  // с базы берется сайт и отрисовывается в home.jsx при нажатии на кнопку pwned?
  componentDidMount() {
    fetch("https://haveibeenpwned.com/api/v2/breach/DominosIndia")
      .then((res) => res.json())
      .then((res) => this.setState({ someSites: res }));
  }
  // роутинг
  render() {
    return (
      <div className="App">
        <Header />
        <div className={classes.context}>
          <Routes>
            <Route path="/resources" element={<Resources />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route
              path="/home"
              element={<Home someSites={this.state.someSites} />}
            ></Route>
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
