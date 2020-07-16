const { flights } = require("./test-data/flightSeating");
const { reservations } = require("./test-data/reservations");

let currentReservationId = ""; //testing...this should keep track of the new id created from the last transaction

//still for testing but can grab user input
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
//note to self: figure out how to send data to front end
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
module.exports = {
  handleConfirmation,
  handleFlights,
  handleFlight,
  handleConfirmationPage,
};
