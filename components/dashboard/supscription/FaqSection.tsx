"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const QUESTIONS = [
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes. Your subscription remains active until the end of the current billing period.",
  },

  {
    question: "What happens if I don't use all sessions?",
    answer:
      "Unused monthly sessions expire at the end of the billing cycle and do not roll over.",
  },

  {
    question: "Can I upgrade my package later?",
    answer:
      "Absolutely. Upgrades are applied immediately, and billing is adjusted accordingly.",
  },

  {
    question: "How are appointments booked?",
    answer:
      "Appointments are automatically matched with both the doctor's and mother's availability.",
  },

  {
    question: "Will I receive reminders?",
    answer:
      "Yes. You'll receive reminder notifications before every scheduled consultation.",
  },
];

export function FAQSection() {
  return (
    <section className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm">
      <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>

      <p className="mt-2 text-slate-500">
        Everything you need to know about subscriptions.
      </p>

      <Accordion type="single" collapsible className="mt-8">
        {QUESTIONS.map((item) => (
          <AccordionItem key={item.question} value={item.question}>
            <AccordionTrigger>{item.question}</AccordionTrigger>

            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
