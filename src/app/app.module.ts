import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { BoardComponent } from './board/board.component';
import { CellComponent } from './cell/cell.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent, GameComponent, BoardComponent, CellComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
