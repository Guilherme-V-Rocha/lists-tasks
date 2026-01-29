'use client'
import { useAddTask, useListTask, useNavigation } from '../context'

export function Navigation() {
  const { setSelectionTypeTask, selectNavigation } = useNavigation()
  const { setAddIsTask } = useAddTask()
  const { setIsEditing } = useListTask()

  return (
    <nav className="font-medium inset-shadow-xs w-full shadow-xs">
      <ul className="flex">
        <li
          className={`p-4 cursor-pointer border-b-2 ${selectNavigation('all')}`}
          onClick={() => {
            setSelectionTypeTask('all')
            setAddIsTask(false)
            setIsEditing(false)
          }}
        >
          Todos
        </li>
        <li
          className={`p-4 cursor-pointer border-b-2 ${selectNavigation('pending')}`}
          onClick={() => {
            setSelectionTypeTask('pending')
            setAddIsTask(false)
            setIsEditing(false)
          }}
        >
          Pendente
        </li>
        <li
          className={`p-4 cursor-pointer border-b-2 ${selectNavigation('complete')}`}
          onClick={() => {
            setSelectionTypeTask('complete')
            setAddIsTask(false)
            setIsEditing(false)
          }}
        >
          Concluído
        </li>
      </ul>
    </nav>
  )
}
