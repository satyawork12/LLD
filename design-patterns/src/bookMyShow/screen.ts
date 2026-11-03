import type { Show } from "./show.js";
import type { Seat } from "./seat.js";

export class Screen {
    private readonly shows: Show[] = [];
    private readonly _seats: Seat[];

    constructor(
        private readonly _theatreId: string,
        private readonly _id: string,
        seats: Seat[] = [],
    ) {
        this._seats = [...seats];
    }

    get theatreId(): string { return this._theatreId; }
    get id(): string { return this._id; }

    getSeats(): readonly Seat[] {
        return [...this._seats];
    }

    addShow(show: Show): void {
        this.shows.push(show);
    }

    removeShow(showId: string): void {
        const showIndex = this.shows.findIndex((show) => show.id === showId);

        if (showIndex === -1) {
            throw new Error(`Show ${showId} does not exist on screen ${this._id}`);
        }

        this.shows.splice(showIndex, 1);
    }

    getShows(): readonly Show[] {
        return [...this.shows];
    }
}
