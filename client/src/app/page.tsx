import { Button } from "@mui/material"
import styles from "./page.module.css"
import { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "MusicHome",
    description: "Здесь собраны лучшие треки",
  }
}

export default function Home() {
  return (
    <>
      <div className={styles.center}>
        <h1>Добро пожаловать!</h1>
        <h3>Здесь собраны лучшие треки</h3>
        <Button>Some button</Button>
      </div>
    </>
  )
}
