import { useQuery } from "@tanstack/react-query";
import { getStatusService } from "@/services/status";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const Status = () => {
  const { data: status, isLoading, error } = useQuery({
    queryKey: ['status'],
    queryFn: getStatusService,
  });
  
  if (isLoading) return (<Skeleton className="w-full h-10" />)

  return (
    <div className="flex flex-col gap-2">
      {error ? 
        <Alert variant="destructive">
          <AlertTitle>Erreur: connection à l'API impossible</AlertTitle>
        </Alert>
      : status?.database !== "connected" ?
        <Alert variant="destructive">
          <AlertTitle>Avertissement: connection à la base de données impossible</AlertTitle>
          <AlertDescription>
            L'API est accessible depuis le front, mais la base de données n'est pas connectée.
          </AlertDescription>
        </Alert>
      : 
        <Alert variant="default">
          <AlertTitle>Succès: connection à la base de données</AlertTitle>
          <AlertDescription>
            La base de données est connectée.
          </AlertDescription>
        </Alert>
      }
    </div>
  )
}