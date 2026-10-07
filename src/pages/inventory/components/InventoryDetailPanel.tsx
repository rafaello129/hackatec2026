import { Building2, MapPin, Package, Store, Tags } from "lucide-react";
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

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value);

export default function InventoryDetailPanel({
  item,
  movements,
}: {
  item: InventoryItem | null;
  movements: StockMovement[];
}) {
  if (!item) {
    return (
      <section className="rounded-[22px] border border-[#E3E7DF] bg-white p-5">
        <h3 className="text-[15px] font-semibold text-[#172019]">Detalle del producto</h3>
        <p className="mt-2 text-[11px] leading-5 text-[#7B867E]">Selecciona un producto para revisar su ficha.</p>
      </section>
    );
  }

  return (
    <section className="rounded-[22px] border border-[#E3E7DF] bg-white p-5">
      <div className="flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-[#EEF1EB] text-[#58715F]">
          <Package className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[15px] font-semibold text-[#172019]">{item.name}</h3>
          <p className="mt-1 text-[10px] text-[#7B867E]">{item.sku}</p>
        </div>
        <InventoryStatusBadge status={item.status} />
      </div>

      <p className="mt-4 line-clamp-3 text-[11px] leading-5 text-[#657068]">{item.description}</p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {[
          ["Stock", `${item.quantity} ${item.unit}`],
          ["Valor", formatCurrency(item.estimatedValue)],
          ["Pedidos", String(item.pendingOrders)],
          ["Liquidación", formatCurrency(item.payoutPending)],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[16px] border border-[#E5E9E2] bg-white p-3.5">
            <p className="text-[10px] text-[#7F8A82]">{label}</p>
            <p className="mt-1 text-[12px] font-semibold text-[#2D3931]">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-[18px] bg-[#F2F6EE] p-4">
        <p className="flex items-center gap-2 text-[10.5px] text-[#657068]"><Store className="h-3.5 w-3.5 text-[#287839]" />{item.businessName} · {item.ownerName}</p>
        <p className="mt-2 flex items-center gap-2 text-[10.5px] text-[#657068]"><Tags className="h-3.5 w-3.5 text-[#287839]" />{categoryLabels[item.category]} · {item.supplier}</p>
        <p className="mt-2 flex items-center gap-2 text-[10.5px] text-[#657068]"><MapPin className="h-3.5 w-3.5 text-[#287839]" />{item.location}</p>
        <p className="mt-2 flex items-center gap-2 text-[10.5px] text-[#657068]"><Building2 className="h-3.5 w-3.5 text-[#287839]" />{item.commissionEligible ? `${item.commissionRate}% comisión` : "Sin comisión"}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {item.tags.slice(0, 5).map((tag) => (
          <span key={tag} className="rounded-full border border-[#DDE5D8] bg-white px-2.5 py-1 text-[9.5px] font-medium text-[#526057]">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 rounded-[14px] bg-[#ECF5E8] px-3 py-2.5 text-[10px] leading-4 text-[#3F6948]">
        {item.status === "out_of_stock" || item.status === "low_stock"
          ? "Conviene priorizar la reposición antes de confirmar nuevos pedidos."
          : "Stock estable. Mantén seguimiento de rotación y pedidos pendientes."}
        {movements[0] ? <p className="mt-1 text-[#6E7B72]">Último movimiento: {movements[0].type} · {movements[0].date}</p> : null}
      </div>
    </section>
  );
}
