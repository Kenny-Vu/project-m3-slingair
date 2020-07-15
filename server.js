"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { flights } = require("./test-data/flightSeating");

const {
  handleConfirmation,
  handleSeatSelect,
  handleFlights,
  handleFlight,
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
  .get("/seat-select", handleSeatSelect)
  .get("/flights", handleFlights)
  .get("/flights/:num", handleFlight)
  // .get("/view-reservation")
  .get("/confirmed", handleConfirmation)
  .post("/users", handleConfirmation) // user submits info form

  .use((req, res) => res.send("Not Found"))
  .listen(8000, () => console.log(`Listening on port 8000`));
