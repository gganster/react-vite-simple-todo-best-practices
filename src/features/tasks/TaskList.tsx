import { TaskListItem } from './TaskListItem'
import type { Task } from '@/types'

type TaskListProps = {
  tasks: Array<Task>
}

export const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskListItem
          key={task.id}
          task={task}
        />
      ))}
    </div>
  )
}