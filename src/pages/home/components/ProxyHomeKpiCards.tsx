import { Building2, ClipboardList, CircleDollarSign, ReceiptText, WalletCards } from "lucide-react";
import type { ProxyHomeKpi } from "../hooks/useProxyHome";

const iconMap: Record<string, typeof Building2> = {
  active_businesses: Building2,
  pending_orders: ClipboardList,
  managed_sales: CircleDollarSign,
  pending_payouts: WalletCards,
  estimated_commission: ReceiptText,
};

const order = [
  "managed_sales",
  "active_businesses",
  "pending_orders",
  "pending_payouts",
  "estimated_commission",
];

interface ProxyHomeKpiCardsProps {
  kpis: ProxyHomeKpi[];
}

export default function ProxyHomeKpiCards({ kpis }: ProxyHomeKpiCardsProps) {
  const ordered = order
    .map((id) => kpis.find((kpi) => kpi.id === id))
    .filter((kpi): kpi is ProxyHomeKpi => Boolean(kpi));

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {ordered.map((kpi, index) => {
        const Icon = iconMap[kpi.id] ?? Building2;
        const featured = index === 0;

        return (
          <article
            key={kpi.id}
            className={
              featured
                ? "peek-dark-surface group min-h-[142px] rounded-[24px] bg-[linear-gradient(135deg,#063A12_0%,#0D571E_58%,#9AC84B_140%)] p-5 text-white transition-transform duration-200 hover:-translate-y-0.5"
                : "group min-h-[142px] rounded-[24px] bg-[#FFF8F6] p-5 ring-1 ring-[#F0ECE8] transition duration-200 hover:-translate-y-0.5 hover:ring-[#DDE5D8]"
            }
          >
            <div className="flex items-start justify-between gap-3">
              <p className={featured ? "text-[15px] text-white" : "text-[15px] text-[#35523B]"}>{kpi.label}</p>
              <Icon className={featured ? "h-5 w-5 text-white" : "h-5 w-5 text-[#6E8A73]"} />
            </div>
            <p
              className={
                featured
                  ? "mt-3 text-[34px] font-medium leading-none tracking-[-0.04em] text-white"
                  : "mt-3 text-[34px] font-medium leading-none tracking-[-0.04em] text-[#35523B]"
              }
            >
              {kpi.value}
            </p>
            <p className={featured ? "mt-3 text-[11px] leading-4 text-white/75" : "mt-3 text-[11px] leading-4 text-[#758178]"}>
              {kpi.hint}
            </p>
          </article>
        );
      })}
    </section>
  );
}
