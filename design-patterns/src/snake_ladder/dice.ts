export abstract class Dice {
    
    constructor(
        public readonly faces: number,
    ) { }

    abstract throwDice(): number;
}


export class SixSidedDice extends Dice{
    
    constructor(faces:number){
        super(faces);
    }
    throwDice(): number {
        const randomNumber = Math.floor(Math.random()*this.faces + 1);
        return randomNumber;
    }
}
