import { Position } from './position';


export class Cell {
    public isOpen = false;
    public isFlag = false;
    public isMine = false;
    public closeMines = 0;
    public position: Position;

    public state: CellState = CellState.close;

    constructor(position: Position) {
        this.position = position;
    }
}

export enum CellState { open, close, flag }
