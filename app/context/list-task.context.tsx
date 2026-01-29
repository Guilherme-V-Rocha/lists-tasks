'use client'

import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useEffectEvent,
  useMemo,
  useState,
} from 'react'

export type ListTasksProps = {
  id: string
  title: string
  description: string
  checked: boolean
  status: 'pending' | 'complete'
}

type ListTaskContextProps = {
  listTasks: Array<ListTasksProps>
  setListTasks: Dispatch<SetStateAction<Array<ListTasksProps>>>
  deleteTask: (id: string) => void
  toggleTaskStatus: (id: string, checked: boolean) => void
  isDelete?: string
  setIsDelete: Dispatch<SetStateAction<string | undefined>>
  updateTask: (task: ListTasksProps) => void
}

const ListTaskContext = createContext<ListTaskContextProps>(
  {} as ListTaskContextProps,
)

const ListTaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [listTasks, setListTasks] = useState<Array<ListTasksProps>>([])
  const [isDelete, setIsDelete] = useState<string>()

  useEffect(() => {
    if (listTasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(listTasks))
    } else {
      localStorage.removeItem('tasks')
    }
  }, [listTasks])

  const getData = useEffectEvent(() => {
    const storedTasks = localStorage.getItem('tasks')
    if (storedTasks) {
      setListTasks(JSON.parse(storedTasks))
    }
  })

  useEffect(() => {
    getData()
  }, [])

  const toggleTaskStatus = useCallback((id: string, checked: boolean) => {
    setListTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task
        return {
          ...task,
          checked,
          status: checked ? 'complete' : 'pending',
        }
      }),
    )
  }, [])

  const deleteTask = useCallback((id: string) => {
    setListTasks((prev) => prev.filter((value) => value.id !== id))
    setIsDelete(undefined)
  }, [])

  const updateTask = useCallback((task: ListTasksProps) => {
    setListTasks((prev) =>
      prev.map((value) => (value.id === task.id ? task : value)),
    )
  }, [])

  const contextValue = useMemo(
    () => ({
      listTasks,
      setListTasks,
      toggleTaskStatus,
      deleteTask,
      isDelete,
      setIsDelete,
      updateTask,
    }),
    [listTasks, isDelete, toggleTaskStatus, deleteTask, updateTask],
  )

  return (
    <ListTaskContext.Provider value={contextValue}>
      {children}
    </ListTaskContext.Provider>
  )
}

const useListTask = () => {
  return useContext(ListTaskContext)
}

export { ListTaskProvider, useListTask }
