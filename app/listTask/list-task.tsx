'use client'

import DeleteIcon from '@/app/image/deleteIcon.svg'
import EditIcon from '@/app/image/editIcon.svg'
import Image from 'next/image'
import { useCallback, useEffect, useEffectEvent, useState } from 'react'
import { Button } from '../components/button'
import { Checkbox } from '../components/checkbox'
import { ListTasksProps, useListTask, useNavigation } from '../context'
import { ListTaskFilters } from './list-task-filters'

type ListTaskProps = {
  task: ListTasksProps
}

export function ListTask({ task }: ListTaskProps) {
  const { deleteTask, toggleTaskStatus, setIsEditing, isEditing } =
    useListTask()
  const [checked, setChecked] = useState(false)
  const { selectionTypeTask } = useNavigation()

  const handleCheckboxChange = useCallback(
    (value: boolean) => {
      setChecked(value)
      toggleTaskStatus(task.id, value)
    },
    [task.id, toggleTaskStatus],
  )

  const confirmTaskChecked = useEffectEvent(() => {
    if (task.checked) setChecked(task.checked)
    else setChecked(false)
  })

  useEffect(() => {
    confirmTaskChecked()
  }, [])

  return (
    <div className="inset-shadow-xs w-full shadow-xs p-4 pb-3 wrap-break-word">
      {!isEditing ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <Checkbox isChecked={handleCheckboxChange} value={checked} />
            <div className="flex gap-2">
              <Button.Root
                onSubmitAction={() => deleteTask(task.id)}
                className="flex gap-2 rounded px-4 py-2 bg-red-500 hover:bg-red-600 text-white cursor-pointer"
              >
                <Button.Content>
                  <Image src={DeleteIcon} alt="delete_icon" />
                </Button.Content>
                <Button.Content>Deletar</Button.Content>
              </Button.Root>
              {selectionTypeTask !== 'complete' && (
                <Button.Root
                  onSubmitAction={() => setIsEditing(!isEditing)}
                  className="flex gap-2 rounded px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white cursor-pointer"
                >
                  <Button.Content>
                    <Image src={EditIcon} alt="edit_icon" />
                  </Button.Content>
                  <Button.Content>Editar</Button.Content>
                </Button.Root>
              )}
            </div>
          </div>
          <h2>{task.title}</h2>
          <p className="pl-3 pb-3 py-3">{task.description}</p>
        </>
      ) : (
        <ListTaskFilters setIsEditing={setIsEditing} task={task} />
      )}
    </div>
  )
}
