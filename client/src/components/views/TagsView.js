import React, { Component } from "react";
import { Collapse } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Repo from "../Repo";
import TagCollapse from "./TagCollapse";
import "../../App.css";

class TagsView extends Component {
  state = {
    unsortedCollapse: false
  };

  toggle = () => {
    this.setState({
      unsortedCollapse: !this.state.unsortedCollapse
    });
  };

  render() {
    const plusMinus =
      this.state.unsortedCollapse === true ? (
        <FontAwesomeIcon icon={faMinus} />
      ) : (
        <FontAwesomeIcon icon={faPlus} />
      );
    const tags = Array.from(this.props.tags);
    const unsortedRepos = this.props.reposArray.filter(
      repo => !repo.tags.names.length > 0
    );
    return (
      <div className="repos-outer-wrapper">
        <div className="tags-here">
          {tags.length > 0 &&
            tags
              .sort()
              .map(tag => (
                <TagCollapse
                  tagName={tag}
                  reposArray={this.props.reposArray}
                  key={tag}
                  tagsApplied={this.props.tagsApplied}
                />
              ))}
          {tags.length < 1 && (
            <p>
              No tags found. NOTE: We call them tags, but github refers to them
              as "Topics". To learn how to add topics/tags to your repos follow{" "}
              <a
                className="learn-tags"
                href="https://help.github.com/articles/classifying-your-repository-with-topics/"
                target="_blank"
                rel="noopener noreferrer"
              >
                this link.
              </a>
            </p>
          )}

          <div className="toggle-wrapper" onClick={() => this.toggle()}>
            <h3>
              Unsorted <span className="numItems">{unsortedRepos.length}</span>
            </h3>
            {plusMinus}
          </div>
          <Collapse isOpen={this.state.unsortedCollapse}>
            <div className="unsorted repos-wrapper">
              {unsortedRepos.map(repo => (
                <Repo
                  name={repo.name}
                  key={repo.name}
                  description={repo.description}
                  language={repo.language}
                  tags={repo.tags || null}
                  updated={repo.updated_at}
                  stars={repo.stargazers_count}
                  url={repo.svn_url}
                  website={repo.homepage}
                />
              ))}
            </div>
          </Collapse>
        </div>
      </div>
    );
  }
}

export default TagsView;
