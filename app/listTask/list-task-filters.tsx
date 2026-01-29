import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '../components/button'
import { Text } from '../components/text'
import { TextArea } from '../components/textArea'
import { Input } from '../components/textInput'
import { ListTasksProps, useListTask } from '../context'
import { ListTaskSchema, listTaskSchema } from '../schema/task-schema'

type ListTaskFiltersProps = {
  setIsEditing: (value: boolean) => void
  task: ListTasksProps
}

export function ListTaskFilters({ setIsEditing, task }: ListTaskFiltersProps) {
  const { updateTask } = useListTask()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ListTaskSchema>({
    resolver: zodResolver(listTaskSchema),
    values: task,
  })

  const onSubmit: SubmitHandler<ListTaskSchema> = (data) => {
    updateTask(data)
    setIsEditing(false)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-6"
    >
      <label htmlFor="title">
        <Text
          className={clsx(
            'font-semibold',
            !!errors.title ? 'text-red-600' : 'text-black',
          )}
        >
          Nome da Tarefa
        </Text>
      </label>
      <Input.Root hasError={!!errors.title}>
        <Input.Content
          id={`edit-title-${task.id}`}
          {...register('title')}
          placeholder="Nome da Tarefa"
          aria-invalid={errors.title ? 'true' : 'false'}
        />
      </Input.Root>
      {errors.title && (
        <span className="text-sm text-red-500 mt-1">
          {errors.title.message}
        </span>
      )}
      <label htmlFor="description">
        <Text
          className={clsx(
            'font-semibold',
            !!errors.description ? 'text-red-600' : 'text-black',
          )}
        >
          Descrição
        </Text>
      </label>
      <TextArea.Root hasError={!!errors.description}>
        <TextArea.Content
          id={`edit-desc-${task.id}`}
          {...register('description')}
          placeholder="Descrição da Tarefa"
          aria-invalid={errors.description ? 'true' : 'false'}
        />
      </TextArea.Root>
      {errors.description && (
        <span className="text-sm text-red-500 mt-1">
          {errors.description.message}
        </span>
      )}
      <div className="mt-4 flex justify-end gap-4">
        <Button.Root
          type="button"
          onSubmitAction={() => setIsEditing(false)}
          className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-700 cursor-pointer "
        >
          <Button.Content>Cancelar</Button.Content>
        </Button.Root>
        <Button.Root
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-800 cursor-pointer"
        >
          <Button.Content>
            {isSubmitting ? 'Salvando...' : 'Atualizar Tarefa'}
          </Button.Content>
        </Button.Root>
      </div>
    </form>
  )
}
