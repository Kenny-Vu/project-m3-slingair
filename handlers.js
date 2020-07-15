const { flights } = require("./test-data/flightSeating");

//still for testing but can grab user input
const handleConfirmation = (req, res) => {
  res.status(200);
  res.redirect("/confirmed");
};

const handleSeatSelect = (req, res) => {
  console.log("hello");
  res.status(200);
  res.render("public/seat-select/index.html");
};
//sends all flight numbers
const handleFlights = (req, res) => {
  res.status(200).json(Object.keys(flights));
};

//This handler sends back an object of the chosen flight with seat Ids as keys and availability as values
const handleFlight = (req, res) => {
  const flightId = req.params.num;
  let chosenFlight = {};
  flights[`${flightId}`].forEach((seat) => {
    chosenFlight[`${seat.id}`] = seat.isAvailable;
  });
  res.status(200).json(chosenFlight);
};
module.exports = {
  handleConfirmation,
  handleSeatSelect,
  handleFlights,
  handleFlight,
};
