const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const dotenv = require("dotenv").config();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

// Function for getting individual profiles
async function getUserRepos(githubUsername) {
  let response = await fetch(
    `https://api.github.com/users/${githubUsername}/repos?client_id=${client_id}&client_secret=${client_secret}&per_page=100&sort=created`
  );
  let data = await response.json();
  return data;
}

// @route   GET api/getUserRepos
// @desc    Gets usernames from github API based on search
// @access  Public

// Route for getting individual user data

router.get("/", (req, res) => {
  console.log("request recieved by server for repos" + req.query.username);
  console.log(req.query.username);
  const username = req.query.username;
  getUserRepos(username).then(data => {
    // console.log(data);
    res.send({ response: data });
  });
});

module.exports = router;
