import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Game } from '../model';

@Component({
  selector: 'panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent {
//   @Input() rows: number;
//   @Input() columns: number;
//   @Input() mines: number;
//   @Input() superman: boolean;
//   @Output() newGame: EventEmitter<any>= new EventEmitter();

constructor(public game: Game) {
  }

}
