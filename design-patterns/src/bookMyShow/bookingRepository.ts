import type { Booking } from "./booking.js";

export class BookingRepository {
    private readonly bookings = new Map<string, Booking>();

    save(booking: Booking): void {
        this.bookings.set(booking.id, booking);
    }

    getById(bookingId: string): Booking | undefined {
        return this.bookings.get(bookingId);
    }

    getByUserId(userId: string): Booking[] {
        return Array.from(this.bookings.values()).filter(
            (booking) => booking.bookedByUser === userId
        );
    }

    getAll(): Booking[] {
        return Array.from(this.bookings.values());
    }
}
