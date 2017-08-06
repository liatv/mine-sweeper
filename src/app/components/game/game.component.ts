import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { GameProvider } from '../../providers/game.provider';
import { GameConfig } from '../../models';

@Component({
    selector: 'game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {
    public rows: number;
    public columns: number;
    public mines: number;
    public superman: boolean;

    constructor(public game: GameProvider) {
        this.rows = 6;
        this.columns = 6;
        this.mines = 6;
    }

    ngOnInit() {
        this.newGame({rows: this.rows, columns: this.columns, mines: this.mines});
    }

    public newGame(gameConfig: GameConfig): void {
        const validatedGameConfig = this.game.newGame(gameConfig);
        this.rows = validatedGameConfig.rows;
        this.columns = validatedGameConfig.columns;
        this.mines = validatedGameConfig.mines;
    }

    public supermanClicked(superman: boolean): void {
        this.superman = superman;
    }
}
