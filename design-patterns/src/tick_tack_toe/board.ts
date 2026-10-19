

export class Board {
    private cells: number[][];

    constructor(rows: number, columns: number) {
        this.cells = new Array(rows);
        for (let i = 0; i < rows; i++) {
            this.cells[i] = new Array(columns).fill("");
        }
    }

    getLastRow(): number {
        return this.cells.length - 1;
    }

    getLastColumn(): number {
        return this.cells[0]!.length - 1;
    }

    getCells(): number[][] {
        return this.cells;
    }
    placeMark(row: number, column: number, value: number): void {
        this.cells[row]![column] = value;
    }

}