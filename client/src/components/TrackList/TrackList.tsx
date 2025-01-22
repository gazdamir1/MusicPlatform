/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { ITrack } from "@/types/track"
import { Box, Button, Card, Grid, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import styles from "./TrackList.module.scss"
import TrackItem from "../TrackItem/TrackItem"
import { useDispatch } from "react-redux"
import {
  fetchTracks as fetchTracksAction,
  fetchTracksError,
} from "@/store/reducers/trackSlice"
import axios from "axios"
import { setTracks } from "@/store/reducers/playerSlice"

const searchTracks = async (query: string): Promise<ITrack[]> => {
  try {
    const response = await axios.get(
      `/api/tracks/search?query=${encodeURIComponent(query)}`
    )
    return response.data
  } catch (error) {
    console.error("Ошибка при поиске треков:", error)
    return []
  }
}

const fetchTracks = async (): Promise<ITrack[]> => {
  try {
    const res = await fetch("api/tracks", {
      cache: "no-store",
    })
    if (!res.ok) {
      throw new Error("Произошла ошибка при загрузке треков")
    }
    return res.json()
  } catch (error) {
    console.error("Ошибка при загрузке треков:", error)
    return []
  }
}

const TrackList: React.FC = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredTracks, setFilteredTracks] = useState<ITrack[]>([])
  const [tracks, setTracksState] = useState<ITrack[]>([])

  useEffect(() => {
    const loadTracks = async () => {
      try {
        const fetchedTracks = await fetchTracks()
        setTracksState(fetchedTracks)
        setFilteredTracks(fetchedTracks)
        dispatch(fetchTracksAction(fetchedTracks))
        dispatch(setTracks(fetchedTracks))
      } catch (error) {
        dispatch(fetchTracksError("Произошла ошибка при загрузке треков"))
      }
    }

    loadTracks()
  }, [dispatch])

  const handleTrackDelete = (deletedTrackId: string) => {
    const updatedTracks = tracks.filter((track) => track._id !== deletedTrackId)
    setTracksState(updatedTracks)
    setFilteredTracks(updatedTracks)
  }

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      try {
        const results = await searchTracks(searchTerm)
        setFilteredTracks(results)
      } catch (error) {
        dispatch(fetchTracksError("Ошибка при поиске треков"))
      }
    } else {
      setFilteredTracks(tracks)
    }
  }

  return (
    <Grid container className={styles.trackList}>
      <Card className={styles.trackCard}>
        <Box className={styles.box}>
          <Grid container className={styles.center}>
            <h1>Список треков</h1>
            <Button onClick={() => router.push("/tracks/create")}>
              Загрузить
            </Button>
          </Grid>
        </Box>

        <Box className={styles.searchBox}>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className={styles.textSearch}
            placeholder="Поиск трека"
            style={{ flexGrow: 1 }}
          />
          <Button
            onClick={handleSearch}
            variant="contained"
            className={styles.searchButton}
          >
            <img
              src="image/Search.svg"
              alt="menuButton"
              className={styles.searchIcon}
            />
          </Button>
        </Box>

        <Grid container className={styles.coreGrid}>
          <Box className={styles.box}>
            {filteredTracks.map((track) => (
              <TrackItem
                key={track._id}
                track={track}
                onDelete={handleTrackDelete}
              />
            ))}
          </Box>
        </Grid>
      </Card>
    </Grid>
  )
}

export default TrackList
