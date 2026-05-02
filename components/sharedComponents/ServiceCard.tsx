import { motion } from "framer-motion";

interface ServiceProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export default function ServiceCard({
  title,
  description,
  icon,
  color,
}: ServiceProps) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="relative group p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
    >
      <div
        className={`absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-500`}
        style={{ backgroundColor: color }}
      />

      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
        style={{ backgroundColor: `${color}15`, color: color }}
      >
        {icon}
      </div>

      <h3 className="text-2xl font-black text-slate-800 mb-4 group-hover:text-[#F57799] transition-colors">
        {title}
      </h3>
      <p className="text-slate-500 leading-relaxed font-medium">
        {description}
      </p>

      <div
        className="mt-8 flex items-center gap-2 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0"
        style={{ color: color }}
      >
        <span>اكتشفي المزيد</span>
        <div className="w-8 h-[2px]" style={{ backgroundColor: color }} />
      </div>
    </motion.div>
  );
}
