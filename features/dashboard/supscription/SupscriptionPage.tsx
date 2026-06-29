"use client";

import { CurrentPlanCard } from "@/components/dashboard/supscription/CurrentPlanCard";
import { FAQSection } from "@/components/dashboard/supscription/FaqSection";
import { PlansSection } from "@/components/dashboard/supscription/PlansSection";
import { StatisticsSection } from "@/components/dashboard/supscription/StatisticsSection";
import { UpcomingAppointmentCard } from "@/components/dashboard/supscription/UpcomingAppointementCard";
import { motion } from "framer-motion";

const plans = [
  {
    id: "basic",
    name: "Essential Care",
    description:
      "Routine follow-up, guidance and answers for everyday parenting questions.",
    price: "450",
    currency: "EGP",
    cta: "Choose Plan",
    featured: false,
    features: [
      "2 consultation sessions",
      "Automatic appointment booking",
      "Reminder notifications",
      "Educational library",
    ],
  },

  {
    id: "integrated",
    name: "Integrated Support",
    description:
      "Speech, behavioural and developmental support for your child.",
    price: "1200",
    currency: "EGP",
    cta: "Current Plan",
    featured: true,
    features: [
      "4 consultation sessions",
      "Assessment reports",
      "Medical profile",
      "Home action plans",
    ],
  },

  {
    id: "comprehensive",
    name: "Comprehensive Care",
    description:
      "Specialized care for autism, ADHD and complex developmental cases.",
    price: "2200",
    currency: "EGP",
    cta: "Upgrade",
    featured: false,
    features: [
      "6 consultation sessions",
      "Advanced medical profile",
      "External reports upload",
      "Monthly consultant report",
    ],
  },
];

export default function SubscriptionPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8">
      {/* Header */}

      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Subscription
        </h1>

        <p className="mt-2 max-w-2xl text-slate-500">
          Manage your subscription, monitor your monthly sessions and explore
          other care packages for your family.
        </p>
      </motion.div>

      {/* Hero */}

      <CurrentPlanCard
        planName="Integrated Support"
        price={1200}
        currency="EGP"
        status="active"
        startDate="1 July 2026"
        renewalDate="1 August 2026"
        sessionsUsed={2}
        sessionsLimit={4}
      />

      {/* Statistics */}

      <StatisticsSection sessionsIncluded={4} sessionsUsed={2} />

      {/* Appointment */}

      <UpcomingAppointmentCard
        hasAppointment
        doctor="Dr. Ahmed Hassan"
        specialization="Speech Therapist"
        date="Tomorrow"
        time="7:30 PM"
      />

      {/* Plans */}

      <PlansSection currentPlanId="integrated" plans={plans} />

      {/* FAQ */}

      <FAQSection />
    </div>
  );
}
