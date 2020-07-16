let userInput = document.getElementById("userInput");

let hiddenDiv = document.getElementById("hidden");
let flight = document.getElementById("flight");
let seat = document.getElementById("seat");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let email = document.getElementById("email");

const handleIdSubmit = (event) => {
  event.preventDefault();
  fetch(`/reservation/${userInput.value}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      flight.innerText = data.flight;
      seat.innerText = data.seat;
      firstName.innerText = data.givenName;
      lastName.innerText = data.surname;
      email.innerText = data.email;
      hiddenDiv.classList.add("active");
    });
};
