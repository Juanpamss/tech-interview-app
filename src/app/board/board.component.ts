import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {getBoard, getPlayers, getPlayerToMove, getResultsByPlayer, getWinner} from "./state/board.selector";
import {changeTurn, moveToken, newGame, setWinner, updateScore} from "./state/board.actions";
import {AppState} from "../store/app.state";
import {Result} from "../model/result-model";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  playerToMove : string = ''
  board : string[] = []
  winner : string = ''
  players : any

  // @ts-ignore
  headToHeadResults: Result

  //Possible winning lines to check every time a player makes a move
  winLines = [
    [[1, 2], [4, 8], [3, 6]],
    [[0, 2], [4, 7]],
    [[0, 1], [4, 6], [5, 8]],
    [[4, 5], [0, 6]],
    [[3, 5], [0, 8], [2, 6], [1, 7]],
    [[3, 4], [2, 8]],
    [[7, 8], [2, 4], [0, 3]],
    [[6, 8], [1, 4]],
    [[6, 7], [0, 4], [2, 5]]
  ];

  constructor(
    private _store : Store<AppState>
  ) { }

  ngOnInit(): void {

    this._store.select(getPlayers).subscribe(
      players => {
        this.players = players
      }
    )

    this._store.select(getBoard).subscribe(
      board => {
        this.board = board
      }
    )

    this._store.select(getPlayerToMove).subscribe(
      playerToMove => {
        this.playerToMove = playerToMove
      }
    )

    this._store.select(getWinner).subscribe(
      winner => {
        this.winner = winner
      }
    )

    this._store.select(getResultsByPlayer, {playerOne: this.players.playerOne, playerTwo: this.players.playerTwo}).subscribe(
      data => {

        this.headToHeadResults = data
      }
    )
  }

  playerMove(index: number){

    let newBoard = JSON.parse(JSON.stringify(this.board))

    let localPlayer = this.playerToMove

    if(this.playerToMove === this.players.playerOne){
      if(newBoard[index] === ''){
        newBoard[index] = 'X'
        this._store.dispatch(changeTurn({playerToMove: this.players.playerTwo}))
      }
    }

    if(this.playerToMove === this.players.playerTwo){
      if(newBoard[index] === ''){
        newBoard[index] = 'O'
        this._store.dispatch(changeTurn({playerToMove: this.players.playerOne}))
      }
    }

    this._store.dispatch(moveToken({board: newBoard}))

    this.isWinningMove(this.board, index, localPlayer)

    this.isDraw()

  }

  isWinningMove(board: string[], lastMove: number, playerToMove: string) {
    let player = board[lastMove];
    for (let i = 0; i < this.winLines[lastMove].length; i++) {
      let line = this.winLines[lastMove][i];
      if(player === board[line[0]] && player === board[line[1]]) {
        //Winning move
        this._store.dispatch(setWinner({winner: playerToMove}))

        let newResult = {
          playerOne: this.headToHeadResults.playerOne,
          scorePlayerOne: this.winner === this.headToHeadResults.playerOne ? this.headToHeadResults.scorePlayerOne + 1 : this.headToHeadResults.scorePlayerOne,
          playerTwo: this.headToHeadResults.playerTwo,
          scorePlayerTwo: this.winner === this.headToHeadResults.playerTwo ? this.headToHeadResults.scorePlayerTwo + 1 : this.headToHeadResults.scorePlayerTwo,
        }

        this._store.dispatch(updateScore({result: newResult}))
      }
    }
    return false;
  }

  isDraw(){
    if(this.board.find((item) => item === '') === undefined && this.winner === ''){
      this._store.dispatch(setWinner({winner: 'draw'}))
    }
  }

  newGame(){
    let newBoard = ['','','','','','','','','']
    this._store.dispatch(newGame({board: newBoard, playerToMove: this.players.playerOne, winner: ''}))
  }
}
