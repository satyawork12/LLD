
import { ParkingLot } from "./parkingLot.js";
import { ParkingFloor } from "./parkingFloor.js";
import { ParkingSpot } from "./parkingSpot.js";
import { Vehicle, VehicleType } from "./vehicle.js";
import { FeeCalculator } from "./feeCalculator.js";

// 1. Create FeeCalculator and ParkingLot
const feeCalculator = new FeeCalculator();
const parkingLot = new ParkingLot(feeCalculator);

// 2. Create parking floors
const floor1 = new ParkingFloor(1);
const floor2 = new ParkingFloor(2);

// 3. Add parking spots to Floor 1
floor1.addSpot(new ParkingSpot(101, VehicleType.Car));
floor1.addSpot(new ParkingSpot(102, VehicleType.Bike));
floor1.addSpot(new ParkingSpot(103, VehicleType.Truck));

// 4. Add parking spots to Floor 2
floor2.addSpot(new ParkingSpot(201, VehicleType.Car));
floor2.addSpot(new ParkingSpot(202, VehicleType.Car));
floor2.addSpot(new ParkingSpot(203, VehicleType.Bike));

// 5. Register floors with ParkingLot
parkingLot.addParkingFloor(floor1);
parkingLot.addParkingFloor(floor2);

// 6. Create vehicles
const car1 = new Vehicle("DL01AB1234", VehicleType.Car);
const car2 = new Vehicle("DL02CD5678", VehicleType.Car);
const car3 = new Vehicle("DL03EF9012", VehicleType.Car);
const car4 = new Vehicle("DL04GH3456", VehicleType.Car);

const bike1 = new Vehicle("DL05XY1234", VehicleType.Bike);
const truck1 = new Vehicle("DL06TR5678", VehicleType.Truck);

// 7. Park vehicles
console.log("\n--- PARKING VEHICLES ---");

const ticket1 = parkingLot.parkVehicle(car1);
console.log("Car 1 ticket:", ticket1.getTicketId());

const ticket2 = parkingLot.parkVehicle(car2);
console.log("Car 2 ticket:", ticket2.getTicketId());

const ticket3 = parkingLot.parkVehicle(car3);
console.log("Car 3 ticket:", ticket3.getTicketId());

parkingLot.parkVehicle(bike1);
parkingLot.parkVehicle(truck1);

// 8. Check parking availability
console.log("\n--- AVAILABLE SPOTS ---");

console.log("Floor 1:", floor1.getAvailableSpotCount());
console.log("Floor 2:", floor2.getAvailableSpotCount());

// 9. Test duplicate parking
console.log("\n--- DUPLICATE PARKING TEST ---");

try {
    parkingLot.parkVehicle(car1);
} catch (error) {
    console.log("Expected error:", (error as Error).message);
}

// 10. Test parking when all car spots are occupied
console.log("\n--- PARKING FULL TEST ---");

try {
    parkingLot.parkVehicle(car4);
} catch (error) {
    console.log("Expected error:", (error as Error).message);
}

// 11. Find the assigned parking spot
console.log("\n--- VEHICLE SPOT LOOKUP ---");

const assignedSpot = parkingLot.getVehicleSpot(car1.registrationNo);

console.log("Car 1 assigned spot:", assignedSpot?.getId());

// 12. Exit vehicle and calculate fee
console.log("\n--- VEHICLE EXIT ---");

const fee = parkingLot.exitVehicle(car1.registrationNo);

console.log("Car 1 parking fee:", fee);

// 13. Verify the released spot is available
console.log("\n--- REUSE PARKING SPOT ---");

const newTicket = parkingLot.parkVehicle(car4);

console.log("Car 4 ticket:", newTicket.getTicketId());

const newSpot = parkingLot.getVehicleSpot(car4.registrationNo);

console.log("Car 4 assigned spot:", newSpot?.getId());

// 14. Test exiting twice
console.log("\n--- DOUBLE EXIT TEST ---");

try {
    parkingLot.exitVehicle(car1.registrationNo);
} catch (error) {
    console.log("Expected error:", (error as Error).message);
}

console.log("\n--- TESTING COMPLETED ---");
