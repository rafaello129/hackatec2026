import type { PaymentStatus } from "@/types/order.types";

const statusMap: Record<PaymentStatus, { label: string; className: string }> = {
  pending: { label: "Pendiente", className: "bg-[#FFF0D8] text-[#8C6213]" },
  paid: { label: "Pagado", className: "bg-[#E6F3C8] text-[#42610A]" },
  partial: { label: "Parcial", className: "bg-[#FFF0D8] text-[#8C6213]" },
  overdue: { label: "Vencido", className: "bg-[#FDE9E6] text-[#A54A42]" },
  refunded: { label: "Reembolsado", className: "bg-[#EEF2EA] text-[#607064]" },
};

export default function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const mapped = statusMap[status];
  return <span className={`inline-flex rounded-full px-2 py-0.5 text-[8.5px] font-semibold ${mapped.className}`}>{mapped.label}</span>;
}
