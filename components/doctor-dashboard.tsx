"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/contexts/locale-context";
import { useAuth } from "@/contexts/auth-context";
import { fetchAssignedFamilies, type AssignedFamily } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Users,
  Baby,
  FileText,
  Loader2,
  AlertCircle,
  Heart,
  Shield,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export function DoctorDashboard() {
  const { t, dir, locale } = useLocale();
  const { user, isAuthenticated, login } = useAuth();
  const [families, setFamilies] = useState<AssignedFamily[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFamily, setSelectedFamily] = useState<AssignedFamily | null>(
    null,
  );
  const [expandedFamilies, setExpandedFamilies] = useState<string[]>([]);

  useEffect(() => {
    // Auto-login as mock doctor for demo purposes
    if (!isAuthenticated) {
      login({
        id: "doc-1",
        name: "Dr. Sarah Ahmed",
        email: "sarah@clinic.com",
        role: "doctor",
      });
    }

    async function loadData() {
      const data = await fetchAssignedFamilies("doc-1");
      setFamilies(data);
      setLoading(false);
    }

    loadData();
  }, [isAuthenticated, login]);

  const toggleFamily = (id: string) => {
    setExpandedFamilies((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-56px)] items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ms-3 text-muted-foreground">{t.common.loading}</span>
      </div>
    );
  }

  return (
    <div dir={dir} className="min-h-[calc(100vh-56px)] bg-background px-4 py-8">
      <div className="mx-auto max-w-5xl">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-primary md:text-3xl">
            {t.doctorDashboard.welcome} {user?.name}
          </h1>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex items-center gap-4 rounded-2xl border border-border bg-card p-6"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
            <Users className="h-7 w-7 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              {t.doctorDashboard.assignedFamilies}
            </p>
            <p className="text-3xl font-bold text-foreground">
              {families.length}{" "}
              <span className="text-base font-normal text-muted-foreground">
                {t.doctorDashboard.familiesCount}
              </span>
            </p>
          </div>
        </motion.div>

        {/* Families List */}
        {families.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-12 text-center">
            <AlertCircle className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
            <p className="text-muted-foreground">
              {t.doctorDashboard.noFamilies}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {families.map((family, i) => (
              <motion.div
                key={family.mother.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.1 }}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                {/* Family Header */}
                <button
                  onClick={() => toggleFamily(family.mother.id)}
                  className="flex w-full items-center gap-4 p-5 text-start transition-colors hover:bg-muted/50"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/10">
                    <Heart className="h-6 w-6 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">
                      {family.mother.fullName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {family.mother.email} | {family.mother.phone}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="secondary"
                      className="bg-muted text-muted-foreground"
                    >
                      <Baby className="me-1 h-3 w-3" />
                      {family.children.length}
                    </Badge>
                    {expandedFamilies.includes(family.mother.id) ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </button>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedFamilies.includes(family.mother.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border p-5">
                        {/* Mother Info */}
                        <div className="mb-4 rounded-xl bg-muted p-4">
                          <div className="mb-2 flex items-center gap-2">
                            <Shield className="h-4 w-4 text-primary" />
                            <span className="text-sm font-semibold text-foreground">
                              {t.doctorDashboard.motherInfo}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">
                                {locale === "ar" ? "العمر: " : "Age: "}
                              </span>
                              <span className="text-foreground">
                                {family.mother.age}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                {locale === "ar" ? "الأمراض: " : "Conditions: "}
                              </span>
                              <span className="text-foreground">
                                {family.mother.chronicDiseases.length > 0
                                  ? family.mother.chronicDiseases.join(", ")
                                  : locale === "ar"
                                    ? "لا يوجد"
                                    : "None"}
                              </span>
                            </div>
                          </div>
                          {family.mother.generalHistory && (
                            <p className="mt-2 text-sm text-muted-foreground">
                              {family.mother.generalHistory}
                            </p>
                          )}
                        </div>

                        {/* Children */}
                        <h4 className="mb-3 text-sm font-semibold text-foreground">
                          {t.doctorDashboard.childrenOf}{" "}
                          {family.mother.fullName}
                        </h4>
                        <div className="grid gap-3 md:grid-cols-2">
                          {family.children.map((child) => (
                            <div
                              key={child.id}
                              className="rounded-xl border border-border bg-background p-4"
                            >
                              <div className="mb-2 flex items-center gap-2">
                                <Baby className="h-4 w-4 text-accent" />
                                <span className="font-medium text-foreground">
                                  {child.name}
                                </span>
                                <Badge
                                  variant="secondary"
                                  className="bg-accent/10 text-accent"
                                >
                                  {child.age} {t.common.years}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {child.diseaseHistory}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* View Full History */}
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4 gap-2 border-primary text-primary"
                          onClick={() => setSelectedFamily(family)}
                        >
                          <FileText className="h-4 w-4" />
                          {t.doctorDashboard.viewHistory}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Medical History Modal */}
      <Dialog
        open={!!selectedFamily}
        onOpenChange={() => setSelectedFamily(null)}
      >
        <DialogContent dir={dir} className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-foreground">
              <FileText className="h-5 w-5 text-primary" />
              {t.doctorDashboard.viewHistory} -{" "}
              {selectedFamily?.mother.fullName}
            </DialogTitle>
          </DialogHeader>
          {selectedFamily && (
            <div className="flex flex-col gap-4">
              <div className="rounded-lg bg-muted p-4">
                <h4 className="mb-2 text-sm font-semibold text-foreground">
                  {t.doctorDashboard.motherInfo}
                </h4>
                <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                  <p>
                    {locale === "ar"
                      ? "الأمراض المزمنة: "
                      : "Chronic Diseases: "}
                    {selectedFamily.mother.chronicDiseases.join(", ") ||
                      (locale === "ar" ? "لا يوجد" : "None")}
                  </p>
                  <p>
                    {locale === "ar" ? "التاريخ المرضي: " : "Medical History: "}
                    {selectedFamily.mother.generalHistory ||
                      (locale === "ar" ? "لا يوجد" : "None")}
                  </p>
                  <p>
                    {locale === "ar" ? "الحالة النفسية: " : "Mental Health: "}
                    {selectedFamily.mother.mentalHealth ||
                      (locale === "ar" ? "لا يوجد" : "None")}
                  </p>
                </div>
              </div>
              {selectedFamily.children.map((child) => (
                <div
                  key={child.id}
                  className="rounded-lg border border-border p-4"
                >
                  <div className="mb-1 flex items-center gap-2">
                    <Baby className="h-4 w-4 text-accent" />
                    <span className="font-medium text-foreground">
                      {child.name} ({child.age} {t.common.years})
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {child.diseaseHistory}
                  </p>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
