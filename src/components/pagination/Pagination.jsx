import React from "react";
import classes from "./Pagination.module.css";
class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumbers: [],
    };
  }
  componentWillMount() {
    for (let i = 1; i <= 64; i++) {
      console.log(i);
      this.state.pageNumbers.push(i);
    }
  }
  render() {
    return (
      <div style={{ maxWidth: "100vw", margin: "15px" }}>
        {this.state.pageNumbers.map((number, i) => (
          <button
            key={i}
            className={classes.pagelink}
            onClick={() => {
              this.props.paginate(number);
            }}
          >
            {number}
          </button>
        ))}
      </div>
    );
  }
}

export default Pagination;
