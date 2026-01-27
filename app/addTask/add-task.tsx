import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '../components/button'
import { Text } from '../components/text'
import { TextArea } from '../components/textArea'
import { Input } from '../components/textInput'
import { Inputs, useAddTask } from '../context'

export function AddTask() {
  const { setAddIsTask, addTask } = useAddTask()
  const { register, handleSubmit } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => addTask(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <div>
          <Button.Root
            onSubmitAction={() => setAddIsTask(false)}
            className="mr-4 rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-700 cursor-pointer "
          >
            <Button.Content>Cancelar</Button.Content>
          </Button.Root>
          <Button.Root
            onSubmitAction={() => {}}
            type="submit"
            className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-800 cursor-pointer"
          >
            <Button.Content>Salvar Tarefa</Button.Content>
          </Button.Root>
        </div>
      </div>
    </form>
  )
}
