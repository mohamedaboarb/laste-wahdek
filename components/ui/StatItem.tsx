export default function StatItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: any;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col justify-between items-center">
      <span className="text-[10px] uppercase font-black opacity-60 mb-1 flex items-center gap-1">
        {icon} {label}
      </span>
      <span className="text-xl font-black">{value}</span>
    </div>
  );
}
