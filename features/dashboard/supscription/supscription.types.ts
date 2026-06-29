import { LucideIcon } from "lucide-react";

export interface CurrentPlanCardProps {
  planName: string;
  price: number;
  currency: string;

  status: "active" | "expired" | "cancelled";

  startDate: string;
  renewalDate: string;

  sessionsUsed: number;
  sessionsLimit: number;

  onManage?: () => void;
  onUpgrade?: () => void;
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
