import { TextareaHTMLAttributes } from 'react'
type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

export function TextAreaContent(props: TextAreaProps) {
  return (
    <textarea
      className="bg-transparent flex-1 h-16 text-xs outline-none fields-auto resize-none field-sizing-fixed w-full"
      {...props}
    />
  )
}
