import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import User from "./components/User";
import logo from "./logo.svg";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";

import "./App.css";

class App extends Component {
  state = {
    response: "",
    post: "",
    responseToPost: "",
    userSearch: "",
    userResponse: "",
    githubName: ""
  };

  static propTypes = {
    history: PropTypes.object
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/api/hello");
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleSearch = async event => {
    console.log("username sent from react");
    const response = await fetch("/api/getUsers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ githubName: this.state.githubName })
    });
    const body = await response.json();
    console.log(body);
    this.setState({
      userResponse: body.response
    });
  };

  goToProfile = user => {
    console.log("go to profile triggered");
    this.props.history.push(`/${user}`);
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
          <form>
            <p>
              <strong>Search for github user</strong>
            </p>
            <input
              type="text"
              value={this.state.githubName}
              onChange={e =>
                this.setState({ githubName: e.target.value }, () =>
                  this.handleSearch(e)
                )
              }
            />
          </form>
          {this.state.userResponse !== "" &&
            this.state.githubName !== "" &&
            this.state.userResponse.items !== undefined &&
            this.state.userResponse.items.map(item => {
              return (
                <a
                  href="javascript:void(0)"
                  onClick={() => this.goToProfile(item.login)}
                >
                  <User key={item.login} username={item.login} />
                </a>
              );
            })}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
