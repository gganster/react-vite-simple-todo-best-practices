import type { Task } from "@/types";
import { apiClient } from "@/apiClient";

export const getTasksService = async () => apiClient<Array<Task>>('/tasks');

export const createTaskService = async (task: Task) => apiClient<Task>('/tasks', {
  method: 'POST',
  body: JSON.stringify(task),
});

export const updateTaskService = async (task: Task) => apiClient<Task>('/tasks', {
  method: 'PUT',
  body: JSON.stringify(task),
});

export const deleteTaskService = async (id: string) => apiClient<void>(`/tasks/${id}`, {
  method: 'DELETE',
});