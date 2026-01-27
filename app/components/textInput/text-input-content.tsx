import { InputHTMLAttributes } from 'react'
type TextInputProps = InputHTMLAttributes<HTMLInputElement>

export function TextInputContent(props: TextInputProps) {
  return (
    <input
      className="bg-transparent flex-1 text-xs outline-none w-full"
      {...props}
    />
  )
}
