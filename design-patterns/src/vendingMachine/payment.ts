




export class Payment{
    pay(amount:number):string{
        return crypto.randomUUID();
    }
    refund(transactionId:string):boolean{
        return true;
    }
}