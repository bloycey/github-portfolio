import React, { Component } from "react";

class Profile extends React.Component {
  state = {
    userData: false,
    rateLimit: "",
    repos: ""
  };

  getUserInfo = async username => {
    console.log("username sent from react " + username);
    const response = await fetch(`/api/getUserProfile/?username=${username}`);
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body.response;
  };

  getUserRepos = async username => {
    console.log("username sent from react " + username);
    const response = await fetch(`/api/getUserRepos/?username=${username}`);
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
      this.getUserInfo(username)
        .then(res => {
          this.setState({
            userData: res
          });
          this.getUserRepos(username)
            .then(res => {
              this.setState(
                {
                  repos: res
                },
                () => {
                  this.state.repos.forEach(repo => {
                    const name = repo.name;
                    console.log(name);
                    // Function to build tags list goes here https://developer.github.com/v3/repos/#list-all-topics-for-a-repository
                    // https://stackoverflow.com/questions/29775797/fetch-post-json-data
                  });
                }
              );
              this.getRateLimit()
                .then(res => {
                  this.setState({
                    rateLimit: res
                  });
                })
                .catch(err => console.log(err));
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
