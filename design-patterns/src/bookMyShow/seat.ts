export enum SeatType {
    Regular = "REGULAR",
    Premium = "PREMIUM",
    Recliner = "RECLINER",
}

export class Seat {
    constructor(
        private readonly _id: string,
        private readonly _screenId: string,
        private readonly _seatNumber: string,
        private readonly _seatType: SeatType,
    ) { }

    get id(): string { return this._id; }
    get screenId(): string { return this._screenId; }
    get seatNumber(): string { return this._seatNumber; }
    get seatType(): SeatType { return this._seatType; }
}
