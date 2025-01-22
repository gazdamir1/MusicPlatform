"use client"

import { useRef } from "react"
import { createStore } from "."
import { Provider } from "react-redux"

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<ReturnType<typeof createStore> | null>(null)
  if (!storeRef.current) {
    storeRef.current = createStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
