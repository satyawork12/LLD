import { Booking } from "./booking.js";
import { CarStatus, type Car } from "./car.js";
import { Payment } from "./payment.js";
import { Price } from "./price.js";


export class BookingManager {
    private bookingPeriod: Booking[] = [];
    private payment: Payment = new Payment();
    private price: Price = new Price();
    isCarAvailable(car: Car, carId: number, startTime: Date, endTime: Date): boolean | null {
        const carStatus = car.getStatus();
        if (carStatus == CarStatus.UnderMaintenance) {
            return false;
        }
        const allBookingForGivenCar = this.bookingPeriod.filter((booking) => booking.carId === carId);
        let isAvailable: boolean = true
        for (let bookedCar of allBookingForGivenCar) {
            const bookedStart = bookedCar.startTime;
            const bookedEnd = bookedCar.endTime

            if ((bookedStart <= startTime && startTime < bookedEnd ||
                bookedStart < endTime && endTime < bookedEnd ||
                (bookedStart < startTime && startTime < bookedEnd) && (bookedStart < endTime && endTime < bookedEnd) ||
                (bookedStart > startTime && bookedEnd < endTime)
            )) {
                isAvailable = false;
            }
        }

        return isAvailable;
    }
    book(car: Car, startTime: Date, endTime: Date, userId: number,): boolean {
        const carId = car.id;
        const isAvailable = this.isCarAvailable(car, carId, startTime, endTime);
        const price = this.price.getPrice(carId);
        if (!price) {
            console.log("price is not found for that car")
            return false
        }
        if (isAvailable) {
            const amountPaid = this.payment.pay(price);
            const bookingId = crypto.randomUUID();
            if (amountPaid) {
                const booking: Booking = new Booking(car, carId, startTime, endTime, bookingId, userId, price);
                this.bookingPeriod.push(booking);
                return true;
            }
            console.log("booking failed")
            return false;

        }
        else {
            console.log("car is not available for that period")
        }
        return false
    }
    cancelBooking(bookingId: string) {
        const index = this.bookingPeriod.findIndex(booking => booking.bookingId === bookingId);

        // findIndex returns -1 if no match is found
        if (index !== -1) {
            this.bookingPeriod.splice(index, 1);
        } else {
            console.log("booking details not found");
        }

    }
}