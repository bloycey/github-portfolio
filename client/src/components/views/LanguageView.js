import React, { Component } from "react";
import Repo from "../Repo";
import "../../App.css";

const LanguageView = props => {
  return (
    <div className="repos-wrapper">
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
    </div>
  );
};

export default LanguageView;