import { Button } from '../components/button'
import { useAddTask } from '../context'

export function HeaderTask() {
  const { setAddIsTask } = useAddTask()
  return (
    <div className="flex items-center w-full mb-8 ">
      <h1 className="text-2xl font-semibold">Minhas Tarefas</h1>
      <Button.Root
        onSubmitAction={() => setAddIsTask(true)}
        className="ml-auto rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-800 cursor-pointer"
      >
        <Button.Content>ADICIONAR</Button.Content>
      </Button.Root>
    </div>
  )
}
