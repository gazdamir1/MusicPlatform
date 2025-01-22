import TrackIdPage from "@/components/TrackIdPage/TrackIdPage"
import { Metadata } from "next"
import React from "react"

interface PageProps {
  params: { id: string }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  return {
    title: `Трек с номером ${params.id}`,
    description: `Описание страницы с ID ${params.id}`,
  }
}

const page = ({ params }: PageProps) => {
  return <TrackIdPage id={params.id} />
}

export default page
