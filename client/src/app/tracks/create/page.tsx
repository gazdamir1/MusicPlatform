import CreateTrack from "@/components/CreateTrack/CreateTrack"
import { Metadata } from "next"
import React from "react"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Добавление трека",
    description: "Добавление нового трека",
  }
}

const Create = () => {
  return <CreateTrack></CreateTrack>
}

export default Create
