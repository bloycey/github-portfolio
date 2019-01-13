import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Repo from "./components/Repo";
import {
  faListAlt,
  faHashtag,
  faCode,
  faChartPie
} from "@fortawesome/free-solid-svg-icons";

class Profile extends React.Component {
  state = {
    userData: false,
    view: "all",
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
          <Row className="profile-header-outer-wrapper row-padded">
            <Col md={{ size: 10, offset: 1 }}>
              <Row className="profile-header-row">
                <Col xs="3" className="profile-header-img-wrapper">
                  <img
                    src="https://via.placeholder.com/300"
                    className="img-fluid"
                  />
                </Col>
                <Col xs="9" className="profile-header-text">
                  <h1 className="uppercase">Andrew Bloyce</h1>
                  <h2 className="font-light">bloycey</h2>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="row-padded">
            <Col md={{ size: 10, offset: 1 }} className="no-padding-left-right">
              <div className="description">
                Front End Developer at @NetoECommerce
              </div>
            </Col>
          </Row>
          <Row className="row-padded">
            <Col md={{ size: 10, offset: 1 }} className="no-padding-left-right">
              <div className="filter-controls">
                <Button className="filter-btn selected">
                  <FontAwesomeIcon icon={faListAlt} /> All Repos
                </Button>
                <Button className="filter-btn">
                  <FontAwesomeIcon icon={faHashtag} /> Sort by Tag
                </Button>
                <Button className="filter-btn">
                  <FontAwesomeIcon icon={faCode} />
                  Sort by Language
                </Button>
                <Button className="filter-btn">
                  <FontAwesomeIcon icon={faChartPie} />
                  Statistics
                </Button>
              </div>
            </Col>
          </Row>
          <Row className="row-padded">
            <Col md={{ size: 10, offset: 1 }} className="no-padding-left-right">
              <div className="repos-wrapper">
                <Repo />
                <Repo />
                <Repo />
                <Repo />
                <Repo />
                <Repo />
              </div>
            </Col>
          </Row>
          {/* <article>
            <h2>{this.props.match.params.user}</h2>
          </article> */}
        </Container>
      </div>
    );
  }
}

export default Profile;
