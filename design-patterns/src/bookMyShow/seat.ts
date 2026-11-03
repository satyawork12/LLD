export enum SeatType {
    Regular = "REGULAR",
    Premium = "PREMIUM",
    Recliner = "RECLINER",
}

export class Seat {
    constructor(
        public readonly id: string,
        public readonly screenId: string,
        public readonly seatNumber: string,
        public readonly seatType: SeatType,
    ) { }
}
