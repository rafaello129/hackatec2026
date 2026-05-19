import { Eye } from "lucide-react";
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
  listed: { label: "Publicado", className: "bg-[#D6D979] text-[#3E5902]" },
  not_listed: { label: "No listado", className: "bg-[#e8e9e2] text-[#42493f]" },
  paused: { label: "Pausado", className: "bg-[#fff2cc] text-[#7a5d00]" },
  pending_review: { label: "Revision", className: "bg-[#fff2cc] text-[#7a5d00]" },
};

interface InventoryTableProps {
  items: InventoryItem[];
  selectedItemId: string | null;
  onSelectItem: (itemId: string) => void;
}

export default function InventoryTable({ items, selectedItemId, onSelectItem }: InventoryTableProps) {
  return (
    <div className="max-w-full overflow-x-auto rounded-lg border border-[#e2e3dc]">
      <table className="w-full min-w-[900px] table-fixed text-left text-sm">
        <thead className="bg-[#f3f4ed] text-xs uppercase tracking-[0.06em] text-[#42493f]">
          <tr>
            <th className="w-[23%] px-3 py-3">Producto</th>
            <th className="w-[19%] px-3 py-3">Negocio</th>
            <th className="w-[13%] px-3 py-3">Categoria</th>
            <th className="w-[13%] px-3 py-3">Stock</th>
            <th className="w-[11%] px-3 py-3">Estado</th>
            <th className="w-[12%] px-3 py-3">Marketplace</th>
            <th className="w-[6%] px-3 py-3">Com.</th>
            <th className="w-[3%] px-3 py-3 text-right">Accion</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const isSelected = item.id === selectedItemId;
            const marketplace = marketplaceLabels[item.marketplaceStatus];
            return (
              <tr
                key={item.id}
                onClick={() => onSelectItem(item.id)}
                className={`cursor-pointer border-t border-[#e8e9e2] transition hover:bg-[#f9faf3] ${
                  isSelected ? "bg-[#f3f4ed]" : "bg-white"
                }`}
              >
                <td className="px-3 py-2.5">
                  <p className="truncate font-semibold text-[#1a1c18]">{item.name}</p>
                  <p className="truncate text-xs text-[#42493f]">{item.sku}</p>
                </td>
                <td className="px-3 py-2.5">
                  <p className="truncate font-semibold text-[#1a1c18]">{item.businessName}</p>
                  <p className="truncate text-xs text-[#42493f]">{item.ownerName}</p>
                </td>
                <td className="px-3 py-2.5 text-[#42493f]">
                  <span className="block truncate">{categoryLabels[item.category]}</span>
                </td>
                <td className="px-3 py-2.5">
                  <p className="truncate font-semibold text-[#1a1c18]">
                    {item.quantity} {item.unit}
                  </p>
                  <p className="text-xs text-[#42493f]">{item.pendingOrders} pedidos</p>
                </td>
                <td className="px-3 py-2.5">
                  <InventoryStatusBadge status={item.status} />
                </td>
                <td className="px-3 py-2.5">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${marketplace.className}`}>
                    {marketplace.label}
                  </span>
                </td>
                <td className="px-3 py-2.5 font-semibold text-[#1a1c18]">{item.commissionRate}%</td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      aria-label={`Ver detalle de ${item.name}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        onSelectItem(item.id);
                      }}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#c2c9bc] bg-white text-[#42493f] hover:bg-[#f3f4ed]"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
          {items.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-3 py-8 text-center text-sm text-[#42493f]">
                No se encontraron productos con los filtros actuales.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
