

export class Product {
    private readonly _id: string;
    public get id(): string {
        return this._id;
    }
    private _name: string;
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    private _price: number;
    public get price(): number {
        return this._price;
    }
    public set price(value: number) {
        this._price = value;
    }

    constructor(id: string, name: string, price: number) {
        this._id = id;
        this._name = name;
        this._price = price;
    }
    
}