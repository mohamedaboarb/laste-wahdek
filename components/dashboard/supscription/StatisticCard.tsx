"use client";

import { StatisticCardProps } from "@/features/dashboard/supscription/supscription.types";
import { motion } from "framer-motion";

export function StatisticCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = "text-pink-500",
}: StatisticCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"
    >
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <h3 className="mt-2 text-3xl font-bold text-slate-900">{value}</h3>

          {subtitle && (
            <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
          )}
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-50 ${iconColor}`}
        >
          <Icon className="h-7 w-7" />
        </div>
      </div>
    </motion.div>
  );
}
