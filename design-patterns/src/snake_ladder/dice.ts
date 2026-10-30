export abstract class Dice {
    constructor(
        public readonly faces: number,
    ) { }

    abstract throwDice(): number;
}


export class SixSidedDice extends Dice{
    throwDice(): number {
        const randomNumber = Math.floor(Math.random()*6 + 1);
        return randomNumber;
    }
}
