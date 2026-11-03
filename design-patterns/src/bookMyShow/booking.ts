import type { ShowSeat } from "./showSeat.js";
import type { User } from "./user.js";

export enum PaymentStatus {
    Pending = "PENDING",
    Paid = "PAID",
    Failed = "FAILED",
}

export enum BookingStatus {
    Created = "CREATED",
    Confirmed = "CONFIRMED",
    Cancelled = "CANCELLED",
}

export class Booking {
    constructor(
        private readonly _id: string,
        private readonly _bookedByUser: User,
        bookedSeats: ShowSeat[],
        private readonly _showId: string,
        private readonly _amountPaid: number,
        private _paymentStatus: PaymentStatus = PaymentStatus.Pending,
        private _bookingStatus: BookingStatus = BookingStatus.Created,
    ) {
        this._bookedSeats = [...bookedSeats];
    }

    private readonly _bookedSeats: ShowSeat[];

    get id(): string { return this._id; }
    get bookedByUser(): User { return this._bookedByUser; }
    get bookedSeats(): readonly ShowSeat[] { return [...this._bookedSeats]; }
    get showId(): string { return this._showId; }
    get amountPaid(): number { return this._amountPaid; }
    get paymentStatus(): PaymentStatus { return this._paymentStatus; }
    get bookingStatus(): BookingStatus { return this._bookingStatus; }

    markPaymentSuccessful(): void {
        this._paymentStatus = PaymentStatus.Paid;
    }

    markPaymentFailed(): void {
        this._paymentStatus = PaymentStatus.Failed;
    }

    confirm(): void {
        if (this._paymentStatus !== PaymentStatus.Paid) {
            throw new Error("Booking cannot be confirmed before payment succeeds");
        }
        this._bookingStatus = BookingStatus.Confirmed;
    }

    cancel(): void {
        this._bookingStatus = BookingStatus.Cancelled;
    }

}
