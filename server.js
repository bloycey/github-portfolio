const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const getUsers = require("./routes/api/getUsers");
const getUserProfile = require("./routes/api/getUserProfile");
const getRateLimit = require("./routes/api/getRateLimit");

const app = express();

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes

app.use("/api/getUsers", getUsers);
app.use("/api/getUserProfile", getUserProfile);
app.use("/api/getRateLimit", getRateLimit);

app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});

app.post("/api/world", (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});

const port = process.env.PORT || 5000;

// if (process.env.NODE_ENV === "production") {
//   // Serve any static files
//   app.use(express.static(path.join(__dirname, "client/build")));

//   // Handle React routing, return all requests to React app
//   app.get("*", function(req, res) {
//     res.sendFile(path.join(__dirname, "client/build", "index.html"));
//   });
// }

app.listen(port, () => console.log(`Listening on port ${port}`));
