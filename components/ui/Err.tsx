import { AlertCircle } from "lucide-react";

function Err({ field, errors }: { field: keyof typeof errors; errors: any }) {
  return (
    <div>
      {errors[field] && (
        <p className="mt-0 text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" /> {errors[field]?.message}
        </p>
      )}
    </div>
  );
}

export default Err;
