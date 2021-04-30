import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {getPlayers, getPlayerToMove, getResultsByPlayer, getWinner} from "../board/state/board.selector";
import {AppState} from "../store/app.state";
import {Result} from "../model/result-model";

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.css']
})
export class GameInfoComponent implements OnInit {

  // @ts-ignore
  players : any

  playerToMove: string = ''
  winner: string = ''

  // @ts-ignore
  headToHeadResults : Result

  constructor(
    private _store : Store<AppState>
  ) { }

  ngOnInit(): void {

    this._store.select(getPlayers).subscribe(
      players => {
        this.players = players
      }
    )

    this._store.select(getPlayerToMove).subscribe(
      playerToMove => {
        this.playerToMove = playerToMove.toUpperCase()
      }
    )

    this._store.select(getWinner).subscribe(
      winner => {
        this.winner = winner.toUpperCase()
      }
    )

    this._store.select(getResultsByPlayer, {playerOne: this.players.playerOne, playerTwo: this.players.playerTwo}).subscribe(
      data => {
        this.headToHeadResults = data
      }
    )
  }

  //Manually make the current cookie expire so the user can change their name
  changePlayers() {
    document.cookie = "playerOne='';" + " expires=Thu, 01-Jan-95 00:00:01 GMT"
    document.cookie = "playerTwo='';" + " expires=Thu, 01-Jan-95 00:00:01 GMT"
    location.reload()
  }

}
