import { ChevronRight, Package } from "lucide-react";
import type { InventoryItem } from "@/types/inventory.types";
import InventoryStatusBadge from "./InventoryStatusBadge";

const categoryLabels: Record<InventoryItem["category"], string> = {
  raw_material: "Materia prima",
  finished_product: "Producto terminado",
  service: "Servicio",
  packaging: "Empaque",
  equipment: "Equipo",
  digital: "Digital",
};

const marketplaceLabels: Record<InventoryItem["marketplaceStatus"], { label: string; className: string }> = {
  listed: { label: "Publicado", className: "bg-[#E6F3C8] text-[#42610A]" },
  not_listed: { label: "No listado", className: "bg-[#EEF2EA] text-[#607064]" },
  paused: { label: "Pausado", className: "bg-[#FFF0D8] text-[#8C6213]" },
  pending_review: { label: "Revisión", className: "bg-[#FFF0D8] text-[#8C6213]" },
};

export default function InventoryTable({
  items,
  selectedItemId,
  onSelectItem,
}: {
  items: InventoryItem[];
  selectedItemId: string | null;
  onSelectItem: (itemId: string) => void;
}) {
  if (items.length === 0) {
    return (
      <div className="rounded-[18px] border border-dashed border-[#DDE4D9] bg-[#F8FAF6] px-5 py-10 text-center">
        <p className="text-sm font-semibold text-[#344039]">No encontramos productos con estos filtros.</p>
        <p className="mt-1 text-[11px] text-[#7E8981]">Prueba con otro nombre, emprendimiento, categoría o estado.</p>
      </div>
    );
  }

  return (
    <>
      <div className="hidden overflow-hidden rounded-[18px] border border-[#E1E6DE] bg-white md:block">
        <table className="w-full table-fixed text-left">
          <thead className="bg-[linear-gradient(90deg,#F4F8F1_0%,#FAFBF8_100%)]">
            <tr className="text-[10px] font-semibold uppercase tracking-[0.055em] text-[#718078]">
              <th className="w-[38%] px-4 py-3.5">Producto</th>
              <th className="w-[22%] px-3 py-3.5">Emprendimiento</th>
              <th className="w-[16%] px-3 py-3.5">Disponibles</th>
              <th className="w-[14%] px-3 py-3.5">Estado</th>
              <th className="w-[10%] px-4 py-3.5" />
            </tr>
          </thead>

          <tbody>
            {items.map((item) => {
              const marketplace = marketplaceLabels[item.marketplaceStatus];
              const selected = item.id === selectedItemId;

              return (
                <tr
                  key={item.id}
                  tabIndex={0}
                  role="button"
                  onClick={() => onSelectItem(item.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onSelectItem(item.id);
                    }
                  }}
                  className={`group cursor-pointer border-t border-[#EEF0EB] outline-none transition-colors focus-visible:bg-[#F4F8F1] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#9AC84B]/45 ${selected ? "bg-[#F4F8F1]" : "bg-white hover:bg-[#FAFCF8]"}`}
                >
                  <td className="px-4 py-3.5">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[14px] bg-[#EEF1EB] text-[#58715F] transition-transform group-hover:scale-[1.04]">
                        <Package className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-[12px] font-semibold text-[#263129]">{item.name}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-[10px] text-[#849087]">{categoryLabels[item.category]}</span>
                          <span className="h-1.5 w-1.5 rounded-full bg-[#AAB5AD]" />
                          <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${marketplace.className}`}>
                            {marketplace.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-3.5">
                    <p className="truncate text-[11px] font-semibold text-[#344039]">{item.businessName}</p>
                    <p className="mt-0.5 truncate text-[9.5px] text-[#87918A]">{item.ownerName}</p>
                  </td>

                  <td className="px-3 py-3.5">
                    <p className={item.status === "out_of_stock" ? "text-[12px] font-bold text-[#B84D44]" : item.status === "low_stock" ? "text-[12px] font-bold text-[#9A6A04]" : "text-[12px] font-bold text-[#2B352F]"}>
                      {item.quantity} {item.unit}
                    </p>
                    <p className="mt-0.5 text-[9px] text-[#87918A]">{item.pendingOrders} pedidos pendientes</p>
                  </td>

                  <td className="px-3 py-3.5">
                    <InventoryStatusBadge status={item.status} />
                  </td>

                  <td className="px-4 py-3.5 text-right">
                    <span className="ml-auto grid h-8 w-8 place-items-center rounded-full text-[#929C95] transition-all group-hover:bg-[#E6F1E4] group-hover:text-[#135C2F]">
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="space-y-2.5 md:hidden">
        {items.map((item) => {
          const marketplace = marketplaceLabels[item.marketplaceStatus];
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectItem(item.id)}
              className={`w-full rounded-[18px] border bg-white p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-sm ${item.id === selectedItemId ? "border-[#9AB48F] ring-2 ring-[#9AC84B]/10" : "border-[#E4E8E1] hover:border-[#CFD8CC]"}`}
            >
              <div className="flex items-start gap-3">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[15px] bg-[#EEF1EB] text-[#58715F]">
                  <Package className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-[12px] font-semibold text-[#263129]">{item.name}</p>
                  <p className="mt-1 text-[10px] text-[#849087]">{item.businessName}</p>
                  <span className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-[9px] font-semibold ${marketplace.className}`}>
                    {marketplace.label}
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-[#929C95]" />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-[linear-gradient(135deg,#F7F9F4_0%,#F3F7EF_100%)] p-3">
                <div>
                  <p className="text-[9px] uppercase tracking-wide text-[#889289]">Stock</p>
                  <p className="mt-1 text-[10px] font-semibold text-[#344039]">{item.quantity}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-wide text-[#889289]">Pedidos</p>
                  <p className="mt-1 text-[10px] font-semibold text-[#344039]">{item.pendingOrders}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-wide text-[#889289]">Comisión</p>
                  <p className="mt-1 text-[10px] font-semibold text-[#344039]">{item.commissionRate}%</p>
                </div>
              </div>

              <span className="mt-3 inline-flex">
                <InventoryStatusBadge status={item.status} />
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}
