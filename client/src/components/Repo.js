import React, { Component } from "react";
import { Button } from "reactstrap";
import { distanceInWordsToNow } from "date-fns";
import Tag from "./Tag";
import "../App.css";

class Repo extends React.Component {
  state = {};

  render() {
    const updated = distanceInWordsToNow(this.props.updated, {
      addSuffix: true
    });

    return (
      <div className="single-repo-wrapper">
        <h2 className="repo-title">{this.props.name}</h2>
        <hr />
        <div className="repo-description">
          {this.props.description || "No Description"}
        </div>
        <hr className="small-divider" />
        <div className="language">
          Main Language: <span>{this.props.language}</span>
        </div>
        <div className="tags pb-2">
          <p className="mb-0">Tags:</p>
          {this.props.tags &&
            this.props.tags.names.map(tag => <Tag tagName={tag} key={tag} />)}
        </div>
        <Button outline className="view-repo-btn">
          View Repository
        </Button>
        <span className="date-created">Last updated {updated}</span>
      </div>
    );
  }
}

export default Repo;
