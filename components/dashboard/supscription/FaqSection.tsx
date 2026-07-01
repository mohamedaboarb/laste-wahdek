"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLocale } from "@/contexts/locale-context";

export function FAQSection() {
  const { t } = useLocale();
  const faq = t.subscriptionDashboard.faq;

  return (
    <section className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm">
      <h2 className="text-2xl font-bold">{faq.title}</h2>

      <p className="mt-2 text-slate-500">{faq.subtitle}</p>

      <Accordion type="single" collapsible className="mt-8">
        {faq.questions.map((item) => (
          <AccordionItem key={item.q} value={item.q}>
            <AccordionTrigger>{item.q}</AccordionTrigger>
            <AccordionContent>{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
