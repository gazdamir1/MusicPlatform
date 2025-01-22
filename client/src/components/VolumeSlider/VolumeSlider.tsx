/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import styles from "./VolumeSlider.module.scss"

interface VolumeProps {
  left: number // Текущее значение громкости
  right: number // Максимальное значение громкости
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void // Обработчик изменения громкости
}

const VolumeSlider: React.FC<VolumeProps> = ({ left, right, onChange }) => {
  return (
    <div className={styles.container}>
      <input
        type="range"
        min={0}
        max={right}
        value={left}
        onChange={onChange}
        className={styles.slider}
      />
      <div className={styles.volumeLabel}>{left}</div>
    </div>
  )
}

export default VolumeSlider
