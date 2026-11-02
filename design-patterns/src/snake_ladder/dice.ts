export class Dice {
    constructor(private readonly faces: number) {
        if (!Number.isInteger(faces) || faces < 1) {
            throw new Error("Dice must have at least one face");
        }
    }

    roll(): number {
        return Math.floor(Math.random() * this.faces) + 1;
    }
}