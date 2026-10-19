import { Board } from "./board.js";
import type { Game } from "./game.js";
import type { Move, TickTacToeMove } from "./move.js";
import type { Player } from "./player.js";

export enum gameState {
    "Active" = "ACTIVE",
    "Completed" = "COMPLETED"
}
export type Mark = "X" | "O";
     


export class TickTacToe implements Game {
    private gameState: gameState = gameState.Active;
    private currPlayer : Player | null = null;
    constructor(
        private readonly player: Player[],
        private readonly movePattern: Player[],
        private readonly board: Board,
        private move : TickTacToeMove,
    ) { }

    sumOfRow(row: number): number {
        // const cells = this.board.getCells();
        // const selectedRow = cells[row];

        // if (!selectedRow) {
        //     throw new Error("Invalid row");
        // }
        const lastColumn: number = this.board.getLastColumn();


        let sum = 0;

        for (let i = 0; i <= lastColumn; i++) {
            const value = this.board.getValue(row, i);

            if (value !== undefined) {
                sum += value;
            }
        }

        return sum;
    }
    sumOfColumn(column: number): number {
        let sum = 0;
        const getLastRow = this.board.getLastRow();

        for (let i = 0; i <= getLastRow; i++) {
            const value = this.board.getValue(i, column);

            if (value !== undefined) {
                sum += value;
            }
        }

        return sum;
    }
    sumOfPrimaryDiagonal(): number {
        let sum = 0;
        const getLastRow = this.board.getLastRow();

        for (let i = 0; i <= getLastRow; i++) {
            const value = this.board.getValue(i, i);

            if (value != undefined) {
                sum += value;
            }

        }

        return sum;
    }

    sumOfSecondaryDiagonal(): number {
        let sum = 0;
        const getLastRow = this.board.getLastRow();
        const getLastColumn = this.board.getLastColumn();

        for (let i = 0; i <= getLastRow; i++) {
            const value = this.board.getValue(i, getLastColumn - i);

            if (value != undefined) {
                sum += value;
            }

        }

        return sum;
    }
    checkWinner(): boolean {
        const lastRows = this.board.getLastRow();
        const lastColumn = this.board.getLastColumn();

        for (let row = 0; row <= lastColumn; row++) {
            const sum = this.sumOfRow(row);
            if (sum == -3 || sum == 3) {
                return true;
            }
        }

        for (let column = 0; column <= lastRows; column++) {
            const sum = this.sumOfColumn(column);
            if (sum == -3 || sum == 3) {
                return true;
            }
        }
        const sumOfPrimaryDiagonal = this.sumOfPrimaryDiagonal();
        const sumOfSecondaryDiagonal = this.sumOfSecondaryDiagonal();
        if (sumOfPrimaryDiagonal == -3 || sumOfPrimaryDiagonal == 3 || sumOfSecondaryDiagonal == 3 || sumOfSecondaryDiagonal == -3) {
            return true;
        }
        const totalMove = this.move.getTotalMove();
        if(totalMove==9){
            this.gameState = gameState.Completed;
            return false;
        } 
        return false;
    }

    nextMove(currentPlayer: Player): Player {
        const n = this.movePattern.length;

        if (n === 0) {
            throw new Error("No players available");
        }

        if (!currentPlayer) {
            const firstPlayer = this.movePattern[0];

            if (firstPlayer === undefined) {
                throw new Error("No players available");
            }

            return firstPlayer;
        }

        let nextPlayer: Player | undefined;

        for (let i = 0; i < n; i++) {
            if (this.movePattern[i] === currentPlayer) {
                nextPlayer = this.movePattern[(i + 1) % n];
                break;
            }
        }

        if (nextPlayer === undefined) {
            throw new Error("Next player not found");
        }

        return nextPlayer; //
    }
    getCurrPlayer(){
        return this.currPlayer;
    }
    setCurrPlayer(player:Player){
        this.currPlayer = player;
    }
    getGameState() : gameState{
        return this.gameState;
    }
}


//  player : Player[];
//     movePattern : Player[];
//     board : Board
