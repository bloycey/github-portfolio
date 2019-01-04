const express = require("express");
const router = express.Router();
const octokit = require("@octokit/rest")();

// @route   GET api/getUsers/test
// @desc    Tests profile route
// @access  Public

router.post("/", (req, res) => {
  console.log(req.body);
  const username = req.body.githubName;
  console.log("username", username);
  octokit.search.users({ q: username }).then(result => {
    console.log("result", result);
    res.send({ response: result });
  });
  //   octokit.repos
  //     .listForOrg({
  //       org: "octokit",
  //       type: "public"
  //     })
  //     .then(({ data, headers, status }) => {
  //       res.send({ response: data });
  //     `I received your POST request to GETUSERS. This is what you sent me: ${
  //       req.body.githubName
  //     } ${data}`
  //   );
  // });
});

module.exports = router;
