import { useCallback, useEffect, useEffectEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../components/button'
import { Checkbox } from '../components/checkbox'
import { Text } from '../components/text'
import { TextArea } from '../components/textArea'
import { Input } from '../components/textInput'
import { Inputs, ListTasksProps, useListTask, useNavigation } from '../context'

type ListTaskProps = {
  task: ListTasksProps
}

export function ListTask({ task }: ListTaskProps) {
  const { deleteTask, tasks } = useListTask()
  const [checked, setChecked] = useState(false)
  const { selectionTypeTask } = useNavigation()
  const { register } = useForm<Inputs>()

  const handleCheckboxChange = useCallback(
    (value: boolean) => {
      setChecked(value)
      tasks(task.id, value)
    },
    [task.id, tasks],
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
      <div className="flex justify-between items-center mb-6">
        <Checkbox isChecked={handleCheckboxChange} value={checked} />
        <div className="flex gap-2">
          <Button.Root
            onSubmitAction={() => deleteTask(task.id)}
            className="rounded px-4 py-2 bg-red-500 hover:bg-red-600 text-white cursor-pointer"
          >
            <Button.Content>Delete</Button.Content>
          </Button.Root>
          {selectionTypeTask !== 'complete' && (
            <Button.Root
              onSubmitAction={() => {}}
              className="rounded px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
            >
              <Button.Content>Editar</Button.Content>
            </Button.Root>
          )}
        </div>
      </div>
      <form>
        <div className="p-6 pt-0">
          <label>
            <Text>Nome da Tarefa</Text>
            <Input.Root>
              <Input.Content
                {...register('title')}
                placeholder="Nome da Tarefa"
              />
            </Input.Root>
          </label>
          <label>
            <Text>Descrição</Text>
            <TextArea.Root>
              <TextArea.Content
                {...register('description')}
                placeholder="Descrição da Tarefa"
              />
            </TextArea.Root>
          </label>
        </div>
      </form>
      <h2>{task.title}</h2>

      <p className="pl-3 pb-3 py-3">{task.description}</p>
    </div>
  )
}
