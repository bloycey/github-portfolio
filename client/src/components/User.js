import React, { Component } from "react";

class User extends React.Component {
  state = {};

  render() {
    return (
      <article>
        <h2>{this.props.username}</h2>
      </article>
    );
  }
}

export default User;
