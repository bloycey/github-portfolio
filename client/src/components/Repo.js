import React, { Component } from "react";
import { Button } from "reactstrap";
import "../App.css";

class Repo extends React.Component {
  state = {};

  render() {
    return (
      <div className="single-repo-wrapper">
        <h2 className="repo-title">Example</h2>
        <hr />
        <div className="repo-description">
          A modern, material design inspired Neto theme.
        </div>
        <hr className="small-divider" />
        <div className="language">
          Main Language: <span>HTML</span>
        </div>
        <div className="tags pb-2">
          <p className="mb-0">Tags:</p>
          <p>Tag, tag, tag</p>
        </div>
        <Button outline className="view-repo-btn">
          View Portfolio
        </Button>
      </div>
    );
  }
}

export default Repo;
