const { flights } = require("./test-data/flightSeating");
const { reservations } = require("./test-data/reservations");
const { v4: uuidv4 } = require("uuid"); //API to generate random id
const rp = require("request-promise");
const base_url = "https://journeyedu.herokuapp.com"; // Scott's API
let currentReservationId = ""; //this should keep track of the new id created from the last transaction

//grabs user's info adds them to our list of users
const handleConfirmation = (req, res) => {
  let reservation = req.body;
  let newReservation = {
    id: uuidv4(),
    flight: reservation.flight,
    givenName: reservation.givenName,
    surname: reservation.surname,
    email: reservation.email,
    seat: reservation.seat,
  };
  console.log(newReservation.id);
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
  const options = {
    uri: `${base_url}/slingair/flights`,
    json: true,
  };
  rp(options).then((response) => {
    res.status(200).json(response);
  });
};

//This handler sends an object of the chosen flight with seat Ids as keys and availability as values
const handleFlight = (req, res) => {
  const flightId = req.params.num;
  const options = {
    uri: `${base_url}/slingair/flights/${flightId}`,
    json: true,
  };
  rp(options)
    .then((response) => {
      let chosenFlight = {};
      response[`${flightId}`].forEach((seat) => {
        chosenFlight[`${seat.id}`] = seat.isAvailable;
      });
      res.status(200).json(chosenFlight);
      response[`${flightId}`];
    })
    .catch((err) => {
      console.log(err);
    });
};

//function to get reservation using Id entered
const handleReservation = (req, res) => {
  const userEmail = req.params.email;
  const userReservation = reservations.find((user) => user.email === userEmail);
  if (!!userReservation) {
    res.status(200).json(userReservation);
  } else {
    res.status(400).send("error");
  }
};

//API TESSSSSSTT
const handleTest = (req, res) => {
  const options = {
    uri: `${base_url}/slingair/flights/SA666`,
    json: true,
  };
  rp(options)
    .then((res) => {
      console.log(res);
      res.status(200);
      res.send(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  handleConfirmation,
  handleFlights,
  handleFlight,
  handleConfirmationPage,
  handleReservation,
  handleTest,
};
