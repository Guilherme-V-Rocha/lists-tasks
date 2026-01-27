'use client'

import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useEffectEvent,
  useState,
} from 'react'

export type ListTasksProps = {
  id: string
  title: string
  description: string
  checked: boolean
  status: string
}

type ListTaskContextProps = {
  listTasks: Array<ListTasksProps>
  setListTasks: Dispatch<SetStateAction<Array<ListTasksProps>>>
  deleteTask: (id: string) => void
  tasks: (id: string, checked: boolean) => void
  isDelete?: string
  setIsDelete: Dispatch<SetStateAction<string | undefined>>
  isEdit?: string
  setIsEdit: Dispatch<SetStateAction<string | undefined>>
  cancel: () => void
}

const ListTaskContext = createContext<ListTaskContextProps>(
  {} as ListTaskContextProps,
)

const ListTaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [listTasks, setListTasks] = useState<Array<ListTasksProps>>([])
  const [isDelete, setIsDelete] = useState<string>()
  const [isEdit, setIsEdit] = useState<string>()

  const cancel = useCallback(() => {
    setIsDelete(undefined)
  }, [])

  useEffect(() => {
    if (listTasks.length === 0) {
      localStorage.removeItem('tasks')
    } else {
      localStorage.setItem('tasks', JSON.stringify(listTasks))
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

  const tasks = useCallback(
    (id: string, checked: boolean) => {
      const task = listTasks.find((value) => value.id === id)
      if (checked === true && task) {
        setListTasks((prev) =>
          prev.map((value) =>
            value.id === id
              ? { ...value, checked: true, status: 'complete' }
              : value,
          ),
        )
      } else {
        if (task) {
          setListTasks((prev) =>
            prev.map((value) =>
              value.id === id
                ? { ...value, checked: false, status: 'pending' }
                : value,
            ),
          )
        }
      }
    },
    [listTasks],
  )
  const deleteTask = useCallback(
    (id: string) => {
      setListTasks((prev) => prev.filter((value) => value.id !== id))
      cancel()
    },
    [cancel],
  )

  return (
    <ListTaskContext.Provider
      value={{
        listTasks,
        setListTasks,
        tasks,
        deleteTask,
        isDelete,
        setIsDelete,
        isEdit,
        setIsEdit,
        cancel,
      }}
    >
      {children}
    </ListTaskContext.Provider>
  )
}

const useListTask = () => {
  return useContext(ListTaskContext)
}

export { ListTaskProvider, useListTask }
