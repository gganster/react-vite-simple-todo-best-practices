import { Pencil, Trash2 } from 'lucide-react'
import type { Task } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'

type TaskListItemProps = {
  task: Task
  onToggle?: (id: string) => void
  onEdit?: (task: Task) => void
  onDelete?: (id: string) => void
}

export const TaskListItem = ({ task, onToggle, onEdit, onDelete }: TaskListItemProps) => {
  return (
    <Card>
      <CardContent className="flex items-center gap-4">
        <Checkbox
          checked={task.state}
          onCheckedChange={() => onToggle?.(task.id)}
        />
        
        <span 
          className={`flex-1 ${task.state ? 'line-through text-muted-foreground' : ''}`}
        >
          {task.title}
        </span>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit?.(task)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete?.(task.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}