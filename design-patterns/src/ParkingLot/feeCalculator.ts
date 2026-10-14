
import { ParkingTicket } from "./parkingTicket.js";
import { VehicleType } from "./vehicle.js";

export class FeeCalculator {
    private readonly hourlyRates: Record<VehicleType, number> = {
        [VehicleType.Car]: 20,
        [VehicleType.Bike]: 10,
        [VehicleType.Truck]: 40
    };

    calculateFee(ticket: ParkingTicket, exitTime: Date): number {
        const entryTime = ticket.getEntryTime();
        const vehicleType = ticket.getVehicle().type;

        // Calculate parking duration in milliseconds
        const durationMs = exitTime.getTime() - entryTime.getTime();

        if (durationMs < 0) {
            throw new Error("Exit time cannot be before entry time");
        }

        // Convert milliseconds to hours
        const durationHours = durationMs / (1000 * 60 * 60);

        // Round up, with minimum billing of 1 hour
        const billableHours = Math.max(1, Math.ceil(durationHours));

        // Get hourly rate for the vehicle
        const hourlyRate = this.hourlyRates[vehicleType];

        return billableHours * hourlyRate;
    }
}
