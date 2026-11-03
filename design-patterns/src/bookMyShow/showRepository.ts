import type { Show } from "./show.js";

export class ShowRepository {
    private readonly shows: Map<string, Show> = new Map();

    add(show: Show): void {
        this.shows.set(show.id, show);
    }

    getById(showId: string): Show | undefined {
        return this.shows.get(showId);
    }
}
