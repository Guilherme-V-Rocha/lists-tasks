'use client'
import { useNavigation } from '../context'

export function Navigation() {
  const { setSelectionTypeTask, selectNavigation } = useNavigation()

  return (
    <nav className="font-medium inset-shadow-xs w-full shadow-xs">
      <ul className="flex">
        <li
          className={`p-4 cursor-pointer border-b-2 ${selectNavigation('all')}`}
          onClick={() => setSelectionTypeTask('all')}
        >
          Todos
        </li>
        <li
          className={`p-4 cursor-pointer border-b-2 ${selectNavigation('pending')}`}
          onClick={() => setSelectionTypeTask('pending')}
        >
          Pendente
        </li>
        <li
          className={`p-4 cursor-pointer border-b-2 ${selectNavigation('complete')}`}
          onClick={() => setSelectionTypeTask('complete')}
        >
          Concluído
        </li>
      </ul>
    </nav>
  )
}
