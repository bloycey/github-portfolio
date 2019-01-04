import React, { Component } from "react";
import User from "./components/User";
import logo from "./logo.svg";

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

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch("/api/world", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ post: this.state.post })
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
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

  render() {
    const AllNames = () => {
      if (this.state.userResponse !== "") {
        return <div>BEEP</div>;
      } else {
        return null;
      }
    };
    return (
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
            return <User username={item.login} />;
          })}
      </div>
    );
  }
}

export default App;
