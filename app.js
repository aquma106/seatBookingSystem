const seatContainer = document.querySelector(".seat-container");
const btn = document.createElement("button");
const errorText = document.createElement("p");
const removeErrorButton = document.createElement("button");

btn.classList.add("main-btn");

errorText.innerText = "Max five seats per booking";
removeErrorButton.innerText = "Ok";
errorText.appendChild(removeErrorButton);

removeErrorButton.addEventListener("click", () => {
  errorText.remove();
});
btn.innerText = "Book Now";
let seats = [
  { id: 1, state: "available" },
  { id: 2, state: "available" },
  { id: 3, state: "available" },
  { id: 4, state: "available" },
  { id: 5, state: "available" },
  { id: 6, state: "available" },
  { id: 7, state: "available" },
  { id: 8, state: "available" },
  { id: 9, state: "available" },
  { id: 10, state: "available" },
  { id: 11, state: "available" },
  { id: 12, state: "available" },
  { id: 13, state: "available" },
  { id: 14, state: "available" },
  { id: 15, state: "available" },
  { id: 16, state: "available" },
  { id: 17, state: "available" },
  { id: 18, state: "available" },
  { id: 19, state: "available" },
  { id: 20, state: "available" },
  { id: 21, state: "available" },
  { id: 22, state: "available" },
  { id: 23, state: "available" },
  { id: 24, state: "available" },
  { id: 25, state: "available" },
  { id: 26, state: "available" },
];

seatContainer.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.innerText == "Booked") {
    return;
  } else {
    let tempSeat = seats.filter((item) => item.state == "selected");
    if (tempSeat.length == 5) {
      let seat = e.target;
      let id = seat.id;

      if (seat) {
        if (tempSeat.find((item) => item.id == id)) {
          let currentSeat = seats.find((seat) => seat.id == id);
          currentSeat.state =
            currentSeat.state == "available" ? "selected" : "available";
          seat.innerText =
            currentSeat.state == "available" ? "Available" : "Selected";
        } else {
          seatContainer.after(errorText);
        }
      }
    } else {
      let seat = e.target;
      if (seat) {
        let id = seat.id;
        let currentSeat = seats.find((seat) => seat.id == id);
        currentSeat.state =
          currentSeat.state == "available" ? "selected" : "available";
        seat.innerText =
          currentSeat.state == "available" ? "Available" : "Selected";
        if (seats.find((item) => item.state == "selected")) {
          document.body.appendChild(btn);
        } else {
          btn.remove();
        }
      }
    }
  }
});

// book seat logic

btn.addEventListener("click", (e) => {
  e.preventDefault();
  seats = seats.map((item) => {
    if (item.state == "selected") {
      seatContainer.children[item.id - 1].innerText = "Booked";
      return { id: item.id, state: "booked" };
    } else {
      return { id: item.id, state: item.state };
    }
  });
  btn.remove();
});
