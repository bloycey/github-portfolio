import React, { Component } from "react";
import Repo from "../Repo";
import "../../App.css";

const InfoView = props => {
  return (
    <div className="info-wrapper">
      <div className="info-block">
        <h2 className="d-inline-block">Github Profile Created:</h2>
        <p className="d-inline-block">7th July, 2017</p>
      </div>
      <div className="info-block">
        <h2 className="d-inline-block">Public Repos:</h2>
        <p className="d-inline-block">30</p>
      </div>
      <div className="info-block">
        <h2 className="d-inline-block">Followers</h2>
        <p className="d-inline-block">8</p>
      </div>
      <div className="info-block">
        <h2 className="d-inline-block">Following</h2>
        <p className="d-inline-block">11</p>
      </div>
      <div className="info-block">
        <h2 className="d-inline-block">Website</h2>
        <p className="d-inline-block">www.andrewbloyce.com.au</p>
      </div>

      <div className="info-block">
        <h2 className="d-inline-block">Email</h2>
        <p className="d-inline-block">bloyce1990@gmail.com</p>
      </div>
    </div>
  );
};

export default InfoView;
