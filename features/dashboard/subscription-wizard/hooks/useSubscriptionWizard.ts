"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { usePackages } from "./usePackages";
import { resolveAutoPackageId } from "../types";
import type {
  WizardState,
  WizardSection,
  WizardMode,
  Package,
  WizardDoctor,
} from "../types";

// ─── sessionStorage persistence ───────────────────────────────────────────────
// Per architecture decision: wizard draft lives in sessionStorage.
// Lost on tab close — acceptable trade-off, no DB draft table needed.

const SESSION_KEY = "subscription_wizard_draft";

function loadDraft(): Partial<WizardState> {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Partial<WizardState>) : {};
  } catch {
    return {};
  }
}

function saveDraft(state: WizardState) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(state));
  } catch {
    // Storage quota exceeded — silently continue, not critical
  }
}

export function clearWizardDraft() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(SESSION_KEY);
  }
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

const INITIAL_STATE: WizardState = {
  mode: "package-first",
  selectedPackage: null,
  selectedPediatrician: null,
  selectedPsychologist: null,
  activeSection: "package",
};

export function useSubscriptionWizard() {
  const [state, setState] = useState<WizardState>(() => {
    const draft = loadDraft();
    return { ...INITIAL_STATE, ...draft };
  });

  const { data: packages } = usePackages();

  // Skip first render — no need to write the initial value back
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    saveDraft(state);
  }, [state]);

  // ─── Actions ────────────────────────────────────────────────────────────────

  const setMode = useCallback((mode: WizardMode) => {
    clearWizardDraft();
    setState({
      ...INITIAL_STATE,
      mode,
      activeSection: mode === "doctor-first" ? "pediatrician" : "package",
    });
  }, []);

  const selectPackage = useCallback((pkg: Package) => {
    setState((prev) => {
      // Cascade guard: when real package_eligibility data exists in Phase 2,
      // check if current doctors are still eligible for the new package and
      // clear them if not. For now (mock data, all doctors eligible for all
      // packages) we preserve existing doctor selections.
      return {
        ...prev,
        selectedPackage: pkg,
        activeSection: "pediatrician",
      };
    });
  }, []);

  const selectPediatrician = useCallback((doctor: WizardDoctor) => {
    setState((prev) => ({
      ...prev,
      selectedPediatrician: doctor,
      // In doctor-first, changing the pedi invalidates the auto-assigned
      // package and any previously chosen psychologist (re-selection needed
      // to re-run the degree matrix).
      selectedPackage:
        prev.mode === "doctor-first" ? null : prev.selectedPackage,
      selectedPsychologist:
        prev.mode === "doctor-first" ? null : prev.selectedPsychologist,
      activeSection: "psychologist",
    }));
  }, []);

  const selectPsychologist = useCallback(
    (doctor: WizardDoctor) => {
      setState((prev) => {
        let selectedPackage = prev.selectedPackage;

        // Doctor-first: auto-assign package tier from both doctors' degrees
        if (prev.mode === "doctor-first" && prev.selectedPediatrician && packages) {
          const pkgId = resolveAutoPackageId(
            prev.selectedPediatrician.scientificDegree,
            doctor.scientificDegree,
          );
          selectedPackage = packages.find((p) => p.id === pkgId) ?? null;
        }

        return {
          ...prev,
          selectedPsychologist: doctor,
          selectedPackage,
          activeSection: "review",
        };
      });
    },
    [packages],
  );

  // Used by "Change" links to re-open a completed section
  const goToSection = useCallback((section: WizardSection) => {
    setState((prev) => ({ ...prev, activeSection: section }));
  }, []);

  const reset = useCallback(() => {
    clearWizardDraft();
    setState(INITIAL_STATE);
  }, []);

  // ─── Derived values ──────────────────────────────────────────────────────────

  const completedSections = {
    package: state.selectedPackage !== null,
    pediatrician: state.selectedPediatrician !== null,
    psychologist: state.selectedPsychologist !== null,
  };

  const canProceedToPayment =
    state.selectedPackage !== null &&
    state.selectedPediatrician !== null &&
    state.selectedPsychologist !== null;

  return {
    state,
    completedSections,
    canProceedToPayment,
    setMode,
    selectPackage,
    selectPediatrician,
    selectPsychologist,
    goToSection,
    reset,
  };
}
