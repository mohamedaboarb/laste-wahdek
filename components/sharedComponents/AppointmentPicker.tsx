"use client";
import { useState, useMemo } from "react";
import {
  format,
  addDays,
  startOfToday,
  isBefore,
  isSameDay,
  parse,
} from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Forward } from "lucide-react";
import { Doctor } from "@/lib/mock-data";
import { useLocale } from "@/contexts/locale-context";

export default function DoctorAppointmentPicker({
  doctor,
  onBookingRequest,
}: {
  doctor: Doctor;
  onBookingRequest: () => void;
}) {
  const { t, locale } = useLocale();
  const today = startOfToday();

  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [weekOffset, setWeekOffset] = useState(0);

  const days = useMemo(() => {
    const start = addDays(today, weekOffset * 7);
    return Array.from({ length: 7 }).map((_, i) => addDays(start, i));
  }, [weekOffset, today]);

  const availability = useMemo(() => {
    const dayName = format(selectedDate, "eeee").toLowerCase();
    const availableSlots = doctor.schedule[dayName] || [];

    return availableSlots.map((time) => {
      const slotDateTime = parse(time, "hh:mm a", selectedDate);

      const isPassed = isBefore(slotDateTime, new Date());

      return {
        time,
        isDisabled: isPassed,
      };
    });
  }, [selectedDate, doctor.schedule]);

  return (
    <div className="bg-surface-container-low p-4 md:p-6 rounded-2xl relative border border-outline-variant shadow-sm">
      {/* الرأس (Header) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-lg font-headline font-semibold text-on-surface">
          {t.booking.selectDateAndTime}
        </h2>

        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <span className="font-bold text-on-surface min-w-[120px] text-center">
            {format(days[0], "MMMM yyyy", {
              locale: locale === "ar" ? ar : enUS,
            })}
          </span>
          <div className="flex gap-2" dir="ltr">
            <button
              onClick={() => setWeekOffset((prev) => prev - 1)}
              disabled={weekOffset <= 0}
              className="w-9 h-9 rounded-full bg-background flex items-center justify-center border border-outline-variant disabled:opacity-20 hover:bg-surface-container-high transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setWeekOffset((prev) => prev + 1)}
              className="w-9 h-9 rounded-full bg-background flex items-center justify-center border border-outline-variant hover:bg-surface-container-high transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* شبكة الأيام (Date Grid) */}
        <div className="grid grid-cols-7 gap-1 md:gap-4 mb-8 text-center">
          {days.map((date) => {
            const isSelected = isSameDay(date, selectedDate);
            const isPastDay = isBefore(date, today);
            const dayNameLower = format(date, "eeee").toLowerCase();
            const hasSlots = (doctor.schedule[dayNameLower]?.length || 0) > 0;

            return (
              <button
                key={date.toString()}
                disabled={isPastDay}
                onClick={() => {
                  setSelectedDate(date);
                  setSelectedTime(null);
                }}
                className="flex flex-col items-center gap-2 group outline-none disabled:opacity-20"
              >
                <span
                  className={`text-[10px] font-bold uppercase transition-colors ${isSelected ? "text-secondary" : "text-on-surface-variant"}`}
                >
                  {format(date, "EEE", { locale: locale === "ar" ? ar : enUS })}
                </span>
                <div
                  className={`w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center text-sm font-bold transition-all relative
                  ${isSelected ? "bg-secondary text-white shadow-md scale-110" : "text-on-surface hover:bg-surface-container-highest"}
                `}
                >
                  {format(date, "d")}
                  {/* نقطة صغيرة تدل على وجود مواعيد في هذا اليوم */}
                  {hasSlots && !isPastDay && !isSelected && (
                    <span className="absolute -bottom-1 w-1 h-1 bg-secondary rounded-full"></span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* فترات الوقت (Time Slots) */}
        <div className="flex flex-wrap gap-2 md:gap-3 pb-16">
          {availability.length > 0 ? (
            availability.map(({ time, isDisabled }) => (
              <button
                key={time}
                disabled={isDisabled}
                onClick={() => setSelectedTime(time)}
                className={`px-4 md:px-6 py-2 rounded-full font-medium text-xs md:text-sm transition-all border
                  ${
                    selectedTime === time
                      ? "bg-secondary text-white font-bold border-secondary shadow-sm"
                      : "bg-surface-container-highest text-on-surface-variant border-transparent hover:border-outline-variant"
                  }
                  disabled:opacity-20 disabled:cursor-not-allowed
                `}
              >
                {time}
              </button>
            ))
          ) : (
            <div className="w-full text-center py-4 text-on-surface-variant text-sm bg-surface-container-high rounded-xl">
              {t.booking.labels.busy}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 ">
        <div className="w-full md:flex-1">
          <p className="text-popover-foreground/80 font-bold text-sm md:text-base leading-relaxed text-center md:text-start">
            {selectedDate &&
              selectedTime &&
              `${t.booking.labels.appointmentSet} ${format(
                selectedDate,
                "EEEE, d MMMM yyyy",
                {
                  locale: locale === "ar" ? ar : enUS,
                },
              )} - ${selectedTime}`}
          </p>
        </div>

        <button
          onClick={onBookingRequest}
          disabled={!selectedTime}
          className={`w-full md:w-fit py-4 px-8 bg-primary text-white rounded-2xl font-black text-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02]active:scale-95 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed flex items-center justify-center gap-2 md:ms-auto}
          `}
        >
          {t.booking.labels.book}
          <Forward
            className={`w-4 h-4 transition-transform  ${locale === "ar" ? "rotate-180" : ""}`}
          />
        </button>
      </div>
    </div>
  );
}
