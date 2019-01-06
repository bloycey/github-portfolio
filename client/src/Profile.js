import React, { Component } from "react";

class Profile extends React.Component {
  state = {
    userData: false,
    rateLimit: ""
  };

  getInfo = async username => {
    console.log("username sent from react " + username);
    const response = await fetch(`/api/getUserProfile/?username=${username}`);
    const body = await response.json();
    console.log(body);
    this.setState({
      userData: body.response
    });
    this.getRateLimit();
  };

  getRateLimit = async () => {
    const response = await fetch(`/api/getRateLimit`);
    const body = await response.json();
    console.log(body);
    this.setState({
      rateLimit: body.response
    });
  };

  componentDidMount() {
    const username = this.props.match.params.user;

    if (!this.state.userData) {
      this.getInfo(this.props.match.params.user);
    }
  }

  render() {
    return (
      <article>
        <h2>{this.props.match.params.user}</h2>
      </article>
    );
  }
}

export default Profile;
