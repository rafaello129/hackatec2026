import { AlertTriangle } from "lucide-react";
import type { InventoryBusinessFilter } from "@/pages/inventory/hooks/useInventory";

interface InventoryBusinessOption {
  id: string;
  name: string;
  count: number;
  hasAttention: boolean;
}

const shortName = (name: string) =>
  name
    .replace("Milpa del Caribe", "Milpa del Caribe")
    .replace("EcoEmpaque Caribe", "BioPack")
    .replace("Herbolaria Nativa", "Nativa Beauty");

export default function InventoryBusinessTabs({
  businesses,
  activeBusinessId,
  onBusinessChange,
}: {
  businesses: InventoryBusinessOption[];
  activeBusinessId: InventoryBusinessFilter;
  onBusinessChange: (businessId: InventoryBusinessFilter) => void;
}) {
  return (
    <div className="max-w-full overflow-x-auto pb-1">
      <div className="flex min-w-max gap-2" aria-label="Filtrar productos por emprendimiento">
        {businesses.map((business) => {
          const active = activeBusinessId === business.id;
          return (
            <button
              key={business.id}
              type="button"
              onClick={() => onBusinessChange(business.id)}
              aria-pressed={active}
              className={
                active
                  ? "inline-flex h-8 items-center gap-2 rounded-full bg-[#135C2F] px-4 text-[11px] font-semibold text-white transition"
                  : "inline-flex h-8 items-center gap-2 rounded-full border border-[#DFE4DC] bg-white px-4 text-[11px] font-medium text-[#657068] transition hover:border-[#C7D3C5] hover:bg-[#F8FAF6] hover:text-[#2E4935]"
              }
            >
              <span>{shortName(business.name)}</span>
              <span className={active ? "rounded-full bg-white/15 px-1.5 py-0.5 text-[9px]" : "rounded-full bg-[#F1F4EE] px-1.5 py-0.5 text-[9px] text-[#7B867E]"}>
                {business.count}
              </span>
              {business.hasAttention ? (
                <AlertTriangle className={active ? "h-3 w-3 text-[#DFF19A]" : "h-3 w-3 text-[#B27B0A]"} />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
