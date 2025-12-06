import { apiClient } from "@/apiClient";

export const getStatusService = async () => apiClient<{ status: string, database: string, timestamp: string }>('/status');