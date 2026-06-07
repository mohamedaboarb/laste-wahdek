"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import HeadlineSection from "../sharedComponents/HeadlineSection";
import { useLocale } from "@/contexts/locale-context";
import { servicesData } from "@/lib/mock-data";

export default function OurServices() {
  const { t, dir } = useLocale();
  type ServiceId = keyof typeof t.landing.services.items;

  const [activeId, setActiveId] = useState<ServiceId>("telemedicine");

  const activeBase =
    servicesData.find((s) => s.id === activeId) || servicesData[0];
  const activeContent = t.landing.services.items[activeId];

  const xOffset = dir === "rtl" ? 40 : -40;

  return (
    <section className="py-12 bg-linear-to-b from-popover-foreground to-primary overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <HeadlineSection
          heading={t.landing.services.title}
          paragraph={t.landing.services.subtitle}
        />

        {/* Carousel Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 mb-10 w-full py-2">
          {servicesData.map((service) => {
            const isActive = activeId === service.id;
            const tabText = t.landing.services.items[service.id as ServiceId];

            return (
              <button
                key={service.id}
                onClick={() => setActiveId(service.id as ServiceId)}
                className=" flex flex-col items-center group outline-none"
              >
                <motion.span
                  animate={{ opacity: isActive ? 1 : 0.5 }}
                  className={`mb-2 text-[9px] lg:text-xs font-bold uppercase tracking-wider transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {t.landing.services.title}
                </motion.span>

                <div
                  className={`w-16 h-20 md:w-20 md:h-24 flex items-center justify-center rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-white shadow-lg border border-primary/5"
                      : "bg-muted/30 hover:bg-muted/50"
                  }`}
                >
                  <motion.div
                    animate={
                      isActive
                        ? {
                            scale: 1.1,
                            y: [0, -6, 0],
                          }
                        : {
                            scale: 0.85,
                            y: 0,
                          }
                    }
                    transition={
                      isActive
                        ? {
                            y: {
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            },
                            scale: { duration: 0.3 },
                          }
                        : { duration: 0.3 }
                    }
                    className={isActive ? "text-primary" : "text-slate-400"}
                  >
                    {service.icon}
                  </motion.div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Content Section  */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, x: xOffset }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -xOffset }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white rounded-[2rem] p-5 lg:p-10 shadow-xl shadow-primary/5 border border-primary/5"
          >
            {/* Image Section - Smaller & Rounded */}
            <div className="relative mx-auto w-full max-w-[340px] h-[180px] md:h-[220px] rounded-2xl overflow-hidden shadow-md">
              <Image
                src={activeBase.image}
                alt={activeContent.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
            </div>

            {/* Text Content Section */}
            <div className="text-start space-y-4">
              <div className="inline-block px-3 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase">
                {activeId}
              </div>

              <h3 className="text-2xl lg:text-3xl font-black text-slate-800 leading-tight">
                {activeContent.title}
              </h3>

              <p className="text-slate-600 leading-relaxed text-sm md:text-base font-medium opacity-80">
                {activeContent.description}
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {activeContent.features.map((feature: string, i: number) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-3 text-slate-700 font-semibold group"
                  >
                    <span className="shrink-0 w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={4}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <span className="text-sm">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
