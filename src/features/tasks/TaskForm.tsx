import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import type { Task } from "@/types"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"

const taskSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  state: z.boolean(),
})

type TaskFormValues = z.infer<typeof taskSchema>

type TaskFormProps = {
  initialTask?: Task
  onSubmit: (task: Task) => void
}

export const TaskForm = ({ initialTask, onSubmit }: TaskFormProps) => {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: initialTask?.title ?? "",
      state: initialTask?.state ?? false,
    },
  })

  const handleSubmit = (values: TaskFormValues) => {
    const task: Task = {
      id: initialTask?.id ?? crypto.randomUUID(),
      title: values.title,
      state: values.state,
    }
    onSubmit(task)
    if (!initialTask) {
      form.reset()
    }
  }

  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre</FormLabel>
                  <FormControl>
                    <Input placeholder="Entrez le titre de la tâche" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Tâche complétée</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit">
              {initialTask ? "Modifier" : "Ajouter"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}