import { Position, Range, Square } from '../models';

export class GameHelpers {
    public static getIntergerInBoundaries(numberToValidate: number, min: number, max: number): number {
        if (numberToValidate < min) {
            return min;
        }

        if (numberToValidate > max) {
            return max;
        }

        return Math.floor(numberToValidate);
    }

    // returning the surrouning indexes of a cell
    public static getSurroundingIndexRange(index: number, length: number): Range {
        const range = {
            start: index - 1 > 0 ? index - 1 : 0,
            end: index + 2 < length ? index + 2 : length
        };
        return range;
    }

    // returning the cell surrounding square
    public static getSurroundingSquare(position: Position, maxRows: number, maxCols: number): Square {
        const rowRange = this.getSurroundingIndexRange(position.row, maxRows);
        const columnRange = this.getSurroundingIndexRange(position.column, maxCols);
        return { row: rowRange, column: columnRange };
    }
}
