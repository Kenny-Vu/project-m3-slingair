const flightInput = document.getElementById("flight");
const seatsDiv = document.getElementById("seats-section");
const confirmButton = document.getElementById("confirm-button");
const reservationButton = document.getElementById("reservation-button");

let selection = "";

const handleReservationButton = (event) => {
  event.preventDefault();
  window.location.href = "http://localhost:8000/view-reservation/";
};

const renderSeats = (data) => {
  document.querySelector(".form-container").style.display = "block";
  const alpha = ["A", "B", "C", "D", "E", "F"];
  for (let r = 1; r < 11; r++) {
    const row = document.createElement("ol");
    row.classList.add("row");
    row.classList.add("fuselage");
    seatsDiv.appendChild(row);
    for (let s = 1; s < 7; s++) {
      const seatNumber = `${r}${alpha[s - 1]}`;
      const seat = document.createElement("li");

      // Two types of seats to render
      const seatOccupied = `<li><label class="seat"><span id="${seatNumber}" class="occupied">${seatNumber}</span></label></li>`;
      const seatAvailable = `<li><label class="seat"><input type="radio" name="seat" value="${seatNumber}" /><span id="${seatNumber}" class="avail">${seatNumber}</span></label></li>`;

      // TODO: render the seat availability based on the data...
      if (data[`${seatNumber}`] === true) {
        seat.innerHTML = seatAvailable;
        row.appendChild(seat);
      } else {
        seat.innerHTML = seatOccupied;
        row.appendChild(seat);
      }
    }
  }

  let seatMap = document.forms["seats"].elements["seat"];
  seatMap.forEach((seat) => {
    seat.onclick = () => {
      selection = seat.value;
      seatMap.forEach((x) => {
        if (x.value !== seat.value) {
          document.getElementById(x.value).classList.remove("selected");
        }
      });
      document.getElementById(seat.value).classList.add("selected");
      document.getElementById("seat-number").innerText = `(${selection})`;
      confirmButton.disabled = false;
    };
  });
};

const toggleFormContent = (event) => {
  const flightNumber = flightInput.value;
  if (flightNumber[0] !== "S" && flightNumber[1] !== "A") {
    window.alert("Flight number invalid");
  } else {
    fetch(`/flights/${flightNumber}`)
      .then((res) => res.json())
      .then((data) => {
        renderSeats(data);
      });
  }
  // TODO: contact the server to get the seating availability
  //      - only contact the server if the flight number is this format 'SA###'.
  //      - Do I need to create an error message if the number is not valid?
};

const handleConfirmSeat = (event) => {
  event.preventDefault();
  // TODO: everything in here!
  fetch("/users", {
    method: "POST",
    body: JSON.stringify({
      givenName: document.getElementById("givenName").value,
      surname: document.getElementById("surname").value,
      email: document.getElementById("email").value,
      flight: flightInput.value,
      seat: selection,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  window.location.href = "http://localhost:8000/confirmed/";
};
const dropdownSetup = () => {
  fetch("/flights")
    .then((data) => {
      return data.json();
    })
    .then((response) => {
      response.flights.forEach((flightId) => {
        const option = document.createElement("option");
        option.innerText = flightId;
        option.value = flightId;
        flightInput.appendChild(option);
      });
    });
};

dropdownSetup();
reservationButton.addEventListener("click", handleReservationButton);
flightInput.addEventListener("change", toggleFormContent);
