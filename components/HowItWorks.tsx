"use client";
import Image from "next/image";
import HeadlineSection from "./sharedComponents/HeadlineSection";
import StepCard from "./sharedComponents/StepCard";
import SectionDivider from "./sharedComponents/SectionDivider";
import { useLocale } from "@/contexts/locale-context";

function HowItWorks() {
  const { t } = useLocale();

  const steps = Object.values(t.landing.howItWorks.items);
  const leftColumnSteps = [steps[0], steps[1]];
  const rightColumnSteps = [steps[2], steps[3]];

  return (
    <div className="bg-linear-to-b from bg-background to-primary relative">
      <div className="mx-auto max-w-7xl px-4 py-16 overflow-hidden">
        <HeadlineSection
          heading={t.landing.howItWorks.title}
          paragraph={t.landing.howItWorks.subtitle}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 items-center text-muted">
          {/* left column*/}
          <div className="flex flex-col gap-6">
            {leftColumnSteps.map((stepData, index) => (
              <StepCard
                key={index}
                heading={stepData.title}
                paragraph={stepData.description}
                step={stepData.number}
                stepNumber={stepData.bgNumber}
              />
            ))}
          </div>
          {/* center image*/}
          <div className="hidden md:flex justify-center items-center bg-red-100 md:p-2 lg:p-4 self-center rounded-[3rem] shadow-inner">
            <div className="relative w-full lg:h-[400px] md:h-[250px]">
              <Image
                src="/images/Advertisement woman.webp"
                alt="Mother holding baby"
                fill
                className="object-cover rounded-[2.5rem] shadow-2xl"
                priority
              />
            </div>
          </div>
          {/* right column*/}
          <div className="flex flex-col gap-6">
            {rightColumnSteps.map((stepData, index) => (
              <StepCard
                key={index}
                heading={stepData.title}
                paragraph={stepData.description}
                step={stepData.number}
                stepNumber={stepData.bgNumber}
              />
            ))}
          </div>
        </div>
      </div>
      <SectionDivider fillColor={"background"} />
    </div>
  );
}

export default HowItWorks;
