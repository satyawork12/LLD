import { Booking } from "./booking.js";


export class BookingManager {
    private bookingPeriod: Booking[] = [];
    isCarAvailable(carId: number, startTime: Date, endTime: Date): boolean | null {
        const allBookingForGivenCar = this.bookingPeriod.filter((booking) => booking.carId === carId);
        let isAvailable: boolean | null = null
        for (let bookedCar of allBookingForGivenCar) {
            const bookedStart = bookedCar.startTime;
            const bookedEnd = bookedCar.endTime
            if (!(bookedStart <= startTime && startTime < bookedEnd ||
                bookedStart < endTime && endTime < bookedEnd ||
                (bookedStart < startTime && startTime < bookedEnd) && (bookedStart < endTime && endTime < bookedEnd)
            )) {
                isAvailable = true;
            }
        }

        return isAvailable;
    }
    book(carId: number, startTime: Date, endTime: Date): boolean {
        const isAvailable = this.isCarAvailable(carId, startTime, endTime);
        if (isAvailable) {
            const booking: Booking = new Booking(carId, startTime, endTime);
            this.bookingPeriod.push(booking);
            return true;
        }
        else {
            console.log("car is not available for that period")
        }
        return false
    }
    cancelBooking(carId: number) {
        let index;
        const bookingDetails = this.bookingPeriod.filter((booking, index) => {
            if (booking.carId == carId) {
                index = index;
                return true
            }
        })
        if (index != undefined) {

            bookingDetails.splice(index, 1)
        }
        else{
            console.log("booking details not found")
        }

    }
}