import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { GameProvider } from '../../providers/game.provider';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent {
  @Input() superman;

  constructor(public game: GameProvider) {
  }
}
