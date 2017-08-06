import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cell } from '../../models/cell';

@Component({
  selector: 'cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})

export class CellComponent {
  @Input() cell: Cell;
  @Input() superman: boolean;

  public shouldDisplayCellContent(): boolean {
    return !this.cell.isFlag && (this.cell.isOpen || this.superman);
  }

  public shouldDisplayMinesAround(): boolean {
    return !this.cell.isMine && (this.cell.minesAround > 0);
  }
}
