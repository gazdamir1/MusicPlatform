"use client"

import { Button, Grid } from "@mui/material"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import styles from "./TrackIdPage.module.scss"
import { ITrack } from "@/types/track"
import { useInput } from "@/hooks/useInput"
import axios from "axios"

interface PageProps {
  id: string
}

async function fetchTrackById(id: string) {
  const res = await fetch(`/api/tracks/${id}`, { cache: "no-store" })
  if (!res.ok) {
    throw new Error("Произошла ошибка при загрузке трека")
  }
  return res.json()
}

const TrackIdPage: React.FC<PageProps> = ({ id }) => {
  const [track, setTrack] = useState<ITrack | null>(null)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  const username = useInput("")
  const text = useInput("")

  const addComment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/tracks/comment",
        {
          username: username.value,
          text: text.value,
          trackId: id,
        }
      )
      setTrack(
        track
          ? { ...track, comments: [...track.comments, response.data] }
          : null
      )
      username.reset()
      text.reset()
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const data = await fetchTrackById(id.toString())
        setTrack(data)
      } catch {
        setError("Ошибка при загрузке трека")
      }
    }
    fetchTrack()
  }, [id])

  if (error) return <p>{error}</p>
  if (!track) return <p>Загрузка...</p>

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.mainContainer}>
        <Button
          className={styles.backButton}
          onClick={() => router.push("/tracks")}
        >
          К списку
        </Button>

        <Grid className={styles.gridContainer}>
          <img
            className={styles.coverTrackPage}
            src={"http://localhost:5000/static/" + track.picture}
            alt="cov"
          />
          <div className={styles.divContainer}>
            <h2 className={styles.title}>Трек</h2>
            <h1>{track.name}</h1>
            <br />
            <h3 className={styles.title}>Исполнитель</h3>
            <h2>{track.artist}</h2>
          </div>
        </Grid>

        <Grid className={styles.commentContainer}>
          <h2>Комментарии</h2>
          <input
            className={styles.nameField}
            placeholder="Ваше имя"
            value={username.value}
            onChange={(e) => username.onChange(e)}
          />
          <textarea
            className={styles.commentName}
            placeholder="Комментарий"
            rows={4}
            value={text.value}
            onChange={(e) => text.onChange(e)}
          />
          <Button onClick={addComment} className={styles.sendButton}>
            Отправить
          </Button>
        </Grid>

        <div className={styles.commentsList}>
          {track.comments.map((comment) => (
            <div key={comment._id} className={styles.comment}>
              <div className={styles.commentAuthor}>
                {/* Автор -  */}
                {comment.username}
              </div>
              <div className={styles.commentText}>
                {/* Комментарий -  */}
                {comment.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.words}>
        <h2>Слова в треке</h2>
        <p>{track.text}</p>
      </div>
    </div>
  )
}

export default TrackIdPage
