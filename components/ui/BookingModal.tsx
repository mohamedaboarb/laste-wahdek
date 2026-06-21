import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, LayoutDashboard, X } from "lucide-react";
import Link from "next/link";
interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: {
    type: "success" | "warning" | "limit-reached" | "specialization-conflict";
    message: string;
  };
  onConfirm: () => void;
}

export default function BookingModal({
  isOpen,
  onClose,
  config,
  onConfirm,
}: BookingModalProps) {
  if (!isOpen) return null;

  const isErrorCase =
    config.type === "limit-reached" ||
    config.type === "specialization-conflict";

  return (
    // 1. الخلفية الزجاجية الداكنة (Overlay)
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-[5px]">
      {/* 2. المودال نفسه مع أنيميشن ناعم */}
      <motion.div
        initial={{ scale: 0.8, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="bg-white rounded-[2.5rem] p-6 md:p-10 max-w-lg w-full shadow-[0_30px_90px_-15px_rgba(0,0,0,0.3)] relative overflow-hidden border border-slate-100"
      >
        {/* 3. زر الإغلاق السريع */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 md:top-8 md:left-8 p-1.5 bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors z-10"
        >
          <X size={16} />
        </button>

        <div className="flex flex-col items-center text-center">
          {/* 4. حاوية الأيقونة مع تدرج لوني احترافي */}
          <div
            className={`w-20 h-20 md:w-24 md:h-24 rounded-3xl flex items-center justify-center mb-8 relative border-8 ${isErrorCase ? "bg-red-50 border-red-100" : "bg-green-50 border-green-100"}`}
          >
            {isErrorCase ? (
              <AlertTriangle className="text-red-500" size={40} />
            ) : (
              <CheckCircle2 className="text-green-500" size={40} />
            )}
            <div
              className={`absolute -bottom-2 -right-2 p-2 rounded-full ${isErrorCase ? "bg-red-500" : "bg-green-500"}`}
            />
          </div>

          {/* 5. النصوص (Title & Message) */}
          <h3 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-tight mb-3">
            {isErrorCase ? "تنبيه " : "تأكيد الموعد"}
          </h3>

          <p className="text-slate-500 font-semibold text-base md:text-lg leading-relaxed mb-10 px-2 max-w-sm">
            {config.message}
          </p>

          {/* 6. الأزرار التفاعلية (Actions) */}
          <div className="flex flex-col sm:flex-row gap-4 w-full pt-4 border-t border-slate-50">
            {isErrorCase ? (
              <Link
                href="/dashboard/mother"
                onClick={onClose}
                className="w-full flex items-center justify-center gap-3.5 py-5 rounded-2xl bg-slate-950 text-white font-black text-lg shadow-xl shadow-slate-900/10 hover:bg-slate-800 transition active:scale-[0.97]"
              >
                <LayoutDashboard size={16} /> إدارة الأطباء في لوحة التحكم
              </Link>
            ) : (
              <>
                <button
                  onClick={onConfirm}
                  className="w-full py-4.5 bg-primary text-white rounded-2xl font-black text-sm hover:opacity-95 transition-all shadow-xl shadow-primary/20 scale-100 hover:scale-[1.02] active:scale-95"
                >
                  نعم، تأكيد وحجز الموعد الآن
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-8 py-4.5 bg-slate-50 text-slate-400 rounded-2xl font-black text-sm hover:bg-slate-100 Transition-colors"
                >
                  إلغاء
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
