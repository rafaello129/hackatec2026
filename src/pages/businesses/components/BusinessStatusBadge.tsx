import StatusBadge from "@/components/common/StatusBadge";
import type { BusinessStatus } from "@/types/business.types";

const statusMap: Record<BusinessStatus, { label: string; tone: "neutral" | "success" | "warning" | "danger" }> = {
  active: { label: "Activo", tone: "success" },
  onboarding: { label: "En onboarding", tone: "neutral" },
  needs_attention: { label: "Requiere atención", tone: "warning" },
  paused: { label: "Pausado", tone: "warning" },
  inactive: { label: "Inactivo", tone: "neutral" },
};

export default function BusinessStatusBadge({ status }: { status: BusinessStatus }) {
  const mapped = statusMap[status];
  return <StatusBadge label={mapped.label} tone={mapped.tone} />;
}
