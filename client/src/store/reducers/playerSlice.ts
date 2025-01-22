import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ITrack } from "@/types/track"

interface PlayerState {
  active: ITrack | null
  volume: number
  duration: number
  currentTime: number
  pause: boolean
  index: number
  tracks: ITrack[]
  isLoopAll: boolean
  isLoopOne: boolean
}

const initialState: PlayerState = {
  active: null,
  volume: 5,
  duration: 0,
  currentTime: 0,
  pause: true,
  index: -1,
  tracks: [],
  isLoopAll: false,
  isLoopOne: false,
}

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    playTrack(state) {
      state.pause = false
    },
    pauseTrack(state) {
      state.pause = true
    },
    setDuration(state, action: PayloadAction<number>) {
      state.duration = action.payload
    },
    setVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload
    },
    setCurrentTime(state, action: PayloadAction<number>) {
      state.currentTime = action.payload
    },
    toggleLoopAll(state) {
      state.isLoopAll = !state.isLoopAll
      if (state.isLoopAll) state.isLoopOne = false
    },
    toggleLoopOne(state) {
      state.isLoopOne = !state.isLoopOne
      if (state.isLoopOne) state.isLoopAll = false
    },
    setTracks(state, action) {
      state.tracks = action.payload
    },
    setActiveTrack(state, action) {
      state.active = action.payload
      state.pause = false
      state.index = state.tracks.findIndex(
        (track) => track._id === action.payload._id
      )
    },
    playNextTrack(state) {
      const currentIndex = state.tracks.findIndex(
        (t) => t._id === state.active?._id
      )
      if (state.isLoopOne) {
        state.currentTime = 0
        playTrack()
      } else {
        const nextIndex = (currentIndex + 1) % state.tracks.length
        state.active = state.tracks[nextIndex]
        if (!state.isLoopAll && nextIndex === 0) {
          state.active = null
        }
        state.currentTime = 0
      }
    },
    playPreviousTrack(state) {
      const currentIndex = state.tracks.findIndex(
        (t) => t._id === state.active?._id
      )
      const prevIndex =
        (currentIndex - 1 + state.tracks.length) % state.tracks.length
      state.active = state.tracks[prevIndex]
      state.currentTime = 0
    },
  },
})

export const {
  playTrack,
  pauseTrack,
  setDuration,
  setVolume,
  setCurrentTime,
  setActiveTrack,
  playNextTrack,
  playPreviousTrack,
  toggleLoopOne,
  toggleLoopAll,
  setTracks,
} = playerSlice.actions

export default playerSlice.reducer
