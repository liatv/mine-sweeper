import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { BoardComponent } from './board/board.component';
import { CellComponent } from './cell/cell.component';
import { PanelComponent } from './panel/panel.component';
import { Game } from './model';

@NgModule({
  declarations: [
    AppComponent, GameComponent, BoardComponent, CellComponent, PanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ Game ],
  bootstrap: [AppComponent]
})
export class AppModule { }
