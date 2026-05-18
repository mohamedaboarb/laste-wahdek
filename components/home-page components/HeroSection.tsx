"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionDivider from "@/components/sharedComponents/SectionDivider";
import ImageArm from "../sharedComponents/ImageArm";
import { useLocale } from "@/contexts/locale-context";
export default function HeroSection() {
  const { t } = useLocale();
  return (
    <main className="relative overflow-hidden bg-linear-to-t from-popover-foreground to bg-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" }}
            className="flex flex-col gap-8 order-2 lg:order-1 text-center lg:text-start items-center lg:items-start"
          >
            <div className="space-y-4">
              <h1 className="text-secondary text-4xl md:text-6xl font-black leading-tight tracking-tight">
                {t.landing.hero.title}... <br />
                <span className="text-background">
                  {t.landing.hero.subtitle}
                </span>
              </h1>
              <p className="text-muted/60 text-lg md:text-xl leading-relaxed max-w-xl font-med">
                {t.landing.hero.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button className="btn-primary">{t.landing.hero.cta}</button>
              <Link href="/doctors">
                <button className="btn-secondary">
                  {t.landing.hero.ctaSecondary}
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Image & Moon Section */}
          <div className="relative flex justify-center items-center order-1 lg:order-2 h-[450px] md:h-[600px] w-full">
            <motion.div
              initial={{ x: -100, opacity: 0, rotate: -20 }}
              animate={{ x: 0, opacity: 1, rotate: -20 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 translate-y-4 -translate-x-[75px] md:-translate-x-[125px] lg:-translate-x-[150px] z-10 w-32 h-32 md:w-48 md:h-48 pointer-events-none"
            >
              <Image
                src="/images/lefthand.webp"
                alt="holding hand"
                fill
                className="object-cover drop-shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ x: 100, opacity: 0, rotate: -20 }}
              animate={{ x: 0, opacity: 1, rotate: 20 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
              className="absolute top-1/2 right-1/2 translate-y-4 translate-x-[75px] md:translate-x-[125px] lg:translate-x-[150px] z-10 w-32 h-32 md:w-48 md:h-48 pointer-events-none"
            >
              <Image
                src="/images/righthand.webp"
                alt="holding hand"
                fill
                className="object-cover drop-shadow-2xl"
              />
            </motion.div>
            {/* Center Profile Circle */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className=" relative z-20 w-48 h-48 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full border-4 border-background overflow-hidden transform hover:scale-105 transition-transform duration-500"
            >
              <Image
                src="/images/heroImage.webp"
                fill
                className="object-cover"
                alt="mother carrying baby"
                priority
              />
            </motion.div>
            <ImageArm
              side={"right"}
              title="pediatricians"
              positionClasses="translate-x-[85px] md:translate-x-[130px] lg:translate-x-[150px]"
            />
            <ImageArm
              side={"left"}
              title="psychologists"
              positionClasses="-translate-x-[150px] md:-translate-x-[230px] lg:-translate-x-[250px] "
            />
          </div>
        </div>
      </div>
      <SectionDivider fillColor={"background"} />
    </main>
  );
}
