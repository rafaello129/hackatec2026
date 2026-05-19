import { AlertTriangle, Boxes, CircleDollarSign, RefreshCcw, Store } from "lucide-react";
import type { InventoryKpi } from "@/types/inventory.types";

const iconMap: Record<InventoryKpi["id"], typeof Boxes> = {
  total_sku: Boxes,
  low_stock: AlertTriangle,
  estimated_value: CircleDollarSign,
  recent_movements: RefreshCcw,
  marketplace_listed: Store,
  pending_payouts: CircleDollarSign,
};

interface InventoryKpiCardsProps {
  kpis: InventoryKpi[];
}

export default function InventoryKpiCards({ kpis }: InventoryKpiCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => {
        const Icon = iconMap[kpi.id];
        return (
          <article key={kpi.id} className="rounded-lg border border-[#c2c9bc] bg-white p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#42493f]">{kpi.label}</p>
              <Icon className={`h-4 w-4 ${kpi.id === "low_stock" ? "text-[#ba1a1a]" : "text-[#799833]"}`} />
            </div>
            <p className="mt-2 font-['Hanken_Grotesk'] text-3xl font-bold text-[#1a1c18]">{kpi.formattedValue}</p>
            <p className="mt-1 text-sm text-[#42493f]">{kpi.hint}</p>
          </article>
        );
      })}
    </div>
  );
}
