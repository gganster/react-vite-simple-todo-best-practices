import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold">Todo List</h1>
        <div className="space-y-4 mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
