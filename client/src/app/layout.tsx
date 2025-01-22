/* eslint-disable @typescript-eslint/no-unused-vars */
import Navbar from "@/components/Navbar/Navbar"
import { Container } from "@mui/material"
import "./globals.css"
import Player from "@/components/Player/Player"
import StoreProvider from "@/store/StoreProvider"
import { Ubuntu } from "next/font/google"

const ubuntu = Ubuntu({
  weight: ["400"], // Укажите только нужный вес
  subsets: ["latin", "cyrillic"], // Добавьте кириллицу, если нужно
  display: "swap", // Оптимизация отображения
  variable: "--font-ubuntu",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={ubuntu.variable}>
      <body>
        <StoreProvider>
          <Navbar />
          <Container className="MainContainer">{children}</Container>
          <Player />
        </StoreProvider>
      </body>
    </html>
  )
}
