const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const dotenv = require("dotenv");

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

async function getData(githubUsername) {
  let response = await fetch(
    `https://api.github.com/search/users?q=${githubUsername}&per_page=6&client_id=${client_id}&client_secret=${client_secret}`
  );
  let data = await response.json();
  return data;
}

// @route   GET api/getUsers
// @desc    Gets usernames from github API based on search
// @access  Public

router.post("/", (req, res) => {
  console.log("request recieved by server " + req.body.githubName);
  console.log(req.body);
  const username = req.body.githubName;
  getData(username).then(data => {
    // console.log(data);
    res.send({ response: data });
  });
});

module.exports = router;
