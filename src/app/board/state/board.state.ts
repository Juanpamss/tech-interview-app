import {Result} from "../../model/result-model";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('results');
    if (serializedState === null) {
      return undefined;
    }

    let results : Result [] = JSON.parse(serializedState)

    return results;

  } catch (err) {
    return undefined;
  }
};

export interface BoardState{
  winner: string,
  playerToMove: string,
  players: {}
  results: any,
  board: string[]
}

export const initialState : BoardState = {
  winner: '',
  players: {},
  playerToMove : '',
  results : loadState() !== undefined ? loadState() : [],
  board : ['','','','','','','','','']
}
