import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Game } from '../model';


@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent {
  constructor(public game: Game) {
  }
}
