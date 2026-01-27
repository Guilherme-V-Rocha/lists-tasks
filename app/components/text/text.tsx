import { ReactNode } from 'react'

type TextProps = {
  className?: string
  children: ReactNode
}
export function Text({ children, className }: TextProps) {
  return <p className={className}>{children}</p>
}
