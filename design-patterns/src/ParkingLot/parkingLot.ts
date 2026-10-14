

/* responsibility of parkingLot

it will manage the parking floor;
it will manage the parking spot(add spot , park ,unpark);
it will manage the entry exit of vehicle 
it will manage the ticket and cost
Class	Primary responsibility
Vehicle	Represent a vehicle
ParkingSpot	Enforce parking rules and manage occupancy
ParkingFloor	Manage spots within a floor
ParkingLot	Coordinate operations across floors
Ticket (later)	Represent a parking session
FeeCalculator (later, if needed)	Calculate parking charges

*/

import { ParkingFloor } from "./parkingFloor.js";
import { ParkingSpot } from "./parkingSpot.js";
import { Vehicle, VehicleType } from "./vehicle.js";
import { ParkingTicket } from "./parkingTicket.js";
import { FeeCalculator } from "./feeCalculator.js";

export class ParkingLot {
    private parkingFloors: ParkingFloor[] = [];
    private activeTickets = new Map<String, ParkingTicket>;

    constructor(
        private readonly feeCalculator: FeeCalculator
    ) {}

    addParkingFloor(floor: ParkingFloor): void {
        const floorAddedAlready = this.parkingFloors.some((pf) => pf.getFloorNumber() === floor.getFloorNumber());
        if (floorAddedAlready) {
            throw new Error("Parking floor already exists");
        }
        this.parkingFloors.push(floor);
    }

    getAvailableSpot(type: VehicleType): ParkingSpot | null {
        for (const floor of this.parkingFloors) {
            const spot = floor.findAvailableSpot(type);

            if (spot) {
                return spot;
            }
        }

        return null;
    }

    parkVehicle(vehicle: Vehicle): ParkingTicket {
        if (this.activeTickets.has(vehicle.registrationNo)) {
            throw new Error(
                `Vehicle ${vehicle.registrationNo} is already parked`
            );
        }

        const spot = this.getAvailableSpot(vehicle.type);

        if (spot === null) {
            throw new Error("No parking spot available");
        }

        const ticket = new ParkingTicket(vehicle, spot);

        spot.park(vehicle);

        this.activeTickets.set(vehicle.registrationNo, ticket);

        return ticket;
    }

    exitVehicle(registrationNo: string): number {
        const ticket = this.activeTickets.get(registrationNo);

        if (!ticket) {
            throw new Error("No active ticket found");
        }

        const fee = this.feeCalculator.calculateFee(
            ticket,
            new Date()
        );

        const spot = ticket.getParkingSpot();
        spot.removeVehicle();

        this.activeTickets.delete(registrationNo);

        return fee;
    }

    getVehicleSpot(registrationNo: string): ParkingSpot | null {
        const ticket = this.activeTickets.get(registrationNo);

        if (!ticket) {
            return null;
        }

        return ticket.getParkingSpot();
    }


}

// const car = new Vehicle("10000",VehicleType.Car)
// const parkingLot = new ParkingLot();
// const firstParkingFloor = new ParkingFloor(1);
// const parkingSpot = new ParkingSpot(1,VehicleType.Car);
// firstParkingFloor.addSpot(parkingSpot)
// parkingLot.addParkingFloor(firstParkingFloor);
// parkingLot.parkVehicle(car);
// parkingLot.exitVehicle(car.registrationNo);
// parkingLot.exitVehicle(car.registrationNo);
// parkingLot.getVehicleSpot("10000")
// parkingLot.exitVehicle("UNKNOWN");
