export enum ShowSeatStatus {
    Available = "AVAILABLE",
    Locked = "LOCKED",
    Booked = "BOOKED",
}

export class ShowSeat {
    constructor(
        private readonly _showId: string,
        private readonly _seatId: string,
        private _status: ShowSeatStatus = ShowSeatStatus.Available,
        private _lockedBy: string | null = null,
        private _lockedExpiry: Date | null = null,
        private readonly _price: number = 0,
    ) { }

    get showId(): string { return this._showId; }
    get seatId(): string { return this._seatId; }
    get status(): ShowSeatStatus { return this._status; }
    get lockedBy(): string | null { return this._lockedBy; }
    get lockedExpiry(): Date | null {
        return this._lockedExpiry === null ? null : new Date(this._lockedExpiry);
    }
    get price(): number { return this._price; }

    lock(userId: string, expiry: Date): void {
        const now = new Date();
        if (this._status === ShowSeatStatus.Booked || (this.status == ShowSeatStatus.Locked && this.lockedExpiry! > now)) {
            throw new Error(`Seat ${this._seatId} is not available`);
        }
        this._status = ShowSeatStatus.Locked;
        this._lockedBy = userId;
        this._lockedExpiry = new Date(expiry);
    }

    book(userId: string): void {
        if (
            this._status !== ShowSeatStatus.Locked ||
            this._lockedBy !== userId ||
            !this._lockedExpiry ||
            this._lockedExpiry.getTime() <= Date.now()
        ) {
            throw new Error("Seat lock is invalid or expired");
        }
        this._status = ShowSeatStatus.Booked;
        this._lockedBy = null;
        this._lockedExpiry = null;
    }

    release(userId: string): void {
        if (
            this._status !== ShowSeatStatus.Locked ||
            this._lockedBy !== userId
        ) {
            throw new Error("Cannot release this seat");
        }
        this._status = ShowSeatStatus.Available;
        this._lockedBy = null;
        this._lockedExpiry = null;
    }

}
