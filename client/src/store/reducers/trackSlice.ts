import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TrackState, ITrack } from "@/types/track"

const initialState: TrackState = {
  tracks: [],
  error: "",
}

const trackSlice = createSlice({
  name: "track",
  initialState,
  reducers: {
    fetchTracks(state, action: PayloadAction<ITrack[]>) {
      state.tracks = action.payload
      state.error = ""
    },

    fetchTracksError(state, action: PayloadAction<string>) {
      state.error = action.payload
    },

    deleteTrack(state, action: PayloadAction<string>) {
      state.tracks = state.tracks.filter(
        (track) => track._id !== action.payload
      )
    },
  },
})

export const { fetchTracks, fetchTracksError, deleteTrack } = trackSlice.actions

export default trackSlice.reducer
