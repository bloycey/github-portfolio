import React, { Component } from "react";
import { Collapse } from "reactstrap";
import Repo from "../Repo";
import TagCollapse from "./TagCollapse";
import "../../App.css";

const TagsView = props => {
  const tags = Array.from(props.tags);
  const unsortedRepos = props.reposArray.filter(
    repo => !repo.tags.names.length > 0
  );
  return (
    <div className="repos-outer-wrapper">
      <div className="tags-here">
        {tags.map(tag => (
          <TagCollapse
            tagName={tag}
            reposArray={props.reposArray}
            key={tag}
            tagsApplied={props.tagsApplied}
          />
        ))}
        <h2>Unsorted Repos</h2>
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
      </div>
      {/* <div className="repos-wrapper">
        {props.reposArray
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
            />
          ))}
      </div> */}
    </div>
  );
};

export default TagsView;
