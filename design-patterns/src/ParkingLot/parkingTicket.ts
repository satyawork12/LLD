import type { ParkingSpot } from "./parkingSpot.js";
import type { Vehicle } from "./vehicle.js";

export class ParkingTicket {
    private readonly ticketId: string;
    private readonly entryTime: Date;
    constructor(
        private readonly vehicle: Vehicle,
        private readonly parkingSpot: ParkingSpot,
    ) {
        this.ticketId = crypto.randomUUID();
        this.entryTime = new Date();
    }

    getTicketId(): string {
        return this.ticketId;
    }

    getParkingSpot(): ParkingSpot {
        return this.parkingSpot;
    }

    getEntryTime(): Date {
        return new Date(this.entryTime);
    }
    getVehicle(): Vehicle {
        return this.vehicle;
    }
}