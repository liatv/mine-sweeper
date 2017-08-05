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

    // Comparing two cells - by thier positions
    public compare(compareCell: Cell): boolean {
        return this.position.column === compareCell.position.column && this.position.row === compareCell.position.row;
    }
}

export enum CellState { open, close, flag }
