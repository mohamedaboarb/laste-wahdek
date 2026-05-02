import { useLocale } from "@/contexts/locale-context";
import Image from "next/image";
import StatItem from "../ui/StatItem";
import { Award, Star } from "lucide-react";

export default function SpecialistCard({
  image,
  name,
  role,
  bio,
}: {
  image: string;
  name: string;
  role: string;
  bio: string;
}) {
  const { t } = useLocale();
  return (
    <div className="flex justify-center items-center p-6">
      <div className="w-full max-w-sm rounded-4xl overflow-hidden shadow-2xl shadow-red-900/10 bg-background flex flex-col border border-red-50">
        <div className="relative h-72 [clip-path:polygon(0_0,100%_0,100%_100%,0_calc(100%-40px))]">
          <Image
            src={image}
            alt={name}
            fill
            className="object-center transition-transform duration-700 hover:scale-110"
          />
        </div>

        <div className="relative flex justify-between items-center px-8 -mt-10 z-30">
          <div className="flex items-center bg-white/90 backdrop-blur-md border border-red-100 shadow-sm px-4 py-2 rounded-full">
            <span className="relative flex h-2 w-2 me-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-muted-foreground/90 font-bold text-xs">
              {t.landing.specialists.status.available}
            </span>
          </div>

          <button className="group flex items-center justify-center w-14 h-14 bg-primary text-background rounded-full hover:bg-red-500 hover:rotate-90 transition-all duration-500 shadow-lg shadow-red-200 cursor-pointer overflow-hidden">
            <span className="text-3xl font-light leading-none select-none mb-1">
              +
            </span>
          </button>
        </div>

        <div className="p-6 text-center">
          <h2 className="text-2xl font-black text-foreground">{name}</h2>
          <p className="text-primary font-bold text-sm mt-1">{role}</p>
          <p className="text-muted-foreground text-xs mt-4 leading-relaxed font-medium">
            {bio}
          </p>
        </div>

        <div className="p-4 grid grid-cols-2 border-t border-red-50/50 mx-6">
          <StatItem
            label={t.stats.experience}
            value={10}
            icon={<Award size={14} />}
          />
          <StatItem
            label={t.stats.rating}
            value={4.2}
            icon={<Star size={14} className="fill-current" />}
          />
        </div>
      </div>
    </div>
  );
}
