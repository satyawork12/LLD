export enum VehicleType {
    Car = "CAR",
    Bike = "BIKE",
    Truck = "TRUCK"
}

export class Vehicle {
    registrationNo: string;
    type: VehicleType;

    constructor(registrationNo: string, type: VehicleType) {
        this.registrationNo = registrationNo;
        this.type = type;
    }

}