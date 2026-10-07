import type { BusinessStatus } from "@/types/business.types";

const styles: Record<BusinessStatus, { label: string; className: string }> = {
  active: { label: "Activo", className: "bg-[#E6F3C8] text-[#42610A]" },
  onboarding: { label: "En incorporación", className: "bg-[#EEF2EA] text-[#607064]" },
  needs_attention: { label: "Requiere atención", className: "bg-[#FFF0D8] text-[#8C6213]" },
  paused: { label: "Pausado", className: "bg-[#FFF0D8] text-[#8C6213]" },
  inactive: { label: "Inactivo", className: "bg-[#EEF2EA] text-[#607064]" },
};

export default function BusinessStatusBadge({ status }: { status: BusinessStatus }) {
  const mapped = styles[status];
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[9px] font-semibold ${mapped.className}`}>{mapped.label}</span>;
}
