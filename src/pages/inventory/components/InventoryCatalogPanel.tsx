import { Boxes, ShoppingBag, Wrench } from "lucide-react";
import type { CatalogItem, InventoryItem } from "@/types/inventory.types";

const categoryLabels: Record<InventoryItem["category"], string> = {
  raw_material: "Materia prima",
  finished_product: "Producto terminado",
  service: "Servicio",
  packaging: "Empaque",
  equipment: "Equipo",
  digital: "Digital",
};

const availabilityMap: Record<CatalogItem["availabilityStatus"], { label: string; className: string }> = {
  available: { label: "Disponible", className: "bg-[#E6F3C8] text-[#42610A]" },
  limited: { label: "Limitado", className: "bg-[#FFF0D8] text-[#8C6213]" },
  on_demand: { label: "Bajo demanda", className: "bg-[#EEF2EA] text-[#607064]" },
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value);

export default function InventoryCatalogPanel({ catalogItems }: { catalogItems: CatalogItem[] }) {
  return (
    <section className="rounded-[22px] border border-[#E3E7DF] bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-semibold text-[#172019]">Catálogo comercial</h2>
          <p className="mt-1 text-[11px] text-[#7B867E]">Productos y servicios listos para comercializar.</p>
        </div>
        <span className="rounded-full bg-[#F1F4EE] px-2.5 py-1 text-[9px] font-semibold text-[#68736B]">{catalogItems.length} items</span>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {catalogItems.map((item) => {
          const availability = availabilityMap[item.availabilityStatus];
          return (
            <article key={item.id} className="rounded-[18px] border border-transparent bg-[#FAFAF7] p-4 transition hover:border-[#DDE6D8] hover:bg-white">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-white text-[#287839]">
                  {item.kind === "service" ? <Wrench className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-semibold text-[#2B352F]">{item.name}</p>
                  <p className="mt-0.5 truncate text-[9.5px] text-[#87918A]">{item.businessName}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold ${availability.className}`}>{availability.label}</span>
              </div>

              <p className="mt-4 text-[15px] font-semibold text-[#35523B]">
                {formatCurrency(item.estimatedPrice)}
                <span className="ml-1 text-[9px] font-normal text-[#87918A]">/ {item.unit}</span>
              </p>
              <p className="mt-1 text-[9.5px] text-[#87918A]">{categoryLabels[item.category]} · Comisión {item.commissionRate}%</p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.bulkPurchaseEligible ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[9px] font-medium text-[#607064]">
                    <Boxes className="h-3 w-3" />
                    Bulk {item.minimumBulkQuantity}
                  </span>
                ) : null}
                {item.payoutPending > 0 ? (
                  <span className="rounded-full bg-[#FFF0D8] px-2 py-1 text-[9px] font-semibold text-[#8C6213]">
                    Liquidación pendiente
                  </span>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
