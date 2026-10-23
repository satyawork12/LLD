

export class Dispense{
    dispense(productLocation:[number,number]):boolean{
        try{
            console.log(`dispensing the product from location ${productLocation[0],productLocation[1]}`);
            return true;
        }
        catch{
            throw new Error("There is some error in dispensing product")
        }

    }
}