import {createFeatureSelector, createSelector} from "@ngrx/store";
import {BoardState} from "./board.state";
import {Result} from "../../model/result-model";

const getPlayerState = createFeatureSelector<BoardState>('playerToMove')
const getBoardState = createFeatureSelector<BoardState>('board')
const getPlayersState = createFeatureSelector<BoardState>('players')
const getResultsState = createFeatureSelector<BoardState>('results')
const getWinnerState = createFeatureSelector<BoardState>('winner')

export const getPlayerToMove = createSelector(getPlayerState, (state) => {
  return state.playerToMove
})

export const getBoard = createSelector(getBoardState, (state) => {
  return state.board
})

export const getPlayers = createSelector(getPlayersState, (state) => {
  return state.players
})

export const getResultsByPlayer =  createSelector(getResultsState, (state: any, props: any) => {

  if(state.results !== undefined && state.results.length > 0){
    //console.log('find', state.results.find((result: Result) => result.playerOne === props.playerOne))
    if(state.results.find((result: Result) => result.playerOne === props.playerOne) !== undefined){
      return state.results.find((result: Result) => result.playerOne === props.playerOne)
    }else if(state.results.find((result: Result) => result.playerTwo === props.playerTwo) !== undefined){
      return state.results.find((result: Result) => result.playerTwo === props.playerTwo)
    }
  }
  return {
    playerOne: props.playerOne,
    scorePlayerOne: 0,
    playerTwo: props.playerTwo,
    scorePlayerTwo: 0,
  }

})

export const getWinner = createSelector(getWinnerState, (state) => {
  return state.winner
})
