import type { OrderStatus } from "@/types/order.types";

const statusMap: Record<OrderStatus, { label: string; className: string }> = {
  new: { label: "Nuevo", className: "bg-[#FFF0D8] text-[#8C6213]" },
  confirmed: { label: "Confirmado", className: "bg-[#EEF2EA] text-[#607064]" },
  preparing: { label: "En preparación", className: "bg-[#FFF0D8] text-[#8C6213]" },
  ready_for_delivery: { label: "Listo", className: "bg-[#E6F3C8] text-[#42610A]" },
  in_delivery: { label: "En reparto", className: "bg-[#E6F3C8] text-[#42610A]" },
  delivered: { label: "Entregado", className: "bg-[#E6F3C8] text-[#42610A]" },
  canceled: { label: "Cancelado", className: "bg-[#FDE9E6] text-[#A54A42]" },
};

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const mapped = statusMap[status];
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[9px] font-semibold ${mapped.className}`}>{mapped.label}</span>;
}
