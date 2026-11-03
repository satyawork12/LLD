export enum ShowSeatStatus {
    Available = "AVAILABLE",
    Locked = "LOCKED",
    Booked = "BOOKED",
}

export class ShowSeat {
    constructor(
        public readonly showId: string,
        public readonly seatId: string,
        public status: ShowSeatStatus = ShowSeatStatus.Available,
        public lockedBy: string | null = null,
        public lockedExpiry: Date | null = null,
        public readonly price: number = 0,
    ) { }
}
