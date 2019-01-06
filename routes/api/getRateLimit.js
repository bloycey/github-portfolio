const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const dotenv = require("dotenv").config();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

//Functiona for getting usage data
async function getUsageData() {
  console.log("client id", client_id);
  let response = await fetch(
    `https://api.github.com/rate_limit?client_id=${client_id}&client_secret=${client_secret}`
  );
  let data = await response.json();
  console.log("usage data", data);
  return data;
}

// @route   GET api/getRateLimit
// @desc    Gets the Github API Rate Limit
// @access  Public

// Route for getting the rate limit

router.get("/", (req, res) => {
  console.log("ratelimit request received");
  getUsageData().then(data => {
    // console.log(data);
    res.send({ response: data });
  });
});

module.exports = router;
