import React from "react"
import TrackList from "@/components/TrackList/TrackList"
import { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Список треков",
    description: "Просмотр текущей коллекции",
  }
}

const Tracks = async () => {
  return <TrackList />
}

export default Tracks
