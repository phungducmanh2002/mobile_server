const express = require("express");
const ApiV1Router = require("./api/v1/api.v1.index");

const app = express();

app.use("/api/v1", ApiV1Router);

module.exports = app;
