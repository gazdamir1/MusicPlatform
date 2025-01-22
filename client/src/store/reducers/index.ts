import { combineReducers } from "redux"
import playerReducer from "./playerSlice"
import trackReducer from "./trackSlice"

export const rootReducer = combineReducers({
  player: playerReducer,
  track: trackReducer,
})

export type RootState = ReturnType<typeof rootReducer>
