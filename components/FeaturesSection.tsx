"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/contexts/locale-context";
import HeadlineSection from "./sharedComponents/HeadlineSection";
import SectionDivider from "./sharedComponents/SectionDivider";

export function FeaturesSection() {
  const { t, dir } = useLocale();

  return (
    <main dir={dir} className="bg-background py-20 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4">
        <HeadlineSection
          heading={t.landing.features.title}
          paragraph={t.landing.features.subtitle}
        />
        <div className="grid gap-8 md:grid-cols-3">
          {Object.entries(t.landing.features.items).map(
            ([key, feature], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 * index }}
                className="group flex flex-col items-center rounded-2xl border bg-background p-8 text-center transition-shadow hover:shadow-lg"
              >
                <div
                  className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10`}
                >
                  {/* التأكد من أن الأيقونة تُعامل كمكون */}
                  <feature.icon className="h-8 w-8 text-accent" />
                </div>

                {/* الوصول للعنوان الصحيح title بدلاً من feature */}
                <h3 className="mb-3 text-xl font-bold text-foreground">
                  {feature.title}
                </h3>

                <p className="leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ),
          )}
        </div>
      </div>
      <SectionDivider fillColor={"background"} />
    </main>
  );
}
