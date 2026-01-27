'use client'
import { AddTask } from './addTask'
import { useAddTask } from './context'
import { useListTask } from './context/list-task.context'
import { useNavigation } from './context/navigation-context'
import { HeaderTask } from './headerTask'
import { ListTask } from './listTask'
import { Navigation } from './navigation'

export default function Home() {
  const { addIsTask } = useAddTask()
  const { listTasks } = useListTask()
  const { selectionTypeTask } = useNavigation()

  return (
    <div className="flex h-dvh items-center justify-center bg-zinc-50 font-sans ">
      <main className="flex w-full max-w-3xl flex-col items-center py-32 px-16 rounded text-black sm:items-start">
        <HeaderTask />
        <div className="rounded w-full h-full bg-white border-zinc-800 shadow-lg">
          <Navigation />
          {addIsTask && <AddTask />}
          <div className="overflow-y-auto h-112 space-y-6">
            {!addIsTask &&
              selectionTypeTask === 'all' &&
              listTasks.map((value) => (
                <ListTask key={value.id} task={value} />
              ))}
            {!addIsTask &&
              listTasks
                .filter((value) => value.status === selectionTypeTask)
                .map((value) => <ListTask key={value.id} task={value} />)}
          </div>
          {addIsTask ||
            (listTasks.length === 0 && (
              <div className="flex flex-col items-center justify-center p-8 text-center text-gray-500">
                <p>Você não tem tarefas cadastradas ainda.</p>
                <span>Crie tarefas e organize seus itens a fazer</span>
              </div>
            ))}
        </div>
      </main>
    </div>
  )
}
