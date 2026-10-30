import type { Ladder } from "./ladder.js";
import type { Snake } from "./snake.js";

export class Board {
    constructor(
        public readonly row: number,
        public readonly column: number,
        public readonly ladders: Ladder[],
        public readonly snakes: Snake[],
    ) { }
}
