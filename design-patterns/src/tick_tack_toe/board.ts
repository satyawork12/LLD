

export class Board {
    private cells: number[][];

    constructor(rows: number, columns: number) {
        this.cells = new Array(rows);
        for (let i = 0; i < rows; i++) {
            this.cells[i] = new Array(columns).fill(0);
        }
    }

    getLastRow(): number {
        return this.cells.length - 1;
    }

    getLastColumn(): number {
        return this.cells[0]!.length - 1;
    }

    placeMark(row: number, column: number, value: number): void {
        if (this.cells[row]?.[column] !== 0) {
            throw new Error("Cell is occupied or invalid");
        }

        this.cells[row]![column] = value;
    }

    getValue(row: number, column: number): number | undefined {
        const value = this.cells[row]![column];
        return value;
    }

}