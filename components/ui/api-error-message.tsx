"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";

interface ApiErrorMessage {
  error: string | null;
}

export function ApiErrorMessage({ error }: ApiErrorMessage) {
  return (
    <AnimatePresence mode="wait">
      {error && (
        <motion.div
          key={error}
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: 1,
            height: "auto",
            x: [0, -8, 8, -6, 6, -3, 3, 0],
            transition: {
              height: { duration: 0.2 },
              opacity: { duration: 0.2 },
              x: { duration: 0.45, delay: 0.1 },
            },
          }}
          exit={{ opacity: 0, height: 0, transition: { duration: 0.15 } }}
          role="alert"
          aria-live="assertive"
          className="mb-5 overflow-hidden"
        >
          <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3">
            <AlertCircle
              className="mt-0.5 h-4 w-4 shrink-0 text-destructive"
              aria-hidden="true"
            />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
