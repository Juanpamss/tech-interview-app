import {createAction, props} from "@ngrx/store";
import {Result} from "../../model/result-model";

export const setPlayers = createAction('setPlayers', props<{players: {playerOne: string, playerTwo: string}}>())

export const moveToken = createAction('moveToken', props<{board: string[]}>())

export const changeTurn = createAction('changeTurn', props<{playerToMove: string}>())

export const setWinner = createAction('setWinner', props<{winner: string}>())

export const setResult = createAction('setResult', props<{result: Result}>())

export const newGame = createAction('newGame', props<{board: string[], playerToMove: string, winner: string}>())

export const updateScore = createAction('updateScore', props<{result: Result}>())

