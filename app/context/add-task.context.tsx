'use client'
import { createContext, useCallback, useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useListTask } from './list-task.context'

export type Inputs = {
  title: string
  description: string
}

type AddTaskContextProps = {
  addIsTask: boolean
  setAddIsTask: (value: boolean) => void
  addTask: (value: Inputs) => void
}

const AddTaskContext = createContext<AddTaskContextProps>(
  {} as AddTaskContextProps,
)

const AddTaskProvider = ({ children }: { children: React.ReactNode }) => {
  const { setListTasks } = useListTask()
  const [addIsTask, setAddIsTask] = useState<boolean>(false)
  const id = uuidv4()

  const addTask = useCallback(
    (value: Inputs) => {
      if (value.title && value.description) {
        setListTasks((prev) => [
          ...prev,
          { id: id, ...value, checked: false, status: 'pending' },
        ])
        setAddIsTask(false)
      }
    },
    [id, setListTasks],
  )

  return (
    <AddTaskContext.Provider value={{ addIsTask, setAddIsTask, addTask }}>
      {children}
    </AddTaskContext.Provider>
  )
}

const useAddTask = () => {
  return useContext(AddTaskContext)
}

export { AddTaskProvider, useAddTask }
