"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { flights } = require("./test-data/flightSeating");

const {
  handleConfirmation,
  handleFlights,
  handleFlight,
  handleConfirmationPage,
} = require("./handlers");

express()
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("dev"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  // endpoints
  //NOT TO SELF: DON'T USE SAME PATH AS FILE IN PUBLIC FOLDER, IT WON'T WORK.
  .get("/flights", handleFlights)
  .get("/flights/:num", handleFlight)
  // .get("/view-reservation")
  .get("/confirmed/user", handleConfirmationPage)
  .post("/users", handleConfirmation) // submits user infos

  .use((req, res) => res.send("Not Found"))
  .listen(8000, () => console.log(`Listening on port 8000`));
