import type { Board } from "./board.js";
import type { Player } from "./player.js";
import type { Mark, TickTacToe } from "./ticTacToe.js";
import { gameState } from "./ticTacToe.js";

export interface Move {

    move(move: [number, number],mark:Mark,player : Player): void;
    getTotalMove() : number;
}

export const TotalMove = 9

export class TickTacToeMove implements Move{

    constructor(
        private readonly board:Board,
        private readonly ticTacToe : TickTacToe,

        private moveCounter : number = 0,
        

    ) { }
    

    move(move: [number, number],mark:Mark,player : Player): void {
        if(this.ticTacToe.getGameState()==gameState.Completed){
            throw new Error("game is already completed")
        }
        if(this.getTotalMove() > TotalMove){
            throw new Error("Move exceeded");
        }
        let currPlayer = this.ticTacToe.getCurrPlayer();
        if(currPlayer!=player){
            throw new Error("wrong player")
        }
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
        this.ticTacToe.setCurrPlayer(currPlayer);
        this.moveCounter++;
         
    }
    getTotalMove(){
        return this.moveCounter;
    }

}