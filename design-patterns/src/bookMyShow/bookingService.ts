import { randomUUID } from "node:crypto";
import { Booking, BookingStatus, PaymentStatus } from "./booking.js";
import { Payment } from "./payment.js";
import { ShowRepository } from "./showRepository.js";
import { ShowSeat, ShowSeatStatus } from "./showSeat.js";
import { BookingRepository } from "./bookingRepository.js";
import { UserRepository } from "./userRepository.js";
import { error } from "node:console";

export class BookingService {
    constructor(
        private readonly showRepository: ShowRepository,
        private readonly paymentService: Payment,
        private readonly bookingRepository: BookingRepository,
        private readonly userRepository: UserRepository,
    ) { }
    book(seatIds: string[], showId: string, userId: string): Booking {
        // 1. Get the show
        if (new Set(seatIds).size !== seatIds.length) {
            throw new Error("Duplicate seats selected");
        }

        if (seatIds.length === 0) {
            throw new Error("Select at least one seat");
        }

        const show = this.showRepository.getById(showId);

        if (!show) {
            throw new Error("Show not found");
        }

        // 2. Validate and collect all selected ShowSeat objects
        const selectedShowSeats: ShowSeat[] = seatIds.map((id) => {
            const seat = show.getShowSeat(id);

            if (!seat || seat.status !== ShowSeatStatus.Available) {
                throw new Error(`Seat ${id} is unavailable`);
            }

            return seat;
        });

        // 3. Lock all selected seats
        const lockExpiry = new Date(Date.now() + 5 * 60 * 1000);

        let totalAmount = 0;

        try {

            for (const seat of selectedShowSeats) {


                seat.lock(userId, lockExpiry);
                totalAmount += seat.price;

            }

            // 4. Process payment

            const transactionId = this.paymentService.pay(totalAmount);

            if (!transactionId) {
                throw new Error("Payment failed");
            }
            const user = this.userRepository.getById(userId);

            if (!user) {
                throw new Error("User not found");
            }

            // 5. Create and confirm booking
            const booking = new Booking(
                randomUUID(),
                user,
                selectedShowSeats,
                showId,
                totalAmount,
                PaymentStatus.Paid,
                BookingStatus.Confirmed
            );

            // 6. Mark seats as booked
            for (const seat of selectedShowSeats) {
                seat.book(userId);
            }

            // 7. Store booking
            this.bookingRepository.save(booking);

            return booking;

        } catch (error) {
            // Release locks if payment or booking processing fails
            for (const seat of selectedShowSeats) {
                seat.release(userId);
            }

            throw error;
        }
    }
}