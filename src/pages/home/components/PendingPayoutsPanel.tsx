import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import StatusBadge from "@/components/common/StatusBadge";
import type { PendingPayout } from "../hooks/useProxyHome";

interface PendingPayoutsPanelProps {
  payouts: PendingPayout[];
  formatCurrency: (value: number) => string;
  formatDate: (dateISO: string) => string;
}

export default function PendingPayoutsPanel({ payouts, formatCurrency, formatDate }: PendingPayoutsPanelProps) {
  return (
    <SectionCard
      title="Liquidaciones pendientes"
      actions={
        <Link to="/finance/summary" className="inline-flex items-center gap-1 text-sm font-semibold text-[#4F7302] hover:text-[#3E5902]">
          Finanzas
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      }
    >
      <div className="space-y-2">
        {payouts.map((payout) => (
          <article key={payout.businessId} className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#1a1c18]">{payout.businessName}</p>
                <p className="text-xs text-[#42493f]">Comision {payout.commissionRate}% - pago {formatDate(payout.estimatedDate)}</p>
              </div>
              <StatusBadge label={payout.status} tone={payout.status === "pendiente" ? "warning" : "neutral"} />
            </div>
            <p className="mt-2 font-['Hanken_Grotesk'] text-xl font-bold text-[#1a1c18]">{formatCurrency(payout.amount)}</p>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}
