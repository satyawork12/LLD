import type { Board } from "./board.js";
import type { Move } from "./move.js";
import type { Player } from "./player.js";


export interface Game {

   

    checkWinner() : boolean;

    nextMove(currentPlayer : Player) : Player;


}


