'use client'

import { createContext, useContext, useState } from 'react'

type NavigationContextProps = {
  selectionTypeTask: string
  setSelectionTypeTask: (value: string) => void
  selectNavigation: (value: string) => string
}

const NavigationContext = createContext<NavigationContextProps>(
  {} as NavigationContextProps,
)

const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectionTypeTask, setSelectionTypeTask] = useState('all')

  const selectNavigation = (value: string) => {
    return selectionTypeTask === value
      ? 'border-indigo-600 text-indigo-600'
      : 'text-gray-600  border-transparent hover:text-indigo-600 hover:border-indigo-600'
  }
  return (
    <NavigationContext.Provider
      value={{ selectionTypeTask, setSelectionTypeTask, selectNavigation }}
    >
      {children}
    </NavigationContext.Provider>
  )
}

const useNavigation = () => {
  return useContext(NavigationContext)
}

export { NavigationProvider, useNavigation }
