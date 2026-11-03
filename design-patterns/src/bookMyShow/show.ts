import type { Movie } from "./movie.js";
import type { Screen } from "./screen.js";
import type { ShowSeat } from "./showSeat.js";

export class Show {
    private readonly _showSeats: ShowSeat[];

    constructor(
        private readonly _id: string,
        private readonly _movie: Movie,
        private readonly _screen: Screen,
        private readonly _startTime: Date,
        private readonly _endTime: Date,
        private readonly _showDate: Date,
        showSeats: ShowSeat[] = [],
    ) {
        this._showSeats = [...showSeats];
    }

    get id(): string { return this._id; }
    get movie(): Movie { return this._movie; }
    get screen(): Screen { return this._screen; }
    get startTime(): Date { return new Date(this._startTime); }
    get endTime(): Date { return new Date(this._endTime); }
    get showDate(): Date { return new Date(this._showDate); }

    getShowSeats(): readonly ShowSeat[] {
        return [...this._showSeats];
    }
}
