import React, { Component } from "react";
import { Button } from "reactstrap";
import "../App.css";

class User extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <img
          src={this.props.avatar}
          alt={this.props.username}
          className="img-fluid"
        />
        <h2 className="user-title">{this.props.username}</h2>
        <Button outline color="success" className="view-profile-btn">
          View Portfolio
        </Button>
      </div>
    );
  }
}

export default User;
