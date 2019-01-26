import React, { Component } from "react";
import { Collapse } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Repo from "../Repo";
import "../../App.css";

export default class LanguageCollapse extends Component {
  state = {
    collapse: false,
    languageLength: 0,
    languageArray: []
  };

  componentDidMount() {
    const languageArray = this.props.reposArray
      .sort((a, b) =>
        a.sortDate < b.sortDate ? 1 : b.sortDate < a.sortDate ? -1 : 0
      )
      .filter(repo => {
        return repo.language === this.props.language;
      });

    this.setState({
      languageArray,
      languageLength: languageArray.length
    });
  }

  toggle = () => {
    this.setState({
      collapse: !this.state.collapse
    });
  };

  render() {
    const plusMinus =
      this.state.collapse === true ? (
        <FontAwesomeIcon icon={faMinus} />
      ) : (
        <FontAwesomeIcon icon={faPlus} />
      );
    const language = this.props.language;
    return (
      <div className="languageCollapse">
        <div className="toggle-wrapper" onClick={() => this.toggle()}>
          <h3>
            {language}{" "}
            <span className="numItems">{this.state.languageLength}</span>
          </h3>
          {plusMinus}
        </div>
        <Collapse isOpen={this.state.collapse}>
          <div className="tagRepos repos-wrapper">
            {this.state.languageArray.map(repo => (
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
                forked={repo.fork}
              />
            ))}
          </div>
        </Collapse>
      </div>
    );
  }
}
