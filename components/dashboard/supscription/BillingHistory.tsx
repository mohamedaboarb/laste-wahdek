"use client";

import { BillingRow } from "./BillingRow";

interface Invoice {
  invoice: string;
  date: string;
  amount: string;
  currency: string;
  status: "paid" | "pending" | "failed";
}

interface Props {
  invoices: Invoice[];
}

export function BillingHistory({ invoices }: Props) {
  return (
    <section className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Billing History</h2>

        <p className="mt-2 text-slate-500">
          Previous invoices and subscription payments.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b text-left text-sm font-semibold text-slate-500">
              <th className="pb-4">Invoice</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((invoice) => (
              <BillingRow key={invoice.invoice} {...invoice} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
