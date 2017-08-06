import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GameConfig } from '../../models';

@Component({
  selector: 'panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})

export class PanelComponent {
  @Input() rows: number;
  @Input() columns: number;
  @Input() mines: number;
  @Input() flageRemain: number;
  @Input() superman: boolean;
  @Output() newGame: EventEmitter<GameConfig>= new EventEmitter<GameConfig>();
  @Output() supermanClicked: EventEmitter<boolean>= new EventEmitter<boolean>();

  public clickedNewGame() {
    if (this.newGame) {
      this.newGame.emit({rows: this.rows, columns: this.columns, mines: this.mines});
    }
  }

  public supermanChanged() {
    this.superman = !this.superman;
    if (this.supermanClicked) {
      this.supermanClicked.emit(this.superman);
    }
  }
}
