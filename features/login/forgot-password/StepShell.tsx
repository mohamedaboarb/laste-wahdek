"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface StepShellProps {
  title: string;
  subtitle: string;
  onBack?: () => void;
  backLabel?: string;
  children: React.ReactNode;
  /** Unique key per step so AnimatePresence can animate between them */
  stepKey: string;
}

const variants = {
  enter: { opacity: 0, x: -24 },
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, x: 24, transition: { duration: 0.22 } },
};

export function StepShell({
  title,
  subtitle,
  onBack,
  backLabel,
  children,
  stepKey,
}: StepShellProps) {
  return (
    <motion.div
      key={stepKey}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      className="mx-auto flex w-full max-w-md flex-col p-4"
    >
      {/* 1. Back link */}
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="mb-4 flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary self-start"
        >
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
          {backLabel}
        </button>
      )}

      <div className="relative mx-auto mb-6 w-full max-w-[260px] flex items-center justify-center select-none pointer-events-none h-[22vh] min-h-[140px] max-h-[220px]">
        <Image
          src="/images/forgot-password.jpg"
          alt="Forgot Password Illustration"
          fill
          priority
          sizes="(max-w-md) 100vw, 260px"
          className="object-contain"
        />
      </div>

      {/* 3. Heading & Subtitles */}
      <div className="mb-6 text-center">
        <h1 className="text-xl font-bold tracking-tight text-primary sm:text-2xl">
          {title}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-white px-2">
          {subtitle}
        </p>
      </div>

      {/* 4. Inputs and Buttons Container */}
      <div className="w-full space-y-4">{children}</div>
    </motion.div>
  );
}
