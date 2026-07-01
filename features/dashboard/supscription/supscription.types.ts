import { LucideIcon } from "lucide-react";

export interface CurrentPlanCardProps {
  subscriptionId: string;
  planName: string;
  price: number;
  currency: string;

  status: "pending_payment" | "active" | "expired" | "cancelled";
  cancelAtPeriodEnd: boolean;

  startDate: string;
  renewalDate: string;

  sessionsUsed: number;
  sessionsLimit: number;

  onCancelRequest: () => void;
}
export interface StatisticCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
}
export interface AppopintmentCardProps {
  hasAppointment: boolean;

  doctor?: string;

  specialization?: string;

  date?: string;

  time?: string;

  onView?: () => void;

  onBook?: () => void;
}
export interface PlanCardProps {
  name: string;

  description: string;

  price: string;

  currency: string;

  features: string[];

  featured?: boolean;

  current?: boolean;

  cta: string;

  onSelect?: () => void;
}
export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  currency: string;
  featured?: boolean;
  cta: string;
  features: string[];
}
