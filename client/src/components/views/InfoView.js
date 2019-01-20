import React, { Component } from "react";
import Repo from "../Repo";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import "../../App.css";

const InfoView = props => {
  const dateCreated = format(props.userData.created_at, "Do MMMM YYYY");
  return (
    <div className="info-wrapper">
      <div className="info-block">
        <h2 className="d-inline-block">Github Profile Created:</h2>
        <p className="d-inline-block">{dateCreated}</p>
      </div>
      <div className="info-block">
        <h2 className="d-inline-block">Public Repos:</h2>
        <p className="d-inline-block">{props.userData.public_repos}</p>
      </div>
      <div className="info-block">
        <h2 className="d-inline-block">Followers:</h2>
        <p className="d-inline-block">{props.userData.followers}</p>
      </div>
      <div className="info-block">
        <h2 className="d-inline-block">Following:</h2>
        <p className="d-inline-block">{props.userData.following}</p>
      </div>
      {props.userData.blog && (
        <div className="info-block">
          <h2 className="d-inline-block">Website:</h2>
          <p className="d-inline-block">
            <a
              href={props.userData.blog}
              target="_blank"
              className="email-link"
            >
              {props.userData.blog}
            </a>
          </p>
        </div>
      )}
      {props.userData.email && (
        <div className="info-block">
          <h2 className="d-inline-block">Email:</h2>
          <p className="d-inline-block">
            <a className="email-link" href={`mailto:${props.userData.email}`}>
              {props.userData.email}
            </a>
          </p>
        </div>
      )}
      <div className="info-block">
        <a
          href={props.userData.html_url}
          className="visit-profile"
          target="_blank"
        >
          Visit Profile <FontAwesomeIcon icon={faExternalLinkAlt} />
        </a>
      </div>
    </div>
  );
};

export default InfoView;
