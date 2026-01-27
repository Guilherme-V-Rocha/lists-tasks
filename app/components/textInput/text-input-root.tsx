import { ReactNode } from 'react'

interface TextInputRootProps {
  children: ReactNode
}
export function TextInputRoot(props: TextInputRootProps) {
  return (
    <div
      className={
        'w-full px-4 py-2 mb-6 border border-zinc-300 rounded focus-within:ring-2 ring-indigo-600'
      }
    >
      {props.children}
    </div>
  )
}
