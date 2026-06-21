"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import HeadlineSection from "../sharedComponents/HeadlineSection";
import { useLocale } from "@/contexts/locale-context";
import SectionDivider from "../sharedComponents/SectionDivider";

export default function PricingSection() {
  const { t } = useLocale();
  const plans = t.landing.pricing.plans;

  return (
    <section className="relative py-20 bg-linear-to-b from-primary to-background overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 z-10">
        <HeadlineSection
          heading={t.landing.pricing.title}
          paragraph={t.landing.pricing.subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch mt-4">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`relative flex flex-col rounded-4xl p-8 bg-card transition-all duration-300 ${
                plan.featured
                  ? "border-2 border-primary shadow-2xl shadow-primary/15 lg:-translate-y-3"
                  : "border border-primary/10 shadow-sm hover:shadow-lg"
              }`}
            >
              {/* شارة الأكثر شيوعاً */}
              {plan.featured && (
                <div
                  className={`absolute -top-4 inset-s-8 flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-4 py-1.5 text-xs font-bold shadow-lg shadow-primary/30`}
                >
                  <Sparkles size={14} />
                  {t.landing.pricing.popularBadge}
                </div>
              )}

              {/* العنوان والوصف */}
              <div className="space-y-2 min-h-[90px] flex flex-col justify-between">
                <h3
                  className={`text-xl font-black tracking-tight ${plan.featured ? "text-primary" : "text-foreground"}`}
                >
                  {plan.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed grow">
                  {plan.description}
                </p>
              </div>

              {/* السعر */}
              <div className="mt-6 mb-1 flex items-end gap-1.5">
                <span
                  className={`text-4xl font-black tracking-tight ${
                    plan.featured ? "text-primary" : "text-foreground"
                  }`}
                >
                  {plan.price}
                </span>
                <span className="text-muted-foreground font-bold text-sm pb-1.5">
                  {t.landing.pricing.currency}
                </span>
              </div>
              <span className="text-[11px] text-muted-foreground/70 font-medium mb-6">
                {t.landing.pricing.monthlySubscription}
              </span>

              {/* زر الاشتراك */}
              <button
                className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 active:scale-[0.97] mb-8 ${
                  plan.featured
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90"
                    : "bg-muted text-foreground hover:bg-primary/10"
                }`}
              >
                {plan.cta}
              </button>

              {/* الفواصل */}
              <div className="h-px w-full bg-border mb-6" />

              {/* المميزات */}
              <ul className="flex flex-col gap-4 grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        plan.featured
                          ? "bg-primary/15 text-primary"
                          : "bg-accent/20 text-accent"
                      }`}
                    >
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span className="text-sm text-foreground/80 leading-relaxed font-medium">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
      <SectionDivider fillColor="background" />
    </section>
  );
}
