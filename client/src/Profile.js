import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format, compareDesc, compareAsc } from "date-fns";
import Repo from "./components/Repo";
import AllRepos from "./components/views/AllRepos";
import TagsView from "./components/views/TagsView";
import LanguageView from "./components/views/LanguageView";
import InfoView from "./components/views/InfoView";

import {
  faListAlt,
  faHashtag,
  faCode,
  faChartPie,
  faSpinner,
  faUser,
  faExternalLinkAlt
} from "@fortawesome/free-solid-svg-icons";

class Profile extends React.Component {
  state = {
    userData: false,
    view: "all",
    rateLimit: "",
    numRepos: "",
    repos: "",
    reposArray: [],
    tags: "",
    tagsApplied: false,
    reposFetched: false,
    badUser: false
  };

  changeView = view => {
    this.setState({
      view: view
    });
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

    if (!this.state.userData) {
      this.getUserInfo(username)
        .then(res => {
          if (res.message !== undefined) {
            if (res.message === "Not Found") {
              this.setState({
                badUser: true
              });
              return false;
            }
          }
          this.setState({
            userData: res,
            numRepos: res.public_repos
          });
          this.getUserRepos(username)
            .then(res => {
              let repoList = {};
              let reposArray = [];
              res.forEach(repo => {
                const repoName = repo.name;
                repoList[repoName] = repo;
                let newItem = repo;
                newItem.sortDate = format(repo.pushed_at, "x");
                reposArray.push(newItem);
              });
              this.setState(
                {
                  repos: repoList,
                  reposArray: reposArray,
                  reposFetched: true
                },
                () => {
                  let topicsList = new Set();
                  const setTags = Object.keys(this.state.repos).map(
                    async key => {
                      console.log("setting tags for " + key);
                      const name = key;
                      let currentRepos = this.state.repos;
                      this.getRepoTags(username, name)
                        .then(res => {
                          currentRepos[name].tags = res;
                          res.names.map(topic => {
                            topicsList.add(topic);
                          });
                          this.setState({
                            repos: currentRepos,
                            tags: topicsList
                          });
                        })
                        .catch(err => console.log(err));
                    }
                  );
                  Promise.all(setTags).then(completed => {
                    console.log("all tags applied!");
                    this.setState({
                      // tagsApplied: true
                    });
                  });
                  this.getRateLimit()
                    .then(res => {
                      this.setState({
                        rateLimit: res,
                        tagsApplied: true
                      });
                    })
                    .catch(err => console.log(err));
                }
              );
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    const repos = this.state.repos;
    const reposArray = this.state.reposArray;
    const username = this.props.match.params.user;

    if (this.state.badUser === true) {
      return <p>Username doesn't exist</p>;
    } else {
      return (
        <div className="profile-wrapper">
          <Container className="narrow-container">
            <Row className="profile-header-outer-wrapper row-padded">
              <Col md={{ size: 10, offset: 1 }}>
                <Row className="profile-header-row">
                  <Col
                    xs="3"
                    md="5"
                    lg="3"
                    className="profile-header-img-wrapper d-none d-md-block"
                  >
                    <img
                      src={this.state.userData.avatar_url}
                      className="img-fluid"
                    />
                  </Col>
                  <Col xs="12" md="7" lg="9" className="profile-header-text">
                    {!this.state.tagsApplied && (
                      <FontAwesomeIcon
                        className="loading-spinner"
                        icon={faSpinner}
                        spin
                      />
                    )}
                    <h1 className="uppercase">{this.state.userData.name}</h1>
                    <h2 className="font-light">{username}</h2>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="row-padded">
              <Col
                md={{ size: 10, offset: 1 }}
                className="no-padding-left-right"
              >
                <div className="description">
                  {this.state.userData.bio || null}
                </div>
              </Col>
            </Row>
            <Row className="row-padded">
              <Col
                md={{ size: 10, offset: 1 }}
                className="no-padding-left-right"
              >
                <div className="filter-controls">
                  <Button
                    className={
                      this.state.view == "all"
                        ? "filter-btn selected"
                        : "filter-btn"
                    }
                    onClick={() => this.changeView("all")}
                    disabled={this.state.reposFetched ? false : true}
                  >
                    <FontAwesomeIcon icon={faListAlt} /> All Repos
                  </Button>
                  <Button
                    className={
                      this.state.view == "language"
                        ? "filter-btn selected"
                        : "filter-btn"
                    }
                    onClick={() => this.changeView("language")}
                    disabled={this.state.reposFetched ? false : true}
                  >
                    <FontAwesomeIcon icon={faCode} />
                    Sort by Language
                  </Button>
                  <Button
                    className={
                      this.state.view == "tags"
                        ? "filter-btn selected"
                        : "filter-btn"
                    }
                    onClick={() => this.changeView("tags")}
                    disabled={this.state.tagsApplied ? false : true}
                  >
                    <FontAwesomeIcon icon={faHashtag} /> Sort by Tag
                  </Button>
                  <Button
                    className={
                      this.state.view == "info"
                        ? "filter-btn selected"
                        : "filter-btn"
                    }
                    onClick={() => this.changeView("info")}
                    disabled={this.state.reposFetched ? false : true}
                  >
                    <FontAwesomeIcon icon={faUser} />
                    About
                  </Button>
                </div>
              </Col>
            </Row>
            <Row className="row-padded">
              <Col
                md={{ size: 10, offset: 1 }}
                className="no-padding-left-right"
              >
                {this.state.view === "all" &&
                  this.state.reposArray &&
                  this.state.userData.public_repos !== 0 && (
                    <AllRepos reposArray={this.state.reposArray} />
                  )}

                {this.state.view === "tags" &&
                  this.state.reposArray &&
                  this.state.tagsApplied &&
                  this.state.userData.public_repos !== 0 && (
                    <TagsView
                      reposArray={this.state.reposArray}
                      tagsApplied={this.state.tagsApplied}
                      tags={this.state.tags}
                    />
                  )}

                {this.state.view === "language" &&
                  this.state.reposArray &&
                  this.state.userData.public_repos !== 0 && (
                    <LanguageView reposArray={this.state.reposArray} />
                  )}

                {this.state.view === "info" && this.state.reposArray && (
                  <InfoView userData={this.state.userData} />
                )}

                {this.state.userData.public_repos === 0 &&
                  this.state.view !== "info" && (
                    <p>This user has no public repos to display.</p>
                  )}
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
  }
}

export default Profile;
