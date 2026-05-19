import { AlertTriangle, Store } from "lucide-react";
import type { InventoryBusinessFilter } from "@/pages/inventory/hooks/useInventory";

interface InventoryBusinessOption {
  id: string;
  name: string;
  count: number;
  hasAttention: boolean;
}

interface InventoryBusinessTabsProps {
  businesses: InventoryBusinessOption[];
  activeBusinessId: InventoryBusinessFilter;
  onBusinessChange: (businessId: InventoryBusinessFilter) => void;
}

const shortName = (name: string) =>
  name
    .replace("AgroNorte Distribution", "AgroNorte")
    .replace("BioPack Peninsula", "BioPack")
    .replace("Nativa Beauty Supply", "Nativa Beauty");

export default function InventoryBusinessTabs({
  businesses,
  activeBusinessId,
  onBusinessChange,
}: InventoryBusinessTabsProps) {
  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-3">
      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.06em] text-[#42493f]">
        <Store className="h-4 w-4 text-[#799833]" />
        Inventario por negocio
      </div>
      <div className="max-w-full overflow-x-auto pb-1">
        <div className="flex min-w-max gap-2">
          {businesses.map((business) => {
            const isActive = activeBusinessId === business.id;
            return (
              <button
                key={business.id}
                type="button"
                onClick={() => onBusinessChange(business.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "border-[#4F7302] bg-[#D6D979] text-[#3E5902]"
                    : "border-[#c2c9bc] bg-[#f9faf3] text-[#42493f] hover:bg-[#f3f4ed]"
                }`}
              >
                <span>{shortName(business.name)}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs ${isActive ? "bg-white/70" : "bg-white"}`}>
                  {business.count}
                </span>
                {business.hasAttention ? (
                  <AlertTriangle className={`h-3.5 w-3.5 ${isActive ? "text-[#3E5902]" : "text-[#7a5d00]"}`} />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
