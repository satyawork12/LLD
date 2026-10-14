import { ParkingSpot } from "./parkingSpot.js"
import { VehicleType } from "./vehicle.js";


export class ParkingFloor {
    private spots: ParkingSpot[] = [];
    constructor(private readonly floorNumber: number) { }

    addSpot(spot: ParkingSpot): void {
        const exists = this.spots.some(
            (current) => current.getId() === spot.getId()
        );

        if (exists) {
            throw new Error("Parking spot already exists");
        }

        this.spots.push(spot);
    }

    findAvailableSpot(type: VehicleType): ParkingSpot | null {
        // Your implementation
        return this.spots.find((spot) => spot.isAvailable() && spot.getType() === type) ?? null
    }

    getAvailableSpotCount(): number {
        // Your implementation
        let count = 0;
        this.spots.forEach((spot) => {
            if (spot.isAvailable()) count++;
        })
        return count;
    }
    getFloorNumber(): number {
        return this.floorNumber;
    }
}