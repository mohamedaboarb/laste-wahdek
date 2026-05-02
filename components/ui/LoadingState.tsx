import { Loader2 } from "lucide-react";

function LoadingState({ message }: { message: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fffbf0] gap-4">
      <Loader2 className="animate-spin text-primary" size={48} />
      <p className="text-slate-400 font-medium">{message}</p>
    </div>
  );
}

export default LoadingState;
