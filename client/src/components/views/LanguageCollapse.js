import React, { Component } from "react";
import { Collapse } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Repo from "../Repo";
import "../../App.css";

export default class LanguageCollapse extends Component {
  state = {
    collapse: false
  };

  componentDidMount() {}

  toggle = () => {
    this.setState({
      collapse: !this.state.collapse
    });
  };

  render() {
    const plusMinus =
      this.state.collapse == true ? (
        <FontAwesomeIcon icon={faMinus} />
      ) : (
        <FontAwesomeIcon icon={faPlus} />
      );
    const language = this.props.language;
    return (
      <div className="languageCollapse">
        <h2 />
        <div className="toggle-wrapper" onClick={() => this.toggle()}>
          <h3>{this.props.language}</h3>
          {plusMinus}
        </div>
        <Collapse isOpen={this.state.collapse}>
          <div className="tagRepos repos-wrapper">
            {this.props.reposArray
              .sort((a, b) =>
                a.sortDate < b.sortDate ? 1 : b.sortDate < a.sortDate ? -1 : 0
              )
              .filter(repo => {
                return repo.language == this.props.language;
              })
              .map(repo => (
                <Repo
                  name={repo.name}
                  key={repo.name}
                  description={repo.description}
                  language={repo.language}
                  url={repo.html_url}
                  tags={repo.tags || null}
                  updated={repo.updated_at}
                  stars={repo.stargazers_count}
                  url={repo.svn_url}
                  site={repo.homepage}
                />
              ))}
          </div>
        </Collapse>
      </div>
    );
  }
}
