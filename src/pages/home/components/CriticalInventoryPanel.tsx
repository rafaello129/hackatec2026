import { Link } from "react-router-dom";
import { ArrowRight, Package } from "lucide-react";
import InventoryStatusBadge from "@/pages/inventory/components/InventoryStatusBadge";
import type { CriticalInventoryItem } from "../hooks/useProxyHome";

export default function CriticalInventoryPanel({ items }: { items: CriticalInventoryItem[] }) {
  return (
    <section className="rounded-[24px] border border-[#E2E6DF] bg-white p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-[#17231B]">Inventario crítico por emprendimiento</h2>
          <p className="mt-1 text-[11px] text-[#87918A]">Productos con riesgo de frenar pedidos o ventas.</p>
        </div>
        <Link to="/inventory" className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#287839]">
          Ver productos <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {items.map(({ item, alert, recommendation }) => (
          <article key={item.id} className="rounded-[18px] border border-transparent bg-[#FAFAF7] p-4 transition hover:border-[#E0E7DC] hover:bg-white">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#EDF4E8] text-[#2E7439]">
                <Package className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-semibold text-[#344039]">{item.name}</p>
                    <p className="mt-0.5 truncate text-[10px] text-[#87918A]">{item.businessName}</p>
                  </div>
                  <InventoryStatusBadge status={item.status} />
                </div>
                <p className="mt-3 text-[20px] font-semibold leading-none tracking-tight text-[#35523B]">
                  {item.quantity} <span className="text-[11px] font-medium text-[#7B867E]">{item.unit}</span>
                </p>
                <p className="mt-2 line-clamp-2 text-[10.5px] leading-4 text-[#7A857E]">{alert?.description ?? recommendation}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
