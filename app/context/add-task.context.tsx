'use client'
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { v4 as uuidv4 } from 'uuid'
import { AddTaskSchema } from '../schema/task-schema'
import { useListTask } from './list-task.context'

type AddTaskContextProps = {
  addIsTask: boolean
  setAddIsTask: (value: boolean) => void
  addTask: (value: AddTaskSchema) => void
}

const AddTaskContext = createContext<AddTaskContextProps>(
  {} as AddTaskContextProps,
)

const AddTaskProvider = ({ children }: { children: React.ReactNode }) => {
  const { setListTasks } = useListTask()
  const [addIsTask, setAddIsTask] = useState(false)
  const id = uuidv4()

  const addTask = useCallback(
    (value: AddTaskSchema) => {
      const newTask = {
        id: id,
        ...value,
        checked: false,
        status: 'pending' as const,
      }
      setListTasks((prev) => [...prev, newTask])
      setAddIsTask(false)

      setAddIsTask(false)
    },
    [setListTasks, id],
  )

  const contextValue = useMemo(
    () => ({
      addIsTask,
      setAddIsTask,
      addTask,
    }),
    [addIsTask, addTask],
  )

  return (
    <AddTaskContext.Provider value={contextValue}>
      {children}
    </AddTaskContext.Provider>
  )
}

const useAddTask = () => {
  return useContext(AddTaskContext)
}

export { AddTaskProvider, useAddTask }
