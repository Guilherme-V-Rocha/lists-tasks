import { AddTaskProvider, NavigationProvider } from '../context'
import { ListTaskProvider } from '../context/list-task.context'

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <NavigationProvider>
      <ListTaskProvider>
        <AddTaskProvider>{children}</AddTaskProvider>
      </ListTaskProvider>
    </NavigationProvider>
  )
}
