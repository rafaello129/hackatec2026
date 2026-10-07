import { AlertTriangle, Boxes, CircleDollarSign, Store } from "lucide-react";
import type { InventoryKpi } from "@/types/inventory.types";

const iconMap: Record<string, typeof Boxes> = {
  total_sku: Boxes,
  low_stock: AlertTriangle,
  marketplace_listed: Store,
  estimated_value: CircleDollarSign,
};

const order = ["total_sku", "low_stock", "marketplace_listed", "estimated_value"] as const;

export default function InventoryKpiCards({ kpis }: { kpis: InventoryKpi[] }) {
  const ordered = order
    .map((id) => kpis.find((kpi) => kpi.id === id))
    .filter((kpi): kpi is InventoryKpi => Boolean(kpi));

  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {ordered.map((kpi, index) => {
        const Icon = iconMap[kpi.id] ?? Boxes;
        const primary = index === 0;

        const tone =
          kpi.id === "low_stock"
            ? "bg-[#FFF0D8] text-[#9A6A04]"
            : kpi.id === "marketplace_listed"
              ? "bg-[#EFF8DC] text-[#5A7B12]"
              : "bg-[#E6F1E4] text-[#135C2F]";

        return (
          <article
            key={kpi.id}
            className={
              primary
                ? "group min-h-[132px] rounded-[20px] border border-[#135C2F] bg-[linear-gradient(145deg,#135C2F_0%,#0B4825_100%)] px-5 py-4 text-white transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(19,92,47,0.12)]"
                : "group min-h-[132px] rounded-[20px] border border-[#E1E6DE] bg-white px-5 py-4 transition hover:-translate-y-0.5 hover:border-[#CBD8C6] hover:shadow-[0_14px_34px_rgba(23,35,27,0.06)]"
            }
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className={primary ? "text-[12px] font-semibold text-white" : "text-[12px] font-semibold text-[#35423A]"}>
                  {kpi.label}
                </p>
                <p className={primary ? "mt-2 text-[34px] font-bold leading-none tracking-[-0.04em] text-white" : "mt-2 text-[34px] font-bold leading-none tracking-[-0.04em] text-[#17231B]"}>
                  {kpi.formattedValue}
                </p>
              </div>
              <span className={primary ? "grid h-10 w-10 shrink-0 place-items-center rounded-[14px] bg-white/10 text-white" : `grid h-10 w-10 shrink-0 place-items-center rounded-[14px] ${tone}`}>
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
              </span>
            </div>
            <p className={primary ? "mt-4 text-[11px] leading-4 text-white/75" : "mt-4 text-[11px] leading-4 text-[#68736B]"}>
              {kpi.hint}
            </p>
          </article>
        );
      })}
    </section>
  );
}
