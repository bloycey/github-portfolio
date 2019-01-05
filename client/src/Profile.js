import React, { Component } from "react";

class Profile extends React.Component {
  state = {};

  render() {
    return (
      <article>
        <h2>{this.props.match.params.user}</h2>
      </article>
    );
  }
}

export default Profile;
