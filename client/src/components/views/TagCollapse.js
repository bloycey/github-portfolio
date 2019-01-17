import React, { Component } from "react";
import { Collapse } from "reactstrap";
import Repo from "../Repo";
import "../../App.css";

export default class TagCollapse extends Component {
  state = {
    filteredArray: [],
    unsorted: []
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

  render() {
    const tagName = this.props.tagName;
    const tagsApplied = this.props.tagsApplied;
    return (
      <div className="tagCollapse">
        <h2>{this.props.tagName}</h2>
        <div className="tagRepos repos-wrapper">
          {this.state.filteredArray.map(repo => (
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
      </div>
    );
  }
}
