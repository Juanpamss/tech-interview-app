import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { HomeComponent } from './home/home.component';
import {boardReducer} from "./board/state/board.reducer";
import {StoreModule} from "@ngrx/store";
import { GameInfoComponent } from './game-info/game-info.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    HomeComponent,
    GameInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({board: boardReducer, playerToMove: boardReducer,
      winner: boardReducer, results: boardReducer, players: boardReducer}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
