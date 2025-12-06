import { Suspense } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { ErrorBoundary } from 'react-error-boundary'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { TaskForm } from '@/features/tasks/TaskForm'
import { TaskList } from '@/features/tasks/TaskList'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { createTaskService, getTasksService  } from '@/services/tasks'

function App() {
  const queryClient = useQueryClient();
  const { data: tasks } = useSuspenseQuery({
    queryKey: ['tasks'],
    queryFn: getTasksService,
  });

  const { mutate: createTask } = useMutation({
    mutationFn: createTaskService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    }
  });

  return (
    <div className="space-y-4">
      <TaskForm onSubmit={(task) => createTask(task)} />
      <TaskList tasks={tasks} />
    </div>
  )
}

const AppLoader = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-40" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
    </div>
  )
}

const AppError = ({ reset }: { reset?: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-lg bg-red-50 border border-red-200 shadow-md space-y-4">
      <div className="flex flex-col items-center space-y-2">
        <svg
          className="w-10 h-10 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" strokeWidth="2" stroke="currentColor" fill="none" />
          <path stroke="currentColor" strokeWidth="2" d="M9 9l6 6m0-6l-6 6" />
        </svg>
        <h1 className="text-xl font-semibold text-red-700">Une erreur est survenue</h1>
        <p className="text-sm text-red-600">Une erreur inattendue a été détectée.<br />Vous pouvez réinitialiser l'application pour réessayer.</p>
      </div>
      <Button
        variant="destructive"
        onClick={() => {
          if (reset) reset();
          else window.location.reload();
        }}
      >
        Réinitialiser l'application
      </Button>
    </div>
  );
}

const AppWrapper = () => (
  <ErrorBoundary fallback={<AppError />}>
    <Suspense fallback={<AppLoader />}>
      <App />
    </Suspense>
  </ErrorBoundary>
);

export const Route = createFileRoute('/_layout/')({
  component: AppWrapper,
})