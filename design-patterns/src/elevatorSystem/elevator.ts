
export enum Direction {
    up = "UP",
    down = "DOWN"
}

enum ElevatorState {
    Moving = "MOVING",
    Idle = "IDLE"
}

export class Elevator {
    private id: number;
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
    private get pendingFloor(): Set<number> {
        return this._pendingFloor;
    }

    private set pendingFloor(value: number) {
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

    constructor(totalFloor: number, id: number) {
        this.totalFloor = totalFloor;
        this.id = id;
    }



    step(floor:number) {
        if(this.pendingFloor.size==0){
            return;
        }
        if(this.currFloor>floor){
            this.currFloor++;
        }
        if(this.currFloor<floor){
            this.currFloor--;
        }
        
    }

    addStop(floor: number, direction: Direction): boolean {
        const currDirection = this.direction;
        const currFloor = this.currFloor;
        if (this.state == ElevatorState.Idle) {
            this.direction = direction;
            this.pendingFloor = floor;
            this.state = ElevatorState.Moving;
            return true;
        }
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
                    return true;
                }

            }
        }
        return false;
    }





}