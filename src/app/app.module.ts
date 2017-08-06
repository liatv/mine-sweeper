import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { GameComponent, BoardComponent, CellComponent, PanelComponent } from './components';
import { GameProvider } from './providers/game.provider';

@NgModule({
  declarations: [
    AppComponent, GameComponent, BoardComponent, CellComponent, PanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ GameProvider ],
  bootstrap: [AppComponent]
})

export class AppModule { }
