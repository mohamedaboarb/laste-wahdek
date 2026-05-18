"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { buildDoctorPayload, Step1Values, Step2Values } from "./Doctor.schema";
import { StepIndicator } from "./Stepindicator";
import { DoctorStep1 } from "./Doctorstep1";
import { DoctorStep2 } from "./Doctorstep2";
import { registerDoctor } from "./Doctor.service";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function DoctorSignupContent() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [step1Data, setStep1Data] = useState<Step1Values | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleStep1Next = (data: Step1Values) => {
    setStep1Data(data);
    setApiError(null);
    setStep(2);
    document
      .getElementById("auth-scroll-panel")
      ?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStep2Submit = async (data: Step2Values) => {
    if (!step1Data) return;
    setIsLoading(true);
    setApiError(null);
    try {
      const payload = buildDoctorPayload(step1Data, data);
      const certificates = data.certificates as FileList;
      await registerDoctor(payload, certificates);
      setSubmitted(true);
      // router.push("/signup/pending");
    } catch (err: unknown) {
      setApiError(
        err instanceof Error ? err.message : "حدث خطأ غير متوقع. حاول مجدداً.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ── Success screen ────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="flex flex-1 items-center justify-center p-6">
        <Card className="w-full max-w-sm p-8 text-center shadow-none border-0">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10">
            <svg
              viewBox="0 0 24 24"
              className="size-8 fill-none stroke-primary stroke-2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h2 className="mb-2 text-xl font-bold">تم إرسال طلبك بنجاح</h2>
          <p className="text-sm text-muted-foreground">
            سيتم مراجعة بياناتك من قبل الإدارة وإخطارك عبر البريد الإلكتروني
            خلال 48 ساعة.
          </p>
          {/* create a button that redirects to the home page */}
          <Button onClick={() => router.push("/")} className="mt-4">
            العودة إلى الصفحة الرئيسية
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-6 md:p-8">
      {/* Step indicator */}
      <div className="mb-6">
        <StepIndicator currentStep={step} />
      </div>

      {/* API error */}
      {apiError && (
        <div
          role="alert"
          className="mb-4 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {apiError}
        </div>
      )}

      {/* Step forms */}
      {step === 1 ? (
        <DoctorStep1
          defaultValues={step1Data ?? undefined}
          onNext={handleStep1Next}
        />
      ) : (
        <DoctorStep2
          isLoading={isLoading}
          onBack={() => setStep(1)}
          onSubmit={handleStep2Submit}
        />
      )}
    </div>
  );
}

export default DoctorSignupContent;
