import { mockDoctors as doctors } from "@/lib/mock-data";
import { motion } from "framer-motion";
import Image from "next/image";

function ImageArm({
  side,
  title,
  positionClasses,
}: {
  side: "left" | "right";
  title: string;
  positionClasses: string;
}) {
  return (
    <motion.div
      initial={{
        height: 0,
        opacity: 0,
      }}
      animate={{
        height: "70%",
        opacity: 1,
      }}
      transition={{
        duration: 0.8,
        ease: "backInOut",
        delay: 0.4,
      }}
      className={`absolute top-1/2 left-1/2 -translate-y-1/2 w-16 md:w-24 h-[70%] flex flex-col items-center bg-white/20 rounded-full border border-white/30 p-4 z-10 ${positionClasses}`}
    >
      <span className="text-white font-bold text-[10px] md:text-xs mb-4 text-center">
        {title}
      </span>
      <div className="flex flex-col gap-3 scrollbar-hide space-y-8">
        {doctors
          .filter((doctor) => doctor.specialization === title.slice(0, -1))
          .slice(0, 3)
          .map((doctor) => (
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              key={doctor.id}
              className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-white overflow-hidden shrink-0"
            >
              <Image
                src={doctor.avatar}
                width={60}
                height={60}
                alt={doctor.fullName}
                className="object-cover"
              />
            </motion.div>
          ))}
      </div>
    </motion.div>
  );
}

export default ImageArm;
