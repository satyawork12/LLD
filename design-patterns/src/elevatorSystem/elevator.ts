
export enum Direction {
    up = "UP",
    down = "DOWN"
}

enum ElevatorState {
    Moving = "MOVING",
    Idle = "IDLE"
}

export class Elevator {

    private _currFloor: number = 0;

    public get currFloor(): number {
        return this._currFloor;
    }
    public set currFloor(value: number) {
        this._currFloor = value;
    }


    private _direction: Direction | null = null;

    public get direction(): Direction | null {
        return this._direction;
    }
    public set direction(value: Direction | null) {
        this._direction = value;
    }


    private _pendingFloor: Set<number> = new Set();
    public get pendingFloor(): Set<number> {
        return this._pendingFloor;
    }

    public set pendingFloor(value: number) {
        this._pendingFloor.add(value);
    }



    private _state: ElevatorState = ElevatorState.Idle;

    public get state(): ElevatorState {
        return this._state;
    }
    public set state(value: ElevatorState) {
        this._state = value;
    }


    private totalFloor: number;

    constructor(totalFloor: number) {
        this.totalFloor = totalFloor;
    }



    step() {
        const currFloor = this.currFloor;
        const direction = this.direction;
        const stops = [...this.pendingFloor];
        if (Direction.up === direction) {
            stops.filter((stop) => stop >= currFloor)
                .sort((a, b) => a - b)
        }
        else {
            stops.filter((stop) => stop <= currFloor)
            stops.sort((a, b) => b - a)
        }
        let currIndex = 0;
        let totalFloor = stops.length;
        while (currIndex < totalFloor) {
            console.log(`Moving towards ${stops[currIndex]}`);
            console.log(`opening gate at floor ${stops[currIndex]}`);
            currIndex++;
        }
        if (currFloor == this.totalFloor) {
            this.direction = Direction.down;
        }
    }

    addStop(floor: number, direction: Direction): boolean {
        const currDirection = this.direction;
        const currFloor = this.currFloor;
        if (direction == currDirection) {
            if (currDirection == Direction.down) {
                if (floor <= currFloor) {
                    this.pendingFloor = floor;
                    return true;
                }
            }
            else {
                if (floor >= currFloor) {
                    this.pendingFloor = floor;
                }
                return true;
            }
        }
        return false;
    }





}