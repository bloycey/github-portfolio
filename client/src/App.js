import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import User from "./components/User";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import {
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "reactstrap";
import "./App.css";
import exampleUser from "./img/example2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";

class App extends Component {
  state = {
    response: "",
    post: "",
    responseToPost: "",
    userSearch: "",
    userResponse: "",
    githubName: "",
    rateLimit: "",
    howTo: false
  };

  static propTypes = {
    history: PropTypes.object
  };

  componentDidMount() {}

  toggleHowTo = () => {
    this.setState({
      howTo: !this.state.howTo
    });
  };

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
              <li onClick={() => this.toggleHowTo()}>How to Use</li>
              {/* <li>About Developer</li> */}
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
                    placeholder="E.g rachelandrew"
                    type="text"
                    value={this.state.githubName}
                    onChange={e =>
                      this.setState({ githubName: e.target.value })
                    }
                  />
                  <div className="input-group-append">
                    <button className="btn search-btn" type="submit">
                      <FontAwesomeIcon icon={faChevronCircleRight} />
                    </button>
                  </div>
                </div>
              </form>
            </Container>
          </div>
          <Modal isOpen={this.state.howTo} toggle={() => this.toggleHowTo()}>
            <ModalHeader toggle={() => this.toggleHowTo()}>
              How to use Github Portfolio
            </ModalHeader>
            <ModalBody>
              <div className="howtouse">
                <p>
                  Github Portfolio uses the Github API to grab all the most
                  important details stored on your GitHub profile and display
                  them in an attractive way. To get the best out of GitHub
                  Portfolio you should follow the steps below:
                </p>
                <p className="step-wrapper">
                  <span className="heading">1. </span>
                  <span className="step-text">
                    Make sure your repositories utilise topics. We use these to
                    help keep things organised.
                  </span>
                </p>
                <p className="step-wrapper">
                  <span className="heading">2. </span>
                  Add short descriptions to all of your repositories
                </p>
                <p className="step-wrapper">
                  <span className="heading">3. </span>
                  Make sure your contact details are up to date. This is
                  particularly important if you've forwarded your profile to a
                  potential employer or recruiter
                </p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                className="getstarted-btn"
                onClick={() => this.toggleHowTo()}
              >
                Get Started
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
