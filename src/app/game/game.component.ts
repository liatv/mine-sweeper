import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Game } from '../model';

@Component({
    selector: 'game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
    constructor(public game: Game) {
    }

    ngOnInit() {
        this.game.newGame();
    }
}
