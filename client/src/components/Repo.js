import React, { Component } from "react";
import { Button } from "reactstrap";
import { distanceInWordsToNow } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faLaptopCode,
  faStar,
  faExternalLinkAlt
} from "@fortawesome/free-solid-svg-icons";
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
        <h2 className="repo-title">
          {this.props.name}{" "}
          {this.props.stars > 0 && (
            <span className="stars-wrapper">
              <FontAwesomeIcon icon={faStar} /> {this.props.stars}
            </span>
          )}
        </h2>
        {this.props.description && (
          <div className="repo-description">
            {this.props.description}
            <div className="text-left">
              <hr className="small-divider" />
            </div>
          </div>
        )}

        <div className="language">
          <FontAwesomeIcon icon={faLaptopCode} />
          <span>: {this.props.language}</span>
        </div>
        {this.props.site && (
          <div className="site-wrapper pb-2">
            <a href={this.props.site} target="_blank">
              <FontAwesomeIcon icon={faExternalLinkAlt} /> View Project Site
            </a>
          </div>
        )}
        <div className="tags pb-3 pt-3">
          {this.props.tags && this.props.tags.names.length > 0 && (
            <div className="mb-2">
              {this.props.tags.names.map(tag => (
                <Tag tagName={tag} key={tag} />
              ))}
            </div>
          )}
        </div>
        <a
          href={this.props.url}
          target="_blank"
          className="view-repo-btn-wrapper"
        >
          <Button outline className="view-repo-btn">
            View Repository
          </Button>
        </a>
        <span className="date-created">Last updated {updated}</span>
      </div>
    );
  }
}

export default Repo;
