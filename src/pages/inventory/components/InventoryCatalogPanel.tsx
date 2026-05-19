import { Boxes, Handshake, ShoppingBag, Wrench } from "lucide-react";
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
  available: { label: "Disponible", className: "bg-[#D6D979] text-[#3E5902]" },
  limited: { label: "Limitado", className: "bg-[#fff2cc] text-[#7a5d00]" },
  on_demand: { label: "Bajo demanda", className: "bg-[#e8e9e2] text-[#42493f]" },
};

const useCaseLabels: Record<CatalogItem["cooperativeUseCase"], string> = {
  compra_conjunta: "Compra conjunta",
  venta_conjunta: "Venta conjunta",
  campana_compartida: "Campana compartida",
  reparticion_bienes: "Reparticion",
  soporte_post_acuerdo: "Post-acuerdo",
  no_aplica: "No aplica",
};

const marketplaceMap: Record<CatalogItem["marketplaceStatus"], string> = {
  listed: "Marketplace",
  not_listed: "No listado",
  paused: "Pausado",
  pending_review: "Revision",
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value);

interface InventoryCatalogPanelProps {
  catalogItems: CatalogItem[];
}

export default function InventoryCatalogPanel({ catalogItems }: InventoryCatalogPanelProps) {
  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Catalogo comercial</h3>
        <span className="rounded-full bg-[#e8e9e2] px-2.5 py-1 text-xs font-semibold text-[#42493f]">{catalogItems.length} items</span>
      </div>

      <div className="grid max-h-[520px] gap-2 overflow-y-auto pr-1 md:grid-cols-2 xl:grid-cols-3">
        {catalogItems.map((item) => {
          const availability = availabilityMap[item.availabilityStatus];
          return (
            <article key={item.id} className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
              <div className="mb-2 flex items-start justify-between gap-2">
                <div className="flex min-w-0 items-start gap-2">
                  <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white text-[#4F7302]">
                    {item.kind === "service" ? <Wrench className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#1a1c18]">{item.name}</p>
                    <p className="truncate text-xs text-[#42493f]">{item.businessName}</p>
                  </div>
                </div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${availability.className}`}>
                  {availability.label}
                </span>
              </div>
              <p className="text-sm font-semibold text-[#1a1c18]">
                {formatCurrency(item.estimatedPrice)} <span className="text-xs font-normal text-[#42493f]">/ {item.unit}</span>
              </p>
              <p className="text-xs text-[#42493f]">
                {categoryLabels[item.category]} - Comision {item.commissionRate}% - {marketplaceMap[item.marketplaceStatus]}
              </p>

              <div className="mt-2 flex flex-wrap gap-1.5">
                {item.availableForCooperative ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#D6D979] px-2 py-0.5 text-xs font-semibold text-[#3E5902]">
                    <Handshake className="h-3.5 w-3.5" />
                    Cooperativo
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#e8e9e2] px-2 py-0.5 text-xs font-semibold text-[#42493f]">
                    <Boxes className="h-3.5 w-3.5" />
                    Interno
                  </span>
                )}
                <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-[#42493f]">
                  {useCaseLabels[item.cooperativeUseCase]}
                </span>
                {item.bulkPurchaseEligible ? (
                  <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-[#42493f]">
                    Bulk {item.minimumBulkQuantity}
                  </span>
                ) : null}
                {item.payoutPending > 0 ? (
                  <span className="rounded-full bg-[#fff2cc] px-2 py-0.5 text-xs font-semibold text-[#7a5d00]">
                    Liquidacion pendiente
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
