import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <Outlet />
      </div>
    </div>
  )
}
