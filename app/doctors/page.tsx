"use client";

import DoctorsPage from "@/components/DoctorsPage";
import LoadingState from "@/components/ui/LoadingState";
import { Suspense } from "react";

export default function Doctors() {
  return;
  <Suspense fallback={<LoadingState message="Loading doctors..." />}>
    <DoctorsPage />
  </Suspense>;
}
