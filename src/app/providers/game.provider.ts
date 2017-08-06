import { Injectable } from '@angular/core';
import { Cell, Position, GameConfig, Range, Square, GameHelpers } from '../models';
import * as _ from 'lodash';

@Injectable()
export class GameProvider {
    public rows: number;
    public columns: number;
    public mines: number;
    public flags: Cell[];
    public boardStructure: Cell[][];

    constructor() {
    }

    public cellCkicked(cell: Cell, e: any): void {
        if (cell.isOpen) {
            return;
        }

        // check if a flag should be marked
        if (e.shiftKey) {
            this.setFlage(cell);
            return;
        }

        if (cell.isMine) {
            this.informResult('LOST');
        }

        this.openCellArea(cell);
    }

    public newGame(gameConfig: GameConfig): GameConfig {
        const validatedGameConfig = this.gameSetup(gameConfig);

        // initiate the game inner cells
        for (let i = 0; i < this.rows; i++) {
            this.boardStructure[i] = [];
            for (let j = 0; j < this.columns; j++) {
                this.boardStructure[i][j] = new Cell({ row: i, column: j });
            }
        }

        this.setMinesRandomly();
        return validatedGameConfig;
    }

    private gameSetup(gameConfig: GameConfig): GameConfig {
        this.flags = [];
        this.boardStructure = [];

        const validatedConfig = this.validateConfig(gameConfig);
        this.rows = validatedConfig.rows;
        this.columns = validatedConfig.columns;
        this.mines = validatedConfig.mines;

        return validatedConfig;
    }

    private validateConfig(gameConfig: GameConfig): GameConfig {
        const validatedRows = GameHelpers.getIntergerInBoundaries(gameConfig.rows, 1, 300);
        const validatedColumns = GameHelpers.getIntergerInBoundaries(gameConfig.columns, 1, 300);

        // mines number can be at most as big as the boared
        const validatedMines = GameHelpers.getIntergerInBoundaries(gameConfig.mines, 1, (validatedRows * validatedColumns));

        return {
            rows: validatedRows,
            columns: validatedColumns,
            mines: validatedMines
        };
    }

    private setFlage(cell: Cell) {
        if (cell.isFlag) {
            cell.isFlag = false;

            // remove from flags
            this.flags = this.flags.filter(flaggedCell => !(flaggedCell.compare(cell)));
            return;
        }

        if (this.flags.length === this.mines) {
            alert('no more flags!');
            return;
        }

        cell.isFlag = true;
        this.flags.push(cell);
        this.checkWin();
    }

    private checkWin() {
        if (this.flags.length === this.mines) {
            const win = this.flags.every(c => c.isMine);
            if (win) {
                this.informResult('You WON');
            }
        }
    }

    private informResult(message) {
        setTimeout(() => {
            alert(message);

            this.newGame({ rows: this.rows, columns: this.columns, mines: this.mines });
        }, 100);
    }

    private calcMinesAroundCell(mine: Cell): void {
        const position = { row: mine.position.row, column: mine.position.column };
        const range = GameHelpers.getSurroundingSquare(position, this.rows, this.columns);

        for (let rowIndex = range.row.start; rowIndex < range.row.end; rowIndex++) {
            for (let colIndex = range.column.start; colIndex < range.column.end; colIndex++) {
                this.boardStructure[rowIndex][colIndex].minesAround++;
            }
        }
    }

    private setMinesRandomly(): void {
        const minesCells = this.getRandomCells(this.mines);

        for (const cell of minesCells) {
            this.setMine(this.boardStructure[cell.position.row][cell.position.column]);
        }
    }

    private getRandomCells(count: number): Cell[] {
        const shuffled = _.shuffle(_.flattenDeep(this.boardStructure));
        const minesCells = shuffled.slice(0, count);
        return minesCells;
    }

    private setMine(mine: Cell): void {
        mine.isMine = true;
        this.calcMinesAroundCell(mine);
    }

    private openCellArea(cell: Cell): void {
        if (!cell.isOpen && !cell.isFlag) {
            cell.isOpen = true;

            // calc if needs to reveal more area
            if (cell.minesAround === 0) {
                const position = { row: cell.position.row, column: cell.position.column };
                const cellSquare = GameHelpers.getSurroundingSquare(position, this.rows, this.columns);
                for (let rowIndex = cellSquare.row.start; rowIndex < cellSquare.row.end; rowIndex++) {
                    for (let colIndex = cellSquare.column.start; colIndex < cellSquare.column.end; colIndex++) {
                        this.openCellArea(this.boardStructure[rowIndex][colIndex]);
                    }
                }
            }
        }
    }
}
