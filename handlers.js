const { flights } = require("./test-data/flightSeating");
const { reservations } = require("./test-data/reservations");

let currentReservationId = ""; //this should keep track of the new id created from the last transaction

//grabs user's info adds them to our list of users
const handleConfirmation = (req, res) => {
  let reservation = req.body;
  let newReservation = {
    id: "10", //note to self: use api to randomize number
    flight: reservation.flight,
    givenName: reservation.givenName,
    surname: reservation.surname,
    email: reservation.email,
    seat: reservation.seat,
  };
  reservations.push(newReservation);
  currentReservationId = newReservation.id;
  res.status(201);
};
//handler to display user info on confirmation page
const handleConfirmationPage = (req, res) => {
  let userId = currentReservationId;
  let userReservation = reservations.find(
    (reservation) => reservation.id === userId
  );
  res.status(200).json(userReservation);
};

//sends all flight numbers
const handleFlights = (req, res) => {
  res.status(200).json(Object.keys(flights));
};

//This handler sends an object of the chosen flight with seat Ids as keys and availability as values
const handleFlight = (req, res) => {
  const flightId = req.params.num;
  let chosenFlight = {};
  flights[`${flightId}`].forEach((seat) => {
    chosenFlight[`${seat.id}`] = seat.isAvailable;
  });
  res.status(200).json(chosenFlight);
};

//function to get reservation using Id entered
const handleReservation = (req, res) => {
  const userId = req.params.id;
  const userReservation = reservations.find((user) => user.id === userId);
  res.status(200);
  res.json(userReservation);
};

module.exports = {
  handleConfirmation,
  handleFlights,
  handleFlight,
  handleConfirmationPage,
  handleReservation,
};
