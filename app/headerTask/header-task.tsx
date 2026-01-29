import AddIcon from '@/app/image/addIcon.svg'
import Image from 'next/image'
import { Button } from '../components/button'
import { useAddTask } from '../context'

export function HeaderTask() {
  const { setAddIsTask } = useAddTask()

  return (
    <div className="flex items-center w-full mb-8 ">
      <h1 className="text-2xl text-black font-semibold">Minhas Tarefas</h1>
      <Button.Root
        onSubmitAction={() => setAddIsTask(true)}
        className="flex gap-2 ml-auto rounded bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-700 cursor-pointer"
      >
        <Button.Content>
          <Image src={AddIcon} alt="add_icon" />
        </Button.Content>
        <Button.Content>Adicionar</Button.Content>
      </Button.Root>
    </div>
  )
}
