export enum MovieGenre {
    Action = "ACTION",
    Comedy = "COMEDY",
    Drama = "DRAMA",
    Thriller = "THRILLER",
    Other = "OTHER",
}

export class Movie {
    constructor(
        private readonly _id: string,
        private readonly _name: string,
        private readonly _durationInMinutes: number,
        private readonly _genre: MovieGenre,
        private readonly _language: string,
        private readonly _rating: number,
    ) { }

    get id(): string { return this._id; }
    get name(): string { return this._name; }
    get durationInMinutes(): number { return this._durationInMinutes; }
    get genre(): MovieGenre { return this._genre; }
    get language(): string { return this._language; }
    get rating(): number { return this._rating; }
}
