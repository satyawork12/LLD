import type { Show } from "./show.js";
import type { Seat } from "./seat.js";

export class Screen {
    private readonly shows: Show[] = [];

    constructor(
        public readonly theatreId: string,
        public readonly id: string,
        public readonly seats: Seat[] = [],
    ) { }

    addShow(show: Show): void {
        this.shows.push(show);
    }

    removeShow(showId: string): void {
        const showIndex = this.shows.findIndex((show) => show.id === showId);

        if (showIndex === -1) {
            throw new Error(`Show ${showId} does not exist on screen ${this.id}`);
        }

        this.shows.splice(showIndex, 1);
    }

    getShows(): readonly Show[] {
        return this.shows;
    }
}
