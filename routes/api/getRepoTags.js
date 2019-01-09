const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const dotenv = require("dotenv").config();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

// Function for getting individual profiles
async function getUserRepos(githubUsername, repo) {
  let response = await fetch(
    `https://api.github.com/repos/${githubUsername}/${repo}/topics?client_id=${client_id}&client_secret=${client_secret}`,
    {
      method: "GET",
      headers: {
        Accept: "application/vnd.github.mercy-preview+json"
      }
    }
  );
  let data = await response.json();
  console.log("topics received", data);
  return data;
}

// @route   GET api/getRepoTags
// @desc    Gets usernames from github API based on search
// @access  Public

// Route for getting 'topics' from github repo

router.get("/", (req, res) => {
  console.log("server received request for repo topics");
  const username = req.query.username;
  const repo = req.query.repo;
  getUserRepos(username, repo).then(data => {
    // console.log(data);
    res.send({ response: data });
  });
});

module.exports = router;
