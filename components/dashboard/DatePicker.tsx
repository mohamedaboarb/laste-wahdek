// components/dashboard/DatePickerField.tsx
"use client";

import DatePicker from "react-datepicker";
import { Calendar } from "lucide-react";

interface DatePickerFieldProps {
  value?: Date | null;
  onChange: (date: Date | null) => void;
  disabled?: boolean;
}

export function DatePickerField({
  value,
  onChange,
  disabled,
}: DatePickerFieldProps) {
  return (
    <div className="relative w-full">
      <Calendar className="absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-slate-400" />

      <DatePicker
        selected={value}
        onChange={onChange}
        disabled={disabled}
        dateFormat="dd/MM/yyyy"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        yearDropdownItemNumber={80} // تغطية كافية لأعمار الأمهات
        scrollableYearDropdown
        minDate={new Date(1950, 0, 1)}
        maxDate={new Date()} // يمنع اختيار تاريخ مستقبلي
        placeholderText="Select birth date"
        className=" h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm shadow-sm transition focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-100 disabled:opacity-50 disabled:bg-slate-50
        "
      />
    </div>
  );
}
