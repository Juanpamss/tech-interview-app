import {createReducer, on} from "@ngrx/store";
import {initialState} from "./board.state";
import {changeTurn, moveToken, newGame, setPlayers, setResult, setWinner, updateScore} from "./board.actions";
import {Result} from "../../model/result-model";

const _boardReducer = createReducer(
  initialState,
  on(setPlayers, (state, action) => {
    return {
      ...state,
      players: action.players
    }
  }),
  on(moveToken, (state, action) => {
    return {
      ...state,
      board: action.board
    }
  }),
  on(changeTurn, (state, action) => {
    return {
      ...state,
      playerToMove: action.playerToMove
    }
  }),
  on(setWinner, (state, action) => {
    return {
      ...state,
      winner: action.winner
    }
  }),
  on(setResult, (state, action) => {
    return {
      ...state,
      result: [...state.results, action.result]
    }
  }),
  on(newGame, (state, action) => {
    return {
      ...state,
      board: action.board,
      playerToMove: action.playerToMove,
      winner: action.winner
    }
  }),
  on(updateScore, (state, action) => {
    let newResults : any = []
    let updatedResults : any = []
    if(state.results !== undefined && state.results.length > 0){
      updatedResults = state.results.map(
        (result : any) => {
          if(action.result.playerOne === result.playerOne || action.result.playerOne === result.playerTwo &&
            action.result.playerTwo === result.playerTwo || action.result.playerTwo === result.playerOne
          ){
            return action.result
          }else{
            newResults.push(action.result)
            return result
          }
        }
      )
    }else{
      let results : Result[] = []
      results.push(action.result)
      updatedResults = results
    }

    let duplicatesRemoved = [...new Set([...updatedResults, ...newResults])];

    //Storage results in local storage
    localStorage.setItem('results', JSON.stringify(duplicatesRemoved))
    return {
      ...state,
      results: duplicatesRemoved
    }
  }),
)

export function boardReducer(state: any, action: any){
  return _boardReducer(state, action)
}
