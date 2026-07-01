"use client";

import { AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/contexts/locale-context";

interface Props {
  isOpen: boolean;
  targetPlanName: string;
  isLoading: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function UpgradeConfirmDialog({
  isOpen,
  targetPlanName,
  isLoading,
  onConfirm,
  onClose,
}: Props) {
  const { t } = useLocale();
  const sd = t.subscriptionDashboard.upgrade;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md rounded-3xl p-0 overflow-hidden">
        {/* Header */}
        <div className="bg-rose-50 border-b border-rose-100 px-7 pt-7 pb-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-100">
              <AlertTriangle className="h-5 w-5 text-rose-600" />
            </div>
            <DialogHeader className="space-y-0">
              <DialogTitle className="text-lg font-bold text-slate-900 leading-tight">
                {sd.dialogTitle}
              </DialogTitle>
            </DialogHeader>
          </div>
          <DialogDescription className="text-sm text-slate-600 leading-relaxed">
            {sd.dialogBody}
          </DialogDescription>
        </div>

        {/* Bullets */}
        <div className="px-7 py-5 space-y-3">
          {[sd.bullet1, sd.bullet2, sd.bullet3, sd.bullet4, sd.bullet5].map(
            (text, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-rose-50 text-center text-[11px] font-bold leading-5 text-rose-500">
                  {i + 1}
                </span>
                <p className="text-sm text-slate-600">{text}</p>
              </div>
            ),
          )}
        </div>

        {/* Actions — Keep Current Plan is primary */}
        <div className="flex flex-col gap-2 border-t border-slate-100 px-7 pb-7 pt-4">
          <Button
            onClick={onClose}
            className="h-11 w-full rounded-xl bg-[#d11765] text-white hover:bg-pink-700"
          >
            {sd.cancel}
          </Button>
          <Button
            variant="ghost"
            onClick={onConfirm}
            disabled={isLoading}
            className="h-11 w-full rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-700"
          >
            {isLoading ? "..." : `${sd.confirm} — ${targetPlanName}`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
