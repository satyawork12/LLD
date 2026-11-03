import type { Movie } from "./movie.js";
import type { Screen } from "./screen.js";
import type { ShowSeat } from "./showSeat.js";

export class Show {
    constructor(
        public readonly id: string,
        public readonly movie: Movie,
        public readonly screen: Screen,
        public readonly startTime: Date,
        public readonly endTime: Date,
        public readonly showDate: Date,
        public readonly showSeats: ShowSeat[] = [],
    ) { }
}
