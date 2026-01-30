const seatContainer = document.querySelector(".seat-container");
const btn = document.createElement("button");
const errorText = document.createElement("p");
const removeErrorButton = document.createElement("button");
const priceText = document.createElement("h3");

btn.classList.add("main-btn");
btn.innerText = "Book Now";

errorText.innerText = "Max five seats per booking";
removeErrorButton.innerText = "Ok";
errorText.appendChild(removeErrorButton);

priceText.innerText = "Total Price: ₹0";

removeErrorButton.addEventListener("click", () => {
  errorText.remove();
});

const pricePerSeat = 150;

let seats = [];
for (let i = 1; i <= 26; i++) {
  seats.push({ id: i, state: "available" });
}

/* Update Price */
function updatePrice() {
  let count = seats.filter(s => s.state === "selected").length;
  priceText.innerText = "Total Price: ₹" + count * pricePerSeat;

  if (count > 0) {
    document.body.appendChild(priceText);
  } else {
    priceText.remove();
  }
}

/* Seat Click */
seatContainer.addEventListener("click", (e) => {

  if (!e.target.classList.contains("seat")) return;
  if (e.target.innerText === "Booked") return;

  let selectedSeats = seats.filter(s => s.state === "selected");

  let id = Number(e.target.id);
  let currentSeat = seats.find(s => s.id === id);

  if (selectedSeats.length === 5 && currentSeat.state !== "selected") {
    seatContainer.after(errorText);
    return;
  }

  currentSeat.state =
    currentSeat.state === "available" ? "selected" : "available";

  e.target.innerText =
    currentSeat.state === "available" ? "Available" : "Selected";

  e.target.classList.toggle("selected");

  updatePrice();

  if (seats.some(s => s.state === "selected")) {
    document.body.appendChild(btn);
  } else {
    btn.remove();
  }

});

/* Booking */
btn.addEventListener("click", () => {

  seats = seats.map(seat => {
    if (seat.state === "selected") {
      let el = seatContainer.children[seat.id - 1];
      el.innerText = "Booked";
      el.classList.remove("selected");
      el.classList.add("booked");
      return { id: seat.id, state: "booked" };
    }
    return seat;
  });

  btn.remove();
  priceText.remove();

});
