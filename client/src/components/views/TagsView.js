import React, { Component } from "react";
import { Collapse, Button } from "reactstrap";
import Repo from "../Repo";
import TagCollapse from "./TagCollapse";
import "../../App.css";

class TagsView extends Component {

  state= {
    unsortedCollapse: false
  }

  toggle = () => {
    this.setState({
      unsortedCollapse: !this.state.unsortedCollapse
    })
  }

  render(){
    const tags = Array.from(this.props.tags);
    const unsortedRepos = this.props.reposArray.filter(
    repo => !repo.tags.names.length > 0
  );
  return (
    <div className="repos-outer-wrapper">
      <div className="tags-here">
        {tags.map(tag => (
          <TagCollapse
            tagName={tag}
            reposArray={this.props.reposArray}
            key={tag}
            tagsApplied={this.props.tagsApplied}
          />
        ))}
        <h2>Unsorted Repos</h2>
        <Button color="primary" onClick={() => this.toggle()}>Toggle Unsorted Repos</Button>
        <Collapse isOpen={this.state.unsortedCollapse}>
        <div className="unsorted repos-wrapper">
          {unsortedRepos.map(repo => (
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
    </div>
  );
}}

export default TagsView;
