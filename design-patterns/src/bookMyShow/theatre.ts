import type { Screen } from "./screen.js";

export class Theatre {
    private readonly _screens: Screen[];

    constructor(
        private readonly _id: string,
        private readonly _address: string,
        private readonly _city: string,
        screens: Screen[] = [],
    ) {
        this._screens = [...screens];
    }

    get id(): string { return this._id; }
    get address(): string { return this._address; }
    get city(): string { return this._city; }

    getScreens(): readonly Screen[] {
        return [...this._screens];
    }

    addScreen(screen: Screen): void {
        if (screen.theatreId !== this._id) {
            throw new Error(`Screen ${screen.id} belongs to another theatre`);
        }
        this._screens.push(screen);
    }
}
