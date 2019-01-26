import React, { Component } from "react";
import "../../App.css";
import LanguageCollapse from "./LanguageCollapse";

class LanguageView extends Component {
  state = {
    languages: []
  };

  componentDidMount() {
    const languages = new Set();
    this.props.reposArray.forEach(repo => {
      languages.add(repo.language);
    });
    this.setState({
      languages: Array.from(languages)
    });
  }

  render() {
    return (
      <div className="repos-wrapper">
        {this.state.languages.sort().map(language => (
          <LanguageCollapse
            language={language}
            reposArray={this.props.reposArray}
            key={language}
          />
        ))}
      </div>
    );
  }
}

export default LanguageView;
