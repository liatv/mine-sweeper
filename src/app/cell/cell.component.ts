import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cell } from '../model/cell';

@Component({
  selector: 'cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent {
  @Input() cell: Cell;
  @Input() superman: boolean;
}
