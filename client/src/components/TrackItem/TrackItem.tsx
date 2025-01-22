/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ITrack } from "@/types/track"
import React from "react"
import styles from "./TrackItem.module.scss"
import { Card, Grid, IconButton } from "@mui/material"
import { Delete, Headphones, PlayArrow } from "@mui/icons-material"
import { useRouter } from "next/navigation"
import { useActions } from "@/hooks/useAction"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import axios from "axios"
import { useDispatch } from "react-redux"
import { deleteTrack } from "@/store/reducers/trackSlice"

interface TrackListProps {
  track: ITrack
  active?: boolean
  onDelete: (deletedTrackId: string) => void
}

const TrackItem: React.FC<TrackListProps> = ({ track, onDelete }) => {
  const router = useRouter()
  const { active, pause } = useTypedSelector((state) => state.player)
  const { setActiveTrack } = useActions()
  const dispatch = useDispatch()

  const play = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    if (active !== track) setActiveTrack(track)
  }

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await axios.delete(`http://localhost:5000/tracks/${track._id}`)
      dispatch(deleteTrack(track._id))
      onDelete(track._id)
    } catch (error) {
      console.error("Ошибка при удалении трека", error)
    }
  }

  return (
    <Card
      className={`${styles.track} ${
        active !== track ? styles.notactive : styles.active
      }`}
      onClick={() => router.push("tracks/" + track._id)}
    >
      <IconButton onClick={play} className={styles.pausePlayButton}>
        {active && active === track && !pause ? <Headphones /> : <PlayArrow />}
      </IconButton>
      <img
        className={styles.cover}
        src={"http://localhost:5000/static/" + track.picture}
        width={70}
        height={70}
        alt="cov"
      ></img>
      <Grid container className={styles.grid}>
        <div>{track.name}</div>
        <div className={styles.artistName}>{track.artist}</div>
      </Grid>
      {active && <div></div>}
      <IconButton onClick={handleDelete} className={styles.deleteButtonWrapper}>
        <Delete />
      </IconButton>
    </Card>
  )
}

export default TrackItem
