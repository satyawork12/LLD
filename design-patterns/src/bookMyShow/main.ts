import { Screen } from "./screen.js";
import { Seat, SeatType } from "./seat.js";
import { Theatre } from "./theatre.js";

const theatreId = "theatre-1";
const screenId = "screen-1";

const seats = [
    new Seat("seat-1", screenId, "A1", SeatType.Regular),
    new Seat("seat-2", screenId, "A2", SeatType.Regular),
    new Seat("seat-3", screenId, "A3", SeatType.Regular),
    new Seat("seat-4", screenId, "B1", SeatType.Premium),
    new Seat("seat-5", screenId, "B2", SeatType.Premium),
    new Seat("seat-6", screenId, "B3", SeatType.Recliner),
];

const screen = new Screen(theatreId, screenId, seats);

const theatre = new Theatre(
    theatreId,
    "MG Road",
    "Bengaluru",
    [screen],
);

console.log("Theatre:", theatre);
console.log("Screen:", screen);
console.log("Seats:", screen.getSeats());
