/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server"
import axios from "axios"

export async function GET() {
  try {
    const response = await axios.get("http://localhost:5000/tracks")
    return NextResponse.json(response.data)
  } catch (error) {
    return NextResponse.json(
      { message: "Произошла ошибка при загрузке треков" },
      { status: 500 }
    )
  }
}
