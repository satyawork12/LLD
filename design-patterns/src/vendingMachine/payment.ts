




export class Payment{
    pay(amount:number):string | null{
        return crypto.randomUUID();
    }
    refund(transactionId:string):boolean{
        return true;
    }
}