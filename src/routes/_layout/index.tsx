import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import type { Task } from '@/types'
import { TaskForm } from '@/features/tasks/TaskForm'
import { TaskList } from '@/features/tasks/TaskList'

export const Route = createFileRoute('/_layout/')({
  component: App,
})

function App() {
  const [tasks, setTasks] = useState<Array<Task>>([
    { id: '1', title: 'Task 1', state: false },
    { id: '2', title: 'Task 2', state: false },
    { id: '3', title: 'Task 3', state: false },
  ])

  return (
    <div>
      <TaskForm onSubmit={(task) => setTasks([...tasks, task])} />
      <TaskList tasks={tasks} />
    </div>
  )
}
