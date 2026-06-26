"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocale } from "@/contexts/locale-context";
import { useAuth } from "@/contexts/auth-context";
import {
  fetchMotherProfile,
  fetchDoctorById,
  type Mother,
  mockDoctors,
  mockMother,
  fetchAssignedDoctors,
} from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Phone,
  Stethoscope,
  Brain,
  Baby,
  AlertCircle,
  Loader2,
  CreditCard,
  Heart,
  Shield,
} from "lucide-react";
import { useRouter } from "next/navigation";

export function MomDashboard() {
  const { t, dir, locale } = useLocale();
  const { user, isAuthenticated, login } = useAuth();
  const router = useRouter();
  const [mother, setMother] = useState<Mother | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessionsRemaining, setSessionsRemaining] = useState(2);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const assignedDoctors = fetchAssignedDoctors(mockMother.assignedDoctors);
  useEffect(() => {
    // Auto-login as mock mother for demo purposes
    if (!isAuthenticated) {
      login({
        id: "mom-1",
        name: "Fatma Ali",
        email: "fatma@email.com",
        role: "mother",
      });
    }

    async function loadData() {
      const motherData = await fetchMotherProfile();
      setMother(motherData);
      setSessionsRemaining(motherData.sessionsRemaining);

      const doctorPromises = motherData.assignedDoctors.map((id) =>
        fetchDoctorById(id),
      );
      const doctorResults = await Promise.all(doctorPromises);
      // setDoctors(doctorResults.filter(Boolean) as Doctor[]);
      setLoading(false);
    }

    loadData();
  }, [isAuthenticated, login]);

  const handleUseSession = () => {
    if (sessionsRemaining > 0) {
      setSessionsRemaining((prev) => prev - 1);
    } else {
      setShowUpgradeModal(true);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ms-3 text-muted-foreground">{t.common.loading}</span>
      </div>
    );
  }

  if (!mother) return null;

  return (
    <div dir={dir} className="min-h-[calc(100vh-64px)] bg-background px-4 py-8">
      <div className="mx-auto max-w-7xl">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-primary md:text-3xl">
            {t.momDashboard.welcome}
            {", "}
            {user?.name || mother.fullName}
          </h1>
        </motion.div>

        {/* Top Stats Row */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {/* Sessions Counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
              <Heart className="h-7 w-7 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {t.momDashboard.sessionsRemaining}
              </p>
              <p className="text-3xl font-bold text-foreground">
                {sessionsRemaining}
                <span className="text-base font-normal text-muted-foreground">
                  {" "}
                  {t.momDashboard.sessionsOf} {mother.maxSessions}
                </span>
              </p>
            </div>
          </motion.div>

          {/* My Doctors Count */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10">
              <Stethoscope className="h-7 w-7 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {t.momDashboard.myDoctors}
              </p>
              <p className="text-3xl font-bold text-foreground">2</p>
            </div>
          </motion.div>

          {/* Emergency Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={() => setShowEmergencyModal(true)}
              className="flex h-full w-full items-center gap-4 rounded-2xl border-2 border-destructive/30 bg-destructive/5 p-6 text-start transition-all hover:border-destructive hover:bg-destructive/10"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-destructive/10">
                <Phone className="h-7 w-7 text-destructive" />
              </div>
              <div>
                <p className="text-lg font-bold text-destructive">
                  {t.momDashboard.emergencyButton}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t.momDashboard.emergencyDesc}
                </p>
              </div>
            </button>
          </motion.div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* My Doctors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="mb-4 text-xl font-bold text-foreground">
              {t.momDashboard.myDoctors}
            </h2>
            {mockDoctors.length === 0 ? (
              <div className="rounded-2xl border border-border bg-card p-8 text-center">
                <AlertCircle className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
                <p className="text-muted-foreground">
                  {t.momDashboard.noDoctors}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {assignedDoctors.map((doc) => {
                  if (!doc) return null;
                  return (
                    <div
                      key={doc.id}
                      className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5"
                    >
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                          doc.specialization === "pediatrician"
                            ? "bg-primary/10 text-primary"
                            : "bg-secondary/10 text-secondary"
                        }`}
                      >
                        {doc.specialization === "pediatrician" ? (
                          <Stethoscope className="h-6 w-6" />
                        ) : (
                          <Brain className="h-6 w-6" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">
                          {locale === "ar" ? doc.fullNameAr : doc.fullName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {locale === "ar" ? doc.bioAr : doc.bio}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        onClick={handleUseSession}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        {locale === "ar" ? "جلسة" : "Session"}
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>

          {/* My Children */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="mb-4 text-xl font-bold text-foreground">
              {t.momDashboard.myChildren}
            </h2>
            <div className="flex flex-col gap-4">
              {mother.children.map((child) => (
                <div
                  key={child.id}
                  className="rounded-2xl border border-border bg-card p-5"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                      <Baby className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {child.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {child.age} {t.common.years}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-xs font-medium text-muted-foreground">
                      {t.momDashboard.medicalHistory}
                    </p>
                    <p className="mt-1 text-sm text-foreground">
                      {child.diseaseHistory}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mother Health Info */}
            {/* <div className="mt-6 rounded-2xl border border-border bg-card p-5">
              <div className="mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">
                  {t.momDashboard.medicalHistory}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {mother.chronicDiseases.map((disease) => (
                  <Badge
                    key={disease}
                    variant="secondary"
                    className="bg-muted text-muted-foreground"
                  >
                    {disease}
                  </Badge>
                ))}
              </div>
              {mother.generalHistory && (
                <p className="mt-3 text-sm text-muted-foreground">
                  {mother.generalHistory}
                </p>
              )}
            </div> */}
          </motion.div>
        </div>
      </div>

      {/* Upgrade Modal */}
      <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
        <DialogContent dir={dir}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-foreground">
              <CreditCard className="h-5 w-5 text-primary" />
              {t.momDashboard.upgradeTitle}
            </DialogTitle>
            <DialogDescription>{t.momDashboard.upgradeDesc}</DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => setShowUpgradeModal(false)}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {t.momDashboard.upgrade}
          </Button>
        </DialogContent>
      </Dialog>

      {/* Emergency Modal */}
      <Dialog open={showEmergencyModal} onOpenChange={setShowEmergencyModal}>
        <DialogContent dir={dir}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <Phone className="h-5 w-5" />
              {t.momDashboard.emergencyTitle}
            </DialogTitle>
            <DialogDescription>
              {t.momDashboard.emergencyDesc}
            </DialogDescription>
          </DialogHeader>
          <a href="tel:+201000000000">
            <Button className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90">
              <Phone className="me-2 h-4 w-4" />
              {t.momDashboard.callNow}
            </Button>
          </a>
        </DialogContent>
      </Dialog>
    </div>
  );
}
