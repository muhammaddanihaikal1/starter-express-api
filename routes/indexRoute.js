const express = require("express");
const indexRoute = express.Router();

indexRoute.get("/", (req, res) => {
  res.json({
    tim: "FE-26-BE-8",
  });
});

module.exports = indexRoute;
