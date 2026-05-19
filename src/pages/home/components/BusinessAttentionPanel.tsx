import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import StatusBadge from "@/components/common/StatusBadge";
import type { BusinessStatus, IntermediatedBusiness } from "@/types/business.types";

const statusMap: Record<BusinessStatus, { label: string; tone: "neutral" | "success" | "warning" | "danger" }> = {
  active: { label: "Activo", tone: "success" },
  onboarding: { label: "Onboarding", tone: "neutral" },
  needs_attention: { label: "Atencion", tone: "warning" },
  paused: { label: "Pausado", tone: "warning" },
  inactive: { label: "Inactivo", tone: "neutral" },
};

interface BusinessAttentionPanelProps {
  businesses: IntermediatedBusiness[];
  formatCurrency: (value: number) => string;
}

const getReason = (business: IntermediatedBusiness) => {
  if (business.status === "needs_attention") return "Requiere seguimiento operativo";
  if (business.status === "onboarding") return "Onboarding incompleto";
  if (business.pendingPayout > 0) return "Liquidacion pendiente";
  return "Pedidos acumulados";
};

export default function BusinessAttentionPanel({ businesses, formatCurrency }: BusinessAttentionPanelProps) {
  return (
    <SectionCard
      title="Negocios con atencion"
      actions={
        <Link to="/businesses" className="inline-flex items-center gap-1 text-sm font-semibold text-[#4F7302] hover:text-[#3E5902]">
          Revisar
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      }
    >
      <div className="space-y-2">
        {businesses.map((business) => {
          const status = statusMap[business.status];
          return (
            <article key={business.id} className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#1a1c18]">{business.name}</p>
                  <p className="text-xs text-[#42493f]">{getReason(business)}</p>
                </div>
                <StatusBadge label={status.label} tone={status.tone} />
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-[#42493f]">
                <span>{business.pendingOrders} pedidos</span>
                <span className="text-right">{formatCurrency(business.monthlySales)}</span>
              </div>
            </article>
          );
        })}
      </div>
    </SectionCard>
  );
}
