import { ClipboardList, PackageCheck, Truck, CheckCircle2 } from "lucide-react";
import type { OrderKpi } from "@/types/order.types";

const icons: Record<OrderKpi["id"], typeof ClipboardList> = {
  new_orders: ClipboardList,
  preparing: PackageCheck,
  ready_for_delivery: Truck,
  delivered_today: CheckCircle2,
};

export default function OrdersKpiCards({ kpis }: { kpis: OrderKpi[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => {
        const Icon = icons[kpi.id];
        return (
          <article key={kpi.id} className="min-h-[116px] rounded-lg border border-[#c2c9bc] bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#42493f]">{kpi.label}</span>
              <span className="grid h-8 w-8 place-items-center rounded-md bg-[#f3f4ed] text-[#4F7302]">
                <Icon className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-3 font-['Hanken_Grotesk'] text-3xl font-bold leading-none text-[#1a1c18]">{kpi.formattedValue}</p>
            <p className="mt-2 line-clamp-1 text-sm text-[#42493f]">{kpi.hint}</p>
          </article>
        );
      })}
    </div>
  );
}
