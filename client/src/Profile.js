import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

class Profile extends React.Component {
  state = {
    userData: false,
    rateLimit: "",
    repos: "",
    tags: ""
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

  getRepoTags = async (username, repo) => {
    console.log("username sent from react " + username);
    const response = await fetch(
      `/api/getRepoTags/?username=${username}&repo=${repo}`
    );
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

    // if (!this.state.userData) {
    //   this.getUserInfo(username)
    //     .then(res => {
    //       this.setState({
    //         userData: res
    //       });
    //       this.getUserRepos(username)
    //         .then(res => {
    //           let repoList = {};
    //           res.forEach(repo => {
    //             const repoName = repo.name;
    //             repoList[repoName] = repo;
    //           });
    //           this.setState(
    //             {
    //               repos: repoList
    //             },
    //             () => {
    //               let topicsList = new Set();
    //               Object.keys(this.state.repos).map(key => {
    //                 const name = key;
    //                 let currentRepos = this.state.repos;
    //                 this.getRepoTags(username, name)
    //                   .then(res => {
    //                     res.names.map(topic => {
    //                       topicsList.add(topic);
    //                     });
    //                     this.setState({
    //                       tags: topicsList
    //                     });
    //                   })
    //                   .catch(err => console.log(err));
    //               });
    //               this.getRateLimit()
    //                 .then(res => {
    //                   this.setState({
    //                     rateLimit: res
    //                   }, () => {
    //                     this.setState({
    //                       userData: true
    //                     })
    //                   });
    //                 })
    //                 .catch(err => console.log(err));
    //             }
    //           );
    //         })
    //         .catch(err => console.log(err));
    //     })
    //     .catch(err => console.log(err));
    // }
  }

  render() {
    return (
      <div className="profile-wrapper">
        <Container class="narrow-container">
          <Row className="profile-header-outer-wrapper">
            <Col md={{size: 8, offset: 2}}>
              <Row className="profile-header-row">
                  <Col xs="3" className="profile-header-img-wrapper">
                    <img src="https://via.placeholder.com/300" className="img-fluid"/>
                  </Col>
                  <Col xs="9" className="profile-header-text">TEXT HERE</Col>
              </Row>
            </Col>
          </Row>
          <div className="profile-header">
            
          </div>
          {/* <article>
            <h2>{this.props.match.params.user}</h2>
          </article> */}
        </Container>
        
      </div>
      
    );
  }
}

export default Profile;
