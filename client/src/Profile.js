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
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body.response;
  };

  getRateLimit = async () => {
    const response = await fetch(`/api/getRateLimit`);
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body.response;
  };

  componentDidMount() {
    const username = this.props.match.params.user;

    if (!this.state.userData) {
      this.getInfo(username)
        .then(res => {
          this.setState({
            userData: res
          });
          this.getRateLimit()
            .then(res => {
              this.setState({
                rateLimit: res
              });
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
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
