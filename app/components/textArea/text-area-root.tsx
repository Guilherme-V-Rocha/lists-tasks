import clsx from 'clsx'
import { ReactNode } from 'react'

interface TextAreaRootProps {
  children: ReactNode
  hasError?: boolean
}
export function TextAreaRoot({ children, hasError }: TextAreaRootProps) {
  return (
    <div
      className={clsx(
        'w-full px-4 py-2 border border-zinc-300 rounded focus-within:ring-2',
        hasError ? 'ring-red-600' : 'ring-indigo-600',
      )}
    >
      {children}
    </div>
  )
}
