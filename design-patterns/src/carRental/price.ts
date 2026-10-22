

export class Price {
    priceMap : Map<number,number>=new Map();

    addPrice(carId:number,price:number){
        this.priceMap.set(carId,price);
    }
    getPrice(carId:number):number|null{
        const price = this.priceMap.get(carId);
        if(price!=undefined){
            return price;
        }
        return null;
    }


}