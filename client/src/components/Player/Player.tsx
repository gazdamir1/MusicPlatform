/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import {
  Pause,
  PlayArrow,
  Repeat,
  RepeatOne,
  SkipNext,
  SkipPrevious,
  VolumeUp,
} from "@mui/icons-material"
import { Grid, IconButton } from "@mui/material"
import React, { useEffect, useState } from "react"
import styles from "./Player.module.scss"
import TrackProgress from "../TrackProgress.tsx/TrackProgress"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import { useActions } from "@/hooks/useAction"
import VolumeSlider from "../VolumeSlider/VolumeSlider"

let audio: HTMLAudioElement

function Player() {
  const { pause, volume, active, duration, currentTime, isLoopAll, isLoopOne } =
    useTypedSelector((state) => state.player)

  const {
    playTrack,
    pauseTrack,
    setDuration,
    setVolume,
    setCurrentTime,
    playNextTrack,
    playPreviousTrack,
    toggleLoopOne,
    toggleLoopAll,
  } = useActions()

  useEffect(() => {
    if (!audio) {
      audio = new Audio()
      const normalizedVolume = (50 / 50) * 5
      audio.volume = normalizedVolume / 100
      setVolume(50)
    } else {
      setAudio()
      playTrack()
      audio.play()
    }
  }, [active])

  const setAudio = () => {
    if (active) {
      audio.src = "http://localhost:5000/static/" + active.audio
      const normalizedVolume = (volume / 50) * 5
      audio.volume = normalizedVolume / 100
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration))
      }
      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime))
      }
      audio.onended = () => {
        playNextTrack()
      }
    }
  }

  const play = () => {
    if (pause) {
      playTrack()
      audio.play()
    } else {
      pauseTrack()
      audio.pause()
    }
  }

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const useVolume = Number(e.target.value)
    const normalizedVolume = (useVolume / 50) * 5
    audio.volume = normalizedVolume / 100
    setVolume(Number(e.target.value))
  }

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value)
    setCurrentTime(Number(e.target.value))
  }

  const [volumeSliderOpened, setVolumeSliderOpened] = useState(false)

  const openVolumeSlider = () => {
    setVolumeSliderOpened((prev) => !prev)
  }

  if (!active) {
    return null
  }

  return (
    <div className={styles.player}>
      <IconButton
        style={{ color: "white" }}
        onClick={() => {
          playPreviousTrack()
        }}
      >
        <SkipPrevious />
      </IconButton>
      <IconButton style={{ color: "white" }} onClick={play}>
        {pause ? <PlayArrow /> : <Pause />}
      </IconButton>
      <IconButton
        style={{ color: "white" }}
        onClick={() => {
          playNextTrack()
        }}
      >
        <SkipNext />
      </IconButton>
      <img
        width={50}
        height={50}
        src={"http://localhost:5000/static/" + active.picture}
        alt=""
      />
      <Grid container className={styles.grid}>
        <div>{active?.name}</div>
        <div className={styles.artistName}>{active?.artist}</div>
      </Grid>
      <TrackProgress
        left={currentTime}
        right={duration}
        onChange={changeCurrentTime}
      />
      <IconButton
        style={{ color: isLoopOne ? "#1976d2" : "white" }}
        onClick={() => {
          toggleLoopOne()
        }}
      >
        <RepeatOne />
      </IconButton>
      <IconButton
        style={{ color: isLoopAll ? "#1976d2" : "white" }}
        onClick={() => {
          toggleLoopAll()
        }}
      >
        <Repeat />
      </IconButton>
      <IconButton onClick={openVolumeSlider} className={styles.VolumeUp}>
        <VolumeUp />
      </IconButton>

      {volumeSliderOpened && (
        <div className={styles.volumeSlider}>
          <VolumeSlider left={volume} right={100} onChange={changeVolume} />
        </div>
      )}
    </div>
  )
}

export default Player
