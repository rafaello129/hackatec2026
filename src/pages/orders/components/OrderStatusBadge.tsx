import StatusBadge from "@/components/common/StatusBadge";
import type { OrderStatus } from "@/types/order.types";

const statusMap: Record<OrderStatus, { label: string; tone: "neutral" | "success" | "warning" | "danger" }> = {
  new: { label: "Nuevo", tone: "warning" },
  confirmed: { label: "Confirmado", tone: "neutral" },
  preparing: { label: "En preparación", tone: "warning" },
  ready_for_delivery: { label: "Listo para entrega", tone: "success" },
  in_delivery: { label: "En reparto", tone: "success" },
  delivered: { label: "Entregado", tone: "success" },
  canceled: { label: "Cancelado", tone: "danger" },
};

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const mapped = statusMap[status];
  return <StatusBadge label={mapped.label} tone={mapped.tone} />;
}
