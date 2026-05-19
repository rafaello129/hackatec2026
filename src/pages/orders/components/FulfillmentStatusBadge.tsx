import StatusBadge from "@/components/common/StatusBadge";
import type { FulfillmentStatus } from "@/types/order.types";

const statusMap: Record<FulfillmentStatus, { label: string; tone: "neutral" | "success" | "warning" | "danger" }> = {
  not_started: { label: "Sin iniciar", tone: "neutral" },
  picking: { label: "En surtido", tone: "warning" },
  packed: { label: "Empacado", tone: "success" },
  waiting_pickup: { label: "Esperando recolección", tone: "warning" },
  out_for_delivery: { label: "En entrega", tone: "success" },
  completed: { label: "Completado", tone: "success" },
  issue: { label: "Con incidencia", tone: "danger" },
};

export default function FulfillmentStatusBadge({ status }: { status: FulfillmentStatus }) {
  const mapped = statusMap[status];
  return <StatusBadge label={mapped.label} tone={mapped.tone} />;
}
