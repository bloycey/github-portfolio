import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

class UserNotFound extends Component {
  state = {
    githubName: ""
  };

  static propTypes = {
    history: PropTypes.object
  };

  navigate = path => {
    this.props.history.push(path);
  };

  goToProfile = () => {
    this.props.history.push(`/users/${this.state.githubName}`);
  };

  render() {
    return (
      <div className="fourohfour-wrapper">
        <Container>
          <Row>
            <Col md={{ size: 8, offset: 2 }}>
              <h1 className="usernotfound-heading text-center">
                User Not Found
              </h1>
              <div className="fourohfour-text text-center">
                <p>A typo maybe?</p>
                <p>Try again using the search bar below</p>
              </div>
              <div className="form-404-wrapper text-center">
                <form
                  onSubmit={() => this.goToProfile()}
                  id="fourohfour-search"
                  className="d-inline-block"
                >
                  <br />
                  <div className="input-group">
                    <input
                      className="github-search-input"
                      placeholder="Enter github username..."
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
                <div className="still-lost text-center">
                  <p>
                    Still lost? Try heading <Link to={"/"}>home</Link> or check
                    out the github repo to{" "}
                    <a
                      href="https://github.com/bloycey/github-portfolio"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      learn more
                    </a>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(UserNotFound);
