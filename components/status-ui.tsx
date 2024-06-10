import { Info, Loader2, ServerCrash } from "lucide-react";

/* 
import { Skeleton } from "@/components/ui/skeleton"
 
export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
*/

export function StatusPending({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <Loader2 className="w-7 h-7 text-zinc-500 animate-spin my-4" />
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        {message}
      </p>
    </div>
  );
}

export function StatusError({ message }: { message: string }) {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <ServerCrash className="w-7 h-7 text-zinc-500 my-4" />
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Error: {message}
      </p>
    </div>
  );
}

export function StatusInfo({ message }: { message: string }) {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <Info className="w-7 h-7 text-zinc-500 my-4" />
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        {message}
      </p>
    </div>
  );
}
