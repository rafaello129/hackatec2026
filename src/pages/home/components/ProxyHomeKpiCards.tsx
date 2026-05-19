import { Building2, ClipboardList, CircleDollarSign, ReceiptText, WalletCards } from "lucide-react";
import type { ProxyHomeKpi } from "../hooks/useProxyHome";

const iconMap: Record<string, typeof Building2> = {
  active_businesses: Building2,
  pending_orders: ClipboardList,
  managed_sales: CircleDollarSign,
  pending_payouts: WalletCards,
  estimated_commission: ReceiptText,
};

const toneMap: Record<ProxyHomeKpi["tone"], string> = {
  success: "text-[#4F7302]",
  warning: "text-[#7a5d00]",
  neutral: "text-[#799833]",
};

interface ProxyHomeKpiCardsProps {
  kpis: ProxyHomeKpi[];
}

export default function ProxyHomeKpiCards({ kpis }: ProxyHomeKpiCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-5">
      {kpis.map((kpi) => {
        const Icon = iconMap[kpi.id] ?? Building2;
        return (
          <article key={kpi.id} className="rounded-lg border border-[#c2c9bc] bg-white p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#42493f]">{kpi.label}</p>
              <Icon className={`h-4 w-4 ${toneMap[kpi.tone]}`} />
            </div>
            <p className="mt-2 font-['Hanken_Grotesk'] text-3xl font-bold text-[#1a1c18]">{kpi.value}</p>
            <p className="mt-1 text-sm text-[#42493f]">{kpi.hint}</p>
          </article>
        );
      })}
    </div>
  );
}
