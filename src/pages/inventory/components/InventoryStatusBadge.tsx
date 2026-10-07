import type { InventoryStatus } from "@/types/inventory.types";

const statusMap: Record<InventoryStatus, { label: string; className: string }> = {
  in_stock: { label: "Disponible", className: "bg-[#E6F3C8] text-[#42610A]" },
  low_stock: { label: "Por agotarse", className: "bg-[#FFF0D8] text-[#8C6213]" },
  out_of_stock: { label: "Agotado", className: "bg-[#FDE9E6] text-[#A54A42]" },
  reserved: { label: "Reservado", className: "bg-[#EEF2EA] text-[#607064]" },
  discontinued: { label: "Descontinuado", className: "bg-[#EEF2EA] text-[#607064]" },
};

export default function InventoryStatusBadge({ status }: { status: InventoryStatus }) {
  const mapped = statusMap[status];
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[9px] font-semibold ${mapped.className}`}>{mapped.label}</span>;
}
