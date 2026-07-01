import {
  ShieldCheck,
  RefreshCcw,
  BadgeCheck,
  CircleDollarSign,
} from "lucide-react";
import { useLocale } from "@/contexts/locale-context";

export function TrustStrip() {
  const { t } = useLocale();
  const sw = t.subscriptionWizard.trustStrip;

  const ITEMS = [
    { icon: ShieldCheck, label: sw.secure },
    { icon: RefreshCcw, label: sw.cancel },
    { icon: CircleDollarSign, label: sw.noHidden },
  ] as const;

  return (
    <div className="flex flex-wrap gap-2 items-center justify-evenly rounded-xl border border-emerald-100 px-2 py-3.5 ">
      {ITEMS.map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-2 text-primary">
          <div className="flex items-center justify-center gap-2">
            <Icon className="h-3.5 w-3.5 shrink-0" />
          </div>
          <span className="text-xs font-bold tracking-wide text-muted-foreground">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
