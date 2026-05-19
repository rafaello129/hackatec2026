import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import InventoryStatusBadge from "@/pages/inventory/components/InventoryStatusBadge";
import type { CriticalInventoryItem } from "../hooks/useProxyHome";

interface CriticalInventoryPanelProps {
  items: CriticalInventoryItem[];
}

export default function CriticalInventoryPanel({ items }: CriticalInventoryPanelProps) {
  return (
    <SectionCard
      title="Inventario critico por negocio"
      actions={
        <Link to="/inventory" className="inline-flex items-center gap-1 text-sm font-semibold text-[#4F7302] hover:text-[#3E5902]">
          Ver inventario
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      }
    >
      <div className="grid gap-2 md:grid-cols-2">
        {items.map(({ item, alert, recommendation }) => (
          <article key={item.id} className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
            <div className="mb-2 flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#1a1c18]">{item.name}</p>
                <p className="truncate text-xs text-[#42493f]">{item.businessName}</p>
              </div>
              <InventoryStatusBadge status={item.status} />
            </div>
            <p className="text-sm font-semibold text-[#1a1c18]">
              {item.quantity} {item.unit}
            </p>
            <p className="mt-1 line-clamp-2 text-xs text-[#42493f]">{alert?.description ?? recommendation}</p>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}
