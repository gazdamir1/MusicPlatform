import { useState, ChangeEvent } from "react"

interface UseInputReturn {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  reset: () => void
}

export const useInput = (initialValue: string): UseInputReturn => {
  const [value, setValue] = useState<string>(initialValue)

  // Обновляет состояние при вводе
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  // Сбрасывает значение в начальное
  const reset = () => {
    setValue(initialValue)
  }

  return { value, onChange, reset }
}
