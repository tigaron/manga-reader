import { Info, Loader2, ServerCrash } from "lucide-react";

export function StatusPending({
  message = "Loading...",
}: {
  message?: string;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <Loader2 className="my-4 h-7 w-7 animate-spin text-zinc-500" />
      <p className="text-xs text-zinc-500 dark:text-zinc-400">{message}</p>
    </div>
  );
}

export function StatusError({ message }: { message: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <ServerCrash className="my-4 h-7 w-7 text-zinc-500" />
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Error: {message}
      </p>
    </div>
  );
}

export function StatusInfo({ message }: { message: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <Info className="my-4 h-7 w-7 text-zinc-500" />
      <p className="text-xs text-zinc-500 dark:text-zinc-400">{message}</p>
    </div>
  );
}
