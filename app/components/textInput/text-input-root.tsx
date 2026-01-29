import clsx from 'clsx'
import { ReactNode } from 'react'

interface TextInputRootProps {
  children: ReactNode
  hasError?: boolean
}
export function TextInputRoot({ children, hasError }: TextInputRootProps) {
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
