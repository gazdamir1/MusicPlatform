import { useDispatch } from "react-redux"
import { bindActionCreators } from "@reduxjs/toolkit"
import {
  playTrack,
  pauseTrack,
  setDuration,
  setVolume,
  setCurrentTime,
  setActiveTrack,
  setTracks,
  playNextTrack,
  playPreviousTrack,
  toggleLoopAll,
  toggleLoopOne,
} from "@/store/reducers/playerSlice"

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(
    {
      playTrack,
      pauseTrack,
      setDuration,
      setVolume,
      setCurrentTime,
      setActiveTrack,
      setTracks,
      playNextTrack,
      playPreviousTrack,
      toggleLoopAll,
      toggleLoopOne,
    },
    dispatch
  )
}
