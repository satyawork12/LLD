import type { Board } from "./board.js";
import type { Player } from "./player.js";

export interface Move {
    board: Board;
    move(move: [number, number]): void;
    checkWinner(): boolean
}


export class tickTacToeMove {

    constructor(
        private readonly board: Board
        

    ) { }
    

    move(move: [number, number],mark:String): void {
        const x = move[0];
        const y = move[1];

        const boardLastRow = this.board.getLastRow();
        const boardLastColumn = this.board.getLastColumn();

        if (x < 0 || x > boardLastRow) {
            throw new Error("Invalid row");
        }

        if (y < 0 || y > boardLastColumn) {
            throw new Error("Invalid column");
        }
        const value = mark=="X" ? 1 : -1;
        this.board.placeMark(x,y,value);
         
    }

}