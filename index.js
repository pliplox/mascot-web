const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 3000;

const publicipath = path.join(__dirname, "public");
const buildpath = path.join(__dirname, "build");

app.use(express.static(buildpath));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
