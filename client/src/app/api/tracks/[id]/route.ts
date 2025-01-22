import { NextResponse } from "next/server"
import axios from "axios"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params

  try {
    const res = await axios.get(`http://localhost:5000/tracks/${id}`)
    return NextResponse.json(res.data, { status: 200 })
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status || 500
      const message = error.response.data?.error || "Ошибка при получении трека"
      return NextResponse.json({ error: message }, { status })
    }
    return NextResponse.json(
      { error: "Ошибка при получении трека" },
      { status: 500 }
    )
  }
}
