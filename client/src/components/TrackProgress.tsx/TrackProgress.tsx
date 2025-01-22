/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import styles from "./TrackProgress.module.scss"

interface TrackProgressProps {
  left: number
  right: number
  onChange: (e: any) => void
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`
}

const TrackProgress: React.FC<TrackProgressProps> = ({
  left,
  right,
  onChange,
}) => {
  return (
    <div className={styles.Container}>
      <input
        type="range"
        min={0}
        max={right}
        value={left}
        onChange={onChange}
      ></input>
      <div>
        {formatTime(left)} / {formatTime(right)}
      </div>
    </div>
  )
}

export default TrackProgress
