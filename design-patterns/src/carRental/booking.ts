

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
    
    constructor(_carId:number,_startime:Date, _endTime:Date){
        this._carId = _carId;
        this._startTime = _startime;
        this._endTime = _endTime;
    }
    

    

}