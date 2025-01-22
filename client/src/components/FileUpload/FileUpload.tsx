/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import React, { useRef, useState } from "react"
import styles from "./FileUpload.module.scss"

interface FileUploadProps {
  setFile: Function
  accept: string
  children: React.ReactNode
}

const FileUpload: React.FC<FileUploadProps> = ({
  setFile,
  accept,
  children,
}) => {
  const ref = useRef<HTMLInputElement | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    setFile(file)

    if (file) {
      setMessage(`Файл ${file.name} успешно добавлен`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  return (
    <div onClick={() => ref.current?.click()} className={styles.uploader}>
      <input
        type="file"
        accept={accept}
        style={{ display: "none" }}
        ref={ref}
        onChange={onChange}
      ></input>
      {children}
      {message && <div className={styles.notification}>{message}</div>}
    </div>
  )
}

export default FileUpload
