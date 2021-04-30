import {BoardState} from "../board/state/board.state";
import {boardReducer} from "../board/state/board.reducer";

export interface AppState{
  board: BoardState
}

export const appReducer = {
  board: boardReducer,
}
