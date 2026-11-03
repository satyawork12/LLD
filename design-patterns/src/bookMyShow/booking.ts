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
        public readonly id: string,
        public readonly bookedByUser: User,
        public readonly bookedSeats: ShowSeat[],
        public readonly showId: string,
        public readonly amountPaid: number,
        public paymentStatus: PaymentStatus = PaymentStatus.Pending,
        public bookingStatus: BookingStatus = BookingStatus.Created,
    ) { }

}
