/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server"
import axios from "axios"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get("query")

  if (!query) {
    return NextResponse.json(
      { error: "Не указано название для поиска" },
      { status: 400 }
    )
  }

  try {
    const response = await axios.get(
      `http://localhost:5000/tracks/search?query=${query}`
    )
    return NextResponse.json(response.data, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: "Ошибка при поиске треков" },
      { status: 500 }
    )
  }
}
