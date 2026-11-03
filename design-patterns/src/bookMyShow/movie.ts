export enum MovieGenre {
    Action = "ACTION",
    Comedy = "COMEDY",
    Drama = "DRAMA",
    Thriller = "THRILLER",
    Other = "OTHER",
}

export class Movie {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly durationInMinutes: number,
        public readonly genre: MovieGenre,
        public readonly language: string,
        public readonly rating: number,
    ) { }
}
