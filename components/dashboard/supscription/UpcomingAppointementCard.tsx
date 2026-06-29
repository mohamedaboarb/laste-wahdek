"use client";

import { motion } from "framer-motion";
import { CalendarDays, Clock3, UserRound, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface AppopintmentCardProps {
  hasAppointment: boolean;

  doctor?: string;

  specialization?: string;

  date?: string;

  time?: string;

  onView?: () => void;

  onBook?: () => void;
}

export function UpcomingAppointmentCard({
  hasAppointment,
  doctor,
  specialization,
  date,
  time,
  onBook,
  onView,
}: AppopintmentCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm"
    >
      <h2 className="mb-6 text-xl font-bold text-slate-900">
        Upcoming Appointment
      </h2>

      {hasAppointment ? (
        <>
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-50 text-pink-500">
              <UserRound className="h-8 w-8" />
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold">{doctor}</h3>

              <p className="text-slate-500">{specialization}</p>
            </div>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-2">
            <div className="flex items-center gap-3">
              <CalendarDays className="text-pink-500" />

              <span>{date}</span>
            </div>

            <div className="flex items-center gap-3">
              <Clock3 className="text-pink-500" />

              <span>{time}</span>
            </div>
          </div>

          <Button onClick={onView} className="mt-8 rounded-xl">
            View Appointment
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </>
      ) : (
        <div className="rounded-2xl bg-pink-50 p-8 text-center">
          <h3 className="text-xl font-semibold">No upcoming appointments</h3>

          <p className="mt-2 text-slate-500">
            Schedule your next consultation.
          </p>

          <Button className="mt-6 rounded-xl" onClick={onBook}>
            Book Session
          </Button>
        </div>
      )}
    </motion.section>
  );
}
