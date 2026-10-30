export class Player {
    public get currentPosition(): number {
        return this._currentPosition;
    }
    public set currentPosition(value: number) {
        this._currentPosition = value;
    }
    constructor(
        public readonly id: number,
        private _currentPosition: number,
    ) { }
}
