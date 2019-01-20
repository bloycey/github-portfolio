import React, { Component } from "react";
import { Collapse } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Repo from "../Repo";
import "../../App.css";

export default class TagCollapse extends Component {
  state = {
    filteredArray: [],
    collapse: false
  };

  componentDidMount() {
    if (this.props.tagsApplied == true) {
      this.props.reposArray.forEach(repo => {
        if (repo.tags.names.length > 0) {
          if (repo.tags.names.includes(this.props.tagName)) {
            let filteredArray = this.state.filteredArray;
            filteredArray.push(repo);
            this.setState({
              filteredArray
            });
          }
        }
      });
    }
  }

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
    const numTags = this.state.filteredArray.length;
    const tagName = this.props.tagName;
    const tagsApplied = this.props.tagsApplied;
    return (
      <div className="tagCollapse">
        <h2 />
        <div className="toggle-wrapper" onClick={() => this.toggle()}>
          <h3>
            {this.props.tagName} <span className="numItems">{numTags}</span>
          </h3>
          {plusMinus}
        </div>
        <Collapse isOpen={this.state.collapse}>
          <div className="tagRepos repos-wrapper">
            {this.state.filteredArray
              .sort((a, b) =>
                a.sortDate < b.sortDate ? 1 : b.sortDate < a.sortDate ? -1 : 0
              )
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
                  forked={repo.fork}
                />
              ))}
          </div>
        </Collapse>
      </div>
    );
  }
}
