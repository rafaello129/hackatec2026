import type { FulfillmentStatus } from "@/types/order.types";

const statusMap: Record<FulfillmentStatus, { label: string; className: string }> = {
  not_started: { label: "Sin iniciar", className: "bg-[#EEF2EA] text-[#607064]" },
  picking: { label: "En surtido", className: "bg-[#FFF0D8] text-[#8C6213]" },
  packed: { label: "Empacado", className: "bg-[#E6F3C8] text-[#42610A]" },
  waiting_pickup: { label: "Esperando", className: "bg-[#FFF0D8] text-[#8C6213]" },
  out_for_delivery: { label: "En entrega", className: "bg-[#E6F3C8] text-[#42610A]" },
  completed: { label: "Completado", className: "bg-[#E6F3C8] text-[#42610A]" },
  issue: { label: "Incidencia", className: "bg-[#FDE9E6] text-[#A54A42]" },
};

export default function FulfillmentStatusBadge({ status }: { status: FulfillmentStatus }) {
  const mapped = statusMap[status];
  return <span className={`inline-flex rounded-full px-2 py-0.5 text-[8.5px] font-semibold ${mapped.className}`}>{mapped.label}</span>;
}
