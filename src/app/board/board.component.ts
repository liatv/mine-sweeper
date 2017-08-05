import { Component, Input, OnInit } from '@angular/core';
import { Cell, Position } from '../model';
import * as _ from 'lodash';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  public rows = 6;
  public columns = 6;
  public mines = 6;
  public flags: Cell[];
  public boardStructure: Cell[][];
  public superman = false;

  ngOnInit() {
    this.newGame();
  }

  public openCell(cell: Cell, e) {
    if (e.shiftKey) {
      if (cell.isOpen) {
        return;
      }

      if (cell.isFlag) {
        cell.isFlag = false;
        this.flags = this.flags.filter((flaggedCell) => {
          return !(flaggedCell.position.column === cell.position.column && flaggedCell.position.row === cell.position.row);
        });
      } else {
        if (this.flags.length === this.mines) {
          this.inform('no more flags!');
        } else {
          cell.isFlag = true;
          this.flags.push(cell);
          if (this.flags.length === this.mines) {
            const win = this.flags.every((c) => c.isMine);
            if (win) {
              this.inform('You won');
            }
          }
        }
      }
    } else if (!cell.isFlag) {
      if (cell.isMine) {
        this.inform('LOST');
        return;
      }
      this.openCellArea(cell);
    }
  }

  private inform(message) {
    setTimeout(() => alert(message), 100);
  }

  public newGame() {
    this.flags = [];
    this.boardStructure = [];
    for (let i = 0; i < this.rows; i++) {
      this.boardStructure[i] = [];
      for (let j = 0; j < this.columns; j++) {
        this.boardStructure[i][j] = new Cell({ row: i, column: j });
      }
    }

    this.generateMineLocation();
  }

  private updateCloseCellToMine(mine: Cell): void {
    const range = this.getRange(mine.position.row, mine.position.column);

    for (let rowIndex = range.row.start; rowIndex < range.row.end; rowIndex++) {
      for (let colIndex = range.column.start; colIndex < range.column.end; colIndex++) {
        this.boardStructure[rowIndex][colIndex].closeMines++;
      }
    }
  }

  // { start: number, end: number } should be a deffrent class?
  private getDieractionRange(index: number, length: number): { start: number, end: number } {
    const dierectionRange = {
      start: index - 1 > 0 ? index - 1 : 0,
      end: index + 2 < length ? index + 2 : length
    };
    return dierectionRange;
  }

  private getRange(cellRow: number, cellColumn: number): { row: { start: number, end: number }, column: { start: number, end: number } } {
    const rowRange = this.getDieractionRange(cellRow, this.rows);
    const columnRange = this.getDieractionRange(cellColumn, this.columns);
    return { row: rowRange, column: columnRange };
  }

  private setMine(mine: Cell) {
    mine.isMine = true;
    this.updateCloseCellToMine(mine);
  }

  private generateMineLocation(): void {
    const shuffled = _.shuffle(_.flattenDeep(this.boardStructure));
    const minesCells = shuffled.slice(0, this.mines);

    for (const cell of minesCells) {
      this.setMine(this.boardStructure[cell.position.row][cell.position.column]);
    }
  }

  private openCellArea(cell: Cell) {
    if (!cell.isOpen) {
      cell.isOpen = true;
      if (cell.closeMines === 0) {
        cell.isOpen = true;

        const range = this.getRange(cell.position.row, cell.position.column);
        for (let rowIndex = range.row.start; rowIndex < range.row.end; rowIndex++) {
          for (let colIndex = range.column.start; colIndex < range.column.end; colIndex++) {
            this.openCellArea(this.boardStructure[rowIndex][colIndex]);
          }
        }
      }
    }
  }
}
