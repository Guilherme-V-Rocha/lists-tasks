'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  onSubmitAction: () => void
  children: ReactNode
  className?: string
}

export function ButtonRoot({
  children,
  onSubmitAction,
  ...props
}: ButtonProps) {
  return (
    <button onClick={onSubmitAction} {...props}>
      {children}
    </button>
  )
}
