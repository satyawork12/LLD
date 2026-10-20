import type { Direction, Elevator } from "./elevator.js";

class ElevatorSystem {
    elevators: Elevator[];
    constructor(elevators: Elevator[]) {
        this.elevators = elevators;
    }

    requestElevator(requestFromFloor: number, direction: Direction): boolean {
        let requestAdded = false;
        for (let elevator of this.elevators) {
            if (elevator.addStop(requestFromFloor, direction)) {
                requestAdded = true;
                break;
            }
        }
        return requestAdded;
    }


}