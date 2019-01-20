import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import User from "./components/User";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import { Container } from "reactstrap";
import "./App.css";
import exampleUser from "./img/example2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointRight } from "@fortawesome/free-solid-svg-icons";

class App extends Component {
  state = {
    response: "",
    post: "",
    responseToPost: "",
    userSearch: "",
    userResponse: "",
    githubName: "",
    rateLimit: ""
  };

  static propTypes = {
    history: PropTypes.object
  };

  componentDidMount() {}

  // getRateLimit = async () => {
  //   const response = await fetch(`/api/getRateLimit`);
  //   const body = await response.json();
  //   if (response.status !== 200) throw Error(body.message);
  //   return body.response;
  // };

  // handleSearch = async event => {
  //   console.log("username sent from react");
  //   const response = await fetch("/api/getUsers", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({ githubName: this.state.githubName })
  //   });
  //   const body = await response.json();
  //   if (response.status !== 200) throw Error(body.message);
  //   return body.response;
  // };

  goToProfile = user => {
    console.log("go to profile triggered");
    this.props.history.push(`/users/${user}`);
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="App-header">
            <ul className="header-menu-items">
              <li>How to Use</li>
              <li>About Developer</li>
            </ul>
            <Container>
              <div className="hero-text-wrapper">
                <h1>
                  Github
                  <br />
                  <span>Portfolio</span>
                </h1>
              </div>
              <div className="hero-text-wrapper info d-none">
                <p>
                  A project inspired by a single missing feature in GitHub:{" "}
                  <em>Folders.</em>
                </p>
                <p>
                  <strong>Github Portfolio</strong> allows you to categorise
                  your repos using a simple tag system. Group your finished
                  projects together, your sandbox projects together, and more.
                </p>

                <p>
                  <strong>Github Portfolio</strong> turns your github profile
                  into an <strong>organised showcase</strong> of your work.
                  <a href="/users/bloycey">Bloycey's Profile</a>
                </p>
              </div>
              <form
                onSubmit={() => this.goToProfile(this.state.githubName)}
                id="home-search"
              >
                <div className="user-search-heading">
                  Enter github username:
                </div>
                <br />
                <div className="input-group">
                  <input
                    className="github-search-input"
                    placeholder="E.g bloycey"
                    type="text"
                    value={this.state.githubName}
                    onChange={e =>
                      this.setState({ githubName: e.target.value })
                    }
                  />
                  <div className="input-group-append">
                    <button className="btn search-btn" type="submit">
                      <FontAwesomeIcon icon={faHandPointRight} />
                    </button>
                  </div>
                </div>
              </form>
            </Container>
          </div>
          {/* <Container>
            <section id="github-search">
              <form>
                <div className="user-search-heading">
                  Search for a github user:
                </div>
                <br />
                <input
                  className="github-search-input"
                  placeholder="E.g bloycey"
                  type="text"
                  value={this.state.githubName}
                  onChange={e =>
                    this.setState({ githubName: e.target.value }, () =>
                      this.handleSearch(e)
                        .then(res => {
                          this.setState({
                            userResponse: res
                          });
                          this.getRateLimit()
                            .then(res => {
                              this.setState({
                                rateLimit: res
                              });
                            })
                            .catch(err => console.log(err));
                        })
                        .catch(err => console.log(err))
                    )
                  }
                />
              </form>
            </section>
            <section id="github-search-results">
              {/* If no results show placeholder */}

          {/* {(this.state.userResponse == "" ||
                this.state.githubName == "") && (
                <a href="javascript:void(0)" className="user-card">
                  <User
                    key="Example"
                    username="Example User"
                    avatar={exampleUser}
                  />
                </a>
              )}


              {this.state.userResponse !== "" &&
                this.state.githubName !== "" &&
                this.state.userResponse.items !== undefined &&
                this.state.userResponse.items.map(item => {
                  return (
                    <a
                      key={item.login}
                      className="user-card"
                      href="javascript:void(0)"
                      onClick={() => this.goToProfile(item.login)}
                    >
                      <User
                        key={item.login}
                        username={item.login}
                        avatar={item.avatar_url}
                      />
                    </a>
                  );
                })}
            </section>
          </Container> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
