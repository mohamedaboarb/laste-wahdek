"use client";

import { Download, CheckCircle2, Clock3, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
  invoice: string;
  date: string;
  amount: string;
  currency: string;
  status: "paid" | "pending" | "failed";
  onDownload?: () => void;
}

export function BillingRow({
  invoice,
  date,
  amount,
  currency,
  status,
  onDownload,
}: Props) {
  const badge = {
    paid: (
      <span className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
        <CheckCircle2 className="h-4 w-4" />
        Paid
      </span>
    ),

    pending: (
      <span className="flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
        <Clock3 className="h-4 w-4" />
        Pending
      </span>
    ),

    failed: (
      <span className="flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
        <XCircle className="h-4 w-4" />
        Failed
      </span>
    ),
  };

  return (
    <tr className="border-b last:border-none">
      <td className="py-5 font-medium">{invoice}</td>

      <td>{date}</td>

      <td>
        {currency} {amount}
      </td>

      <td>{badge[status]}</td>

      <td className="text-right">
        <Button size="icon" variant="ghost" onClick={onDownload}>
          <Download className="h-5 w-5" />
        </Button>
      </td>
    </tr>
  );
}
