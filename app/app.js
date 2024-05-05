const express = require("express");
const ApiV1Router = require("./api/v1/api.v1.index");
const {
  GetRoomSemesterRegisted,
} = require("./api/v1/components/semester/semester.service");
const {
  GetRegisOfUserFromSemester,
} = require("./api/v1/components/regis/regis.service");

const app = express();

app.use("/api/v1", ApiV1Router);

// GetRegisOfUserFromSemester(1, 4).then((rsl) => {
//   console.log(rsl);
// });

module.exports = app;
