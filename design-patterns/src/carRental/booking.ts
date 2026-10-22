import type { Car } from "./car.js";


export class Booking{
    private readonly _carId: number;
    public get carId(): number {
        return this._carId;
    }
    private _startTime: Date;
    public get startTime(): Date {
        return this._startTime;
    }
    private _endTime: Date;
    public get endTime(): Date {
        return this._endTime;
    }
    private _car: Car;
    public get car(): Car {
        return this._car;
    }
  
    private bookingId : string ;
    private userId : number;
    private totalAmount : number;

    
    constructor(_car:Car,_carId:number,_startime:Date, _endTime:Date,bookingId:string,userId : number,totalAmount : number){
        this._carId = _carId;
        this._startTime = _startime;
        this._endTime = _endTime;
        this._car = _car;
        this.bookingId = bookingId;
        this.userId = userId;
        this.totalAmount = totalAmount;
    }
    

    

}