"use client"

import StepWrapper from "@/components/StepWrapper/StepWrapper"
import { Grid } from "@mui/material"
import React, { useState } from "react"
import styles from "./CreateTrack.module.scss"
import FileUpload from "@/components/FileUpload/FileUpload"
import { useInput } from "@/hooks/useInput"
import axios from "axios"
import { useRouter } from "next/navigation"

const CreateTrack = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [picture, setPicture] = useState("")
  const [audio, setAudio] = useState("")
  const [errors, setErrors] = useState<string[]>([])
  const name = useInput("")
  const artist = useInput("")
  const text = useInput("")
  const router = useRouter()

  const validateStep = () => {
    const newErrors: string[] = []

    if (activeStep === 0) {
      if (!name.value.trim()) newErrors.push("Введите название трека.")
      if (!artist.value.trim()) newErrors.push("Введите имя исполнителя.")
      if (!text.value.trim()) newErrors.push("Введите текст трека.")
    } else if (activeStep === 1) {
      if (!picture) newErrors.push("Загрузите изображение.")
    } else if (activeStep === 2) {
      if (!audio) newErrors.push("Загрузите аудио.")
    }

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const next = () => {
    if (validateStep()) {
      if (activeStep !== 2) {
        setActiveStep((prev) => prev + 1)
      } else {
        const formData = new FormData()
        formData.append("name", name.value)
        formData.append("text", text.value)
        formData.append("artist", artist.value)
        formData.append("picture", picture)
        formData.append("audio", audio)
        axios
          .post("http://localhost:5000/tracks", formData)
          .then(() => router.push("/tracks"))
          .catch((e) => console.log(e))
      }
    }
  }

  const back = () => {
    setActiveStep((prev) => prev - 1)
    setErrors([])
  }

  return (
    <>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 && (
          <Grid container className={styles.step}>
            <input
              {...name}
              placeholder="Название трека"
              className={styles.labelInput}
            />
            <input
              {...artist}
              placeholder="Имя исполнителя"
              className={styles.labelInput}
            />
            <textarea
              {...text}
              placeholder="Текст трека"
              className={styles.labelTextArea}
            />

            {/* <textarea
              className={styles.commentName}
              placeholder="Комментарий"
              rows={4}
              value={text.value}
              onChange={(e) => text.onChange(e)}
            /> */}
          </Grid>
        )}
        {activeStep === 1 && (
          <FileUpload setFile={setPicture} accept="image/*">
            <div className={styles.uploaderButton}>Загрузите изображение</div>
          </FileUpload>
        )}
        {activeStep === 2 && (
          <FileUpload setFile={setAudio} accept="audio/*">
            <div className={styles.uploaderButton}>Загрузите аудио</div>
          </FileUpload>
        )}
      </StepWrapper>
      {errors.length > 0 && (
        <ul className={styles.errorList}>
          {errors.map((error, index) => (
            <li key={index} className={styles.error}>
              {error}
            </li>
          ))}
        </ul>
      )}
      <Grid container className={styles.gridNavigation}>
        <button
          disabled={activeStep === 0}
          onClick={back}
          className={styles.moveButton}
        >
          Назад
        </button>
        <button onClick={next} className={styles.moveButton}>
          Далее
        </button>
      </Grid>
    </>
  )
}

export default CreateTrack
