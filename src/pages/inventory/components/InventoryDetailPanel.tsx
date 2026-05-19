import { Building2, CalendarClock, MapPin, Package, ReceiptText, Store, Tags } from "lucide-react";
import type { InventoryItem, StockMovement } from "@/types/inventory.types";
import InventoryStatusBadge from "./InventoryStatusBadge";

const categoryLabels: Record<InventoryItem["category"], string> = {
  raw_material: "Materia prima",
  finished_product: "Producto terminado",
  service: "Servicio",
  packaging: "Empaque",
  equipment: "Equipo",
  digital: "Digital",
};

const useCaseLabels: Record<InventoryItem["cooperativeUseCase"], string> = {
  compra_conjunta: "Compra conjunta",
  venta_conjunta: "Venta conjunta",
  campana_compartida: "Campana compartida",
  reparticion_bienes: "Reparticion de bienes",
  soporte_post_acuerdo: "Soporte post-acuerdo",
  no_aplica: "No aplica",
};

const marketplaceLabels: Record<InventoryItem["marketplaceStatus"], string> = {
  listed: "Publicado",
  not_listed: "No listado",
  paused: "Pausado",
  pending_review: "En revision",
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value);

interface InventoryDetailPanelProps {
  item: InventoryItem | null;
  movements: StockMovement[];
}

export default function InventoryDetailPanel({ item, movements }: InventoryDetailPanelProps) {
  if (!item) {
    return (
      <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
        <h3 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Detalle de inventario</h3>
        <p className="mt-2 text-sm text-[#42493f]">Selecciona un producto para revisar su ficha operativa.</p>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
      <div className="mb-4 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">{item.name}</h3>
          <p className="text-sm text-[#42493f]">{item.sku}</p>
        </div>
        <InventoryStatusBadge status={item.status} />
      </div>

      <p className="mb-3 line-clamp-2 text-sm text-[#1a1c18]">{item.description}</p>

      <dl className="grid gap-2 text-sm text-[#42493f] sm:grid-cols-2">
        <div className="flex items-center gap-2">
          <Store className="h-4 w-4 text-[#799833]" />
          <span className="truncate">
            {item.businessName} - {item.ownerName}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-[#799833]" />
          <span>
            {item.quantity} {item.unit} - Min {item.minStock} / Max {item.maxStock}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Tags className="h-4 w-4 text-[#799833]" />
          <span>{categoryLabels[item.category]}</span>
        </div>
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-[#799833]" />
          <span>{item.supplier}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-[#799833]" />
          <span>{item.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarClock className="h-4 w-4 text-[#799833]" />
          <span>{item.pendingOrders} pedidos pendientes</span>
        </div>
      </dl>

      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        <div className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#42493f]">Valor</p>
          <p className="font-semibold text-[#1a1c18]">{formatCurrency(item.estimatedValue)}</p>
        </div>
        <div className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#42493f]">Comision</p>
          <p className="font-semibold text-[#1a1c18]">
            {item.commissionEligible ? `${item.commissionRate}%` : "No aplica"}
          </p>
        </div>
        <div className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#42493f]">Liquidacion</p>
          <p className="font-semibold text-[#1a1c18]">{formatCurrency(item.payoutPending)}</p>
        </div>
      </div>

      <div className="mt-3 rounded-lg border border-[#e2e3dc] bg-white p-3">
        <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#42493f]">Marketplace</p>
        <p className="mt-1 text-sm text-[#1a1c18]">{marketplaceLabels[item.marketplaceStatus]}</p>
        <p className="text-sm text-[#42493f]">
          {item.listedInMarketplace ? "Disponible para venta digital" : "No publicado actualmente"} - Ultima venta:{" "}
          {item.lastOrderDate ?? "sin pedidos recientes"}
        </p>
      </div>

      <div className="mt-3">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.06em] text-[#42493f]">Tags</p>
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-[#D6D979] px-2.5 py-1 text-xs font-semibold text-[#3E5902]">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-3 rounded-lg border border-[#e2e3dc] bg-white p-3">
        <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#42493f]">Preparacion cooperativa</p>
        <p className="mt-1 text-sm text-[#1a1c18]">Caso: {useCaseLabels[item.cooperativeUseCase]}</p>
        <p className="text-sm text-[#42493f]">
          {item.availableForCooperative ? "Apto para alianzas o venta conjunta" : "Uso interno del negocio"} - Proveedor:{" "}
          {item.preferredSupplier}
        </p>
        <p className="text-sm text-[#42493f]">
          Bulk: {item.bulkPurchaseEligible ? `Si (min ${item.minimumBulkQuantity} ${item.unit})` : "No"}
        </p>
      </div>

      <div className="mt-3 rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
        <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#42493f]">Recomendacion</p>
        <p className="text-sm text-[#1a1c18]">
          {item.status === "out_of_stock" || item.status === "low_stock"
            ? "Prioriza reposicion, confirma pedidos pendientes y revisa si conviene compra consolidada."
            : "Mantener publicado y revisar rotacion semanal por negocio representado."}
        </p>
      </div>

      <div className="mt-3">
        <p className="mb-1 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.06em] text-[#42493f]">
          <ReceiptText className="h-3.5 w-3.5" />
          Ultimos movimientos
        </p>
        <ul className="space-y-1.5">
          {movements.slice(0, 3).map((movement) => (
            <li key={movement.id} className="rounded-md border border-[#e2e3dc] bg-[#f9faf3] px-2.5 py-2 text-xs text-[#42493f]">
              {movement.date} - {movement.type} - {movement.quantity} ({movement.reason})
            </li>
          ))}
          {movements.length === 0 ? (
            <li className="rounded-md border border-[#e2e3dc] bg-[#f9faf3] px-2.5 py-2 text-xs text-[#42493f]">
              Sin movimientos recientes para este item.
            </li>
          ) : null}
        </ul>
      </div>
    </section>
  );
}
