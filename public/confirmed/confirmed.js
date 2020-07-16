let flight = document.getElementById("flight");
let name = document.getElementById("name");
let email = document.getElementById("email");
let seat = document.getElementById("seat");

const loadUserInfo = fetch("/confirmed/user")
  .then((res) => {
    return res.json();
  })
  .then((response) => {
    flight.innerText = response.flight;
    name.innerText = response.givenName;
    email.innerText = response.email;
    seat.innerText = response.seat;
  });
