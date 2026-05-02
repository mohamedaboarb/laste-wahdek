import { motion } from "framer-motion";
export default function DoctorSelectionCard({
  doc,
  isSelected,
  onClick,
  name,
  specialty,
}: any) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={onClick}
      transition={{ duration: 0.3 }}
      className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer border-2 ${
        isSelected
          ? "bg-white border-primary shadow-xl shadow-primary/10"
          : "bg-white border-transparent hover:border-slate-200"
      }`}
    >
      <img
        src={doc.avatar}
        className="w-14 h-14 rounded-2xl object-center shadow-sm"
      />
      <div className="overflow-hidden">
        <h4
          className={`font-black truncate ${isSelected ? "text-primary" : "text-slate-700"}`}
        >
          {name}
        </h4>
        <p className="text-[11px] text-slate-400 font-bold uppercase">
          {specialty}
        </p>
      </div>
    </motion.div>
  );
}
