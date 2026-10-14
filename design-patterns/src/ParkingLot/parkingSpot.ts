import { VehicleType, Vehicle } from "./vehicle.js"


export class ParkingSpot {
    private readonly type: VehicleType;
    private readonly id: number;
    private vehicle: Vehicle | null = null

    constructor(id: number, type: VehicleType) {
        this.type = type;
        this.id = id;

    }
    park(vehicle: Vehicle): void {
        if (this.vehicle !== null) {
            throw new Error("Parking spot already occupied");
        }
        if (this.type !== vehicle.type) {
            throw new Error("Vehicle Type is not supported in this parking spot")
        }

        this.vehicle = vehicle;
    };

    removeVehicle(): void {
        if (this.vehicle === null) {
            throw new Error("Spot is already empty");
        }

        this.vehicle = null;
    };

    isAvailable(): boolean {
        return this.vehicle === null;
    };

    getType(): VehicleType {
        return this.type;
    }
    getId(): number {
        return this.id
    }
}