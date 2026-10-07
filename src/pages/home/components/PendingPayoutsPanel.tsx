import { Link } from "react-router-dom";
import { ArrowRight, WalletCards } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import type { PendingPayout } from "../hooks/useProxyHome";

export default function PendingPayoutsPanel({
  payouts,
  formatCurrency,
  formatDate,
}: {
  payouts: PendingPayout[];
  formatCurrency: (value: number) => string;
  formatDate: (dateISO: string) => string;
}) {
  return (
    <section className="rounded-[24px] border border-[#E2E6DF] bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-[#17231B]">Liquidaciones pendientes</h2>
          <p className="mt-1 text-[11px] text-[#87918A]">Montos por liberar a los integrantes de la comunidad.</p>
        </div>
        <Link to="/finance/summary" className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#287839]">
          Mi dinero <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-5 space-y-2.5">
        {payouts.map((payout) => (
          <article key={payout.businessId} className="flex items-center gap-3 rounded-[16px] bg-[#FAFAF7] px-3.5 py-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#EDF4E8] text-[#2E7439]">
              <WalletCards className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-[#344039]">{payout.businessName}</p>
              <p className="mt-0.5 text-[10px] text-[#87918A]">
                Comisión {payout.commissionRate}% · pago {formatDate(payout.estimatedDate)}
              </p>
              <p className="mt-1 text-[15px] font-semibold text-[#35523B]">{formatCurrency(payout.amount)}</p>
            </div>
            <StatusBadge label={payout.status} tone={payout.status === "pendiente" ? "warning" : "neutral"} />
          </article>
        ))}
      </div>
    </section>
  );
}
