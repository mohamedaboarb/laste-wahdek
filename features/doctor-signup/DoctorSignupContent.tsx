"use client";

import { useState, useEffect } from "react";
import { buildDoctorPayload, Step1Values, Step2Values } from "./Doctor.schema";
import { StepIndicator } from "./Stepindicator";
import { DoctorStep1 } from "./Doctorstep1";
import { DoctorStep2 } from "./Doctorstep2";
import { useRouter } from "next/navigation";
import { useLocale } from "@/contexts/locale-context";
import { ApiErrorMessage } from "@/components/ui/api-error-message";
import { registerDoctor } from "./Doctor.service";
import { DoctorServiceError } from "../types/types";

export function DoctorSignupContent() {
  const { t } = useLocale();
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [step1Data, setStep1Data] = useState<Step1Values | null>(null);
  const [step2Data, setStep2Data] = useState<Step2Values | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // التوجيه التلقائي فور نجاح الطلب
  useEffect(() => {
    if (submitted) {
      router.push("/signup/signup-success");
    }
  }, [submitted, router]);

  const handleStep1Next = (data: Step1Values) => {
    setStep1Data(data);
    setApiError(null);
    setStep(2);
    document
      .getElementById("auth-scroll-panel")
      ?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStep2Submit = async (data: Step2Values) => {
    if (!step1Data || isLoading) return;
    setIsLoading(true);
    setApiError(null);
    try {
      const payload = buildDoctorPayload(step1Data, data);
      const certificates = data.certificates as FileList;
      await registerDoctor(payload, certificates, t);
      setSubmitted(true);
    } catch (err: unknown) {
      const doctorError = err as DoctorServiceError;
      if (doctorError && doctorError.code) {
        const message =
          t.register.errors[doctorError.code] ?? t.register.errors.unknown;
        setApiError(message);
      } else {
        setApiError(
          err instanceof Error ? err.message : t.register.errors.unknown,
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full space-y-6 p-1">
      {/* Step indicator */}
      <div className="w-full">
        <StepIndicator currentStep={step} />
      </div>

      {/* API error */}
      {apiError && (
        <div className="w-full animate-in fade-in slide-in-from-top-2 duration-200">
          <ApiErrorMessage error={apiError} />
        </div>
      )}
      {/* Step forms */}
      <div className="w-full">
        {step === 1 ? (
          <DoctorStep1
            defaultValues={step1Data ?? undefined}
            onNext={handleStep1Next}
          />
        ) : (
          <DoctorStep2
            defaultValues={step2Data ?? undefined}
            isLoading={isLoading}
            onBack={(data) => {
              if (data) setStep2Data(data);
              setStep(1);
            }}
            onSubmit={handleStep2Submit}
          />
        )}
      </div>
    </div>
  );
}

export default DoctorSignupContent;
