import StatusBadge from "@/components/common/StatusBadge";
import type { PaymentStatus } from "@/types/order.types";

const statusMap: Record<PaymentStatus, { label: string; tone: "neutral" | "success" | "warning" | "danger" }> = {
  pending: { label: "Pendiente", tone: "warning" },
  paid: { label: "Pagado", tone: "success" },
  partial: { label: "Parcial", tone: "warning" },
  overdue: { label: "Vencido", tone: "danger" },
  refunded: { label: "Reembolsado", tone: "neutral" },
};

export default function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const mapped = statusMap[status];
  return <StatusBadge label={mapped.label} tone={mapped.tone} />;
}
