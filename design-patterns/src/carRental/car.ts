

export enum CarStatus {
    UnderMaintenance = "UNDER_MAINTENANCE",
    Operational = "OPERATIONAL"
} 

export class Car{
    id:number;
    status : CarStatus;

    constructor(id:number, status:CarStatus){
        this.id = id;
        this.status = status;
    }

}