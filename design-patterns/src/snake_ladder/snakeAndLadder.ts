import type { Board } from "./board.js";
import type { Dice } from "./dice.js";
import type { Ladder } from "./ladder.js";
import type { Player } from "./player.js";
import type { Snake } from "./snake.js";

export abstract class SnakeAndLadder {
    protected turnSequence: Player[] = [];

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


class StandardSnakeAndLadder extends SnakeAndLadder {
    checkWinner(): boolean {
         const winnerFound = this.players.some((player)=>
            player.currentPosition===100
        )
        return winnerFound
    }
    playTurn(player: Player): void {
        const steps = this.dice.throwDice();
        if(player.currentPosition + steps > 100){
            return;
        }
        player.currentPosition = player.currentPosition + steps;
        const isSnakeBite = this.checkSnakeBite(player);
        if(isSnakeBite!=null){
            player.currentPosition = isSnakeBite.tail;
        }
        const isLadderClimbed = this.checkLadderClimb(player);
        if(isLadderClimbed!=null){
            player.currentPosition = isLadderClimbed.start;
        }
        const currPlayer = this.turnSequence.shift();
        this.turnSequence.push(currPlayer!);
        
    }
    checkSnakeBite(player: Player): Snake | null{
        const snakeWhichBites = this.board.snakes.find((snake)=>
            player.currentPosition===snake.startHead
        )
        return snakeWhichBites ?? null;
    };

    checkLadderClimb(player: Player): Ladder | null{
         const ladder = this.board.ladders.find((ladder)=>
            player.currentPosition===ladder.end
        )
        return ladder ?? null;
    };
}