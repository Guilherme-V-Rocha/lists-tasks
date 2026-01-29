'use client'

import clsx from 'clsx'
import { useMemo } from 'react'
import { AddTask } from './addTask'
import { useAddTask } from './context'
import { useListTask } from './context/list-task.context'
import { useNavigation } from './context/navigation-context'
import { EmptyState } from './emptyState'
import { HeaderTask } from './headerTask'
import { ListTask } from './listTask'
import { Navigation } from './navigation'

export default function Home() {
  const { addIsTask } = useAddTask()
  const { listTasks } = useListTask()
  const { selectionTypeTask } = useNavigation()

  const filteredTasks = useMemo(() => {
    if (selectionTypeTask === 'all') return listTasks
    return listTasks.filter((task) => task.status === selectionTypeTask)
  }, [listTasks, selectionTypeTask])

  return (
    <div className="flex min-h-dvh items-center justify-center bg-zinc-50 font-sans p-4">
      <main className="flex w-full max-w-3xl flex-col text-black items-center sm:items-start">
        <HeaderTask />

        <div className="w-full rounded-lg bg-white border border-zinc-200 shadow-xl overflow-hidden">
          <Navigation />

          <section
            className={clsx(
              'h-112 overflow-y-auto p-4 space-y-4',
              filteredTasks.length === 0 &&
                addIsTask === false &&
                'flex justify-center',
            )}
          >
            {addIsTask ? (
              <AddTask />
            ) : filteredTasks.length > 0 ? (
              filteredTasks
                .map((task) => <ListTask key={task.id} task={task} />)
                .reverse()
            ) : (
              <EmptyState />
            )}
          </section>
        </div>
      </main>
    </div>
  )
}
