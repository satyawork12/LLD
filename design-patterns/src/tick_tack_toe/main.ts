import { Board } from "./board.js";
import { Player } from "./player.js";
import { TickTacToe } from "./ticTacToe.js";




const player1 = new Player("Satya");
const player2 = new Player("Shubham");
const board = new Board(3,3);
const mark = ["X","O"];
const tickTacToe = new TickTacToe([player1,player2],[player1,player2],board,mark);




