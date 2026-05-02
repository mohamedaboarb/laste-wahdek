"use client";
import { headingProps } from "@/lib/mock-data";
import { motion } from "framer-motion";

function StepCard({ heading, paragraph, stepNumber, step }: headingProps) {
  if (!heading && !paragraph) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: Number(stepNumber) * 0.1,
        ease: "easeInOut",
      }}
      className="group relative bg-white rounded-2xl pt-10 px-6 pb-2 text-start border-none flex flex-col h-full sm:min-h-[280px] md:min-h-[350px] lg:min-h-[220px] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* upper badge */}
      {step && (
        <span className="absolute -top-0 inset-e-8 bg-destructive text-white px-5 py-1.5 rounded-b-2xl text-[10px] font-black uppercase tracking-widest z-10 shadow-sm shadow-destructive/20 group-hover:py-2 transition-all">
          {step}
        </span>
      )}

      <h3 className="font-black text-secondary text-xl mb-4 leading-tight group-hover:text-primary transition-colors">
        {heading}
      </h3>

      <p className="text-slate-500 leading-relaxed text-sm md:text-base grow  overflow-hidden">
        {paragraph}
      </p>

      <div className="mt-6 pt-2 border-t border-slate-50 flex justify-between items-center">
        <span className="text-xl font-bold text-[#334155] opacity-10 group-hover:opacity-30 transition-opacity">
          {stepNumber}
        </span>
        <div className="w-0 h-1 bg-destructive/10 rounded-full lg:group-hover:w-[80%] group-hover:bg-destructive transition-all" />
      </div>
    </motion.div>
  );
}

export default StepCard;
