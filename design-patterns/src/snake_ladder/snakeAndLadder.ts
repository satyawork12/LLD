import type { Board } from "./board.js";
import type { Dice } from "./dice.js";
import type { Ladder } from "./ladder.js";
import type { Player } from "./player.js";
import type { Snake } from "./snake.js";

enum GameState {
    Active = "ACTIVE",
    Won = "WON"
}
export abstract class SnakeAndLadder {
    constructor(
        protected readonly board: Board,
        protected readonly players: Player[],
        protected readonly gameOpener: Player,
        protected readonly dice: Dice,
        protected readonly turnSequencePlayers: Player[],
    ) { }

    abstract checkWinner(): boolean;

    abstract playTurn(player: Player): void;

    abstract checkSnakeBite(player: Player): Snake | null;

    abstract checkLadderClimb(player: Player): Ladder | null;
}


export class StandardSnakeAndLadder extends SnakeAndLadder {
    private gameState : GameState = GameState.Active;
    checkWinner(): boolean {
         const winnerFound = this.players.some((player)=>
            player.currentPosition===this.board.row * this.board.column
        )
        return winnerFound
    }
    playTurn(player: Player): void {
        if(this.gameState===GameState.Won){
            return ;
        }
        const steps = this.dice.throwDice();
        const currPlayer = this.turnSequencePlayers.shift();
        if(currPlayer==undefined){
            return ;
        }
        this.turnSequencePlayers.push(currPlayer!);
        if(currPlayer.currentPosition + steps > this.board.row * this.board.column){
            return;
        }
        currPlayer.currentPosition = currPlayer.currentPosition + steps;
        const isSnakeBite = this.checkSnakeBite(currPlayer);
        if(isSnakeBite!=null){
            currPlayer.currentPosition = isSnakeBite.tail;
        }
        const isLadderClimbed = this.checkLadderClimb(currPlayer);
        if(isLadderClimbed!=null){
            currPlayer.currentPosition = isLadderClimbed.to;
        }
        if(this.checkWinner()){
            this.gameState = GameState.Won;
        }
        
    }
    checkSnakeBite(player: Player): Snake | null{
        const snakeWhichBites = this.board.snakes.find((snake)=>
            player.currentPosition===snake.startHead
        )
        return snakeWhichBites ?? null;
    };

    checkLadderClimb(player: Player): Ladder | null{
         const ladder = this.board.ladders.find((ladder)=>
            player.currentPosition===ladder.from
        )
        return ladder ?? null;
    };
}