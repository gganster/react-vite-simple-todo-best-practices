import type { Task } from '@/types'

type TaskListItemProps = {
  task: Task
}

export const TaskListItem = ({ task }: TaskListItemProps) => {
  return (
    <div>
      <h1>{task.title}</h1>
    </div>
  )
}