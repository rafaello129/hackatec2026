import { Link } from "react-router-dom";
import { ArrowRight, Building2 } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import type { BusinessStatus, IntermediatedBusiness } from "@/types/business.types";

const statusMap: Record<BusinessStatus, { label: string; tone: "neutral" | "success" | "warning" | "danger" }> = {
  active: { label: "Activo", tone: "success" },
  onboarding: { label: "Onboarding", tone: "neutral" },
  needs_attention: { label: "Atención", tone: "warning" },
  paused: { label: "Pausado", tone: "warning" },
  inactive: { label: "Inactivo", tone: "neutral" },
};

const getReason = (business: IntermediatedBusiness) => {
  if (business.status === "needs_attention") return "Requiere seguimiento operativo";
  if (business.status === "onboarding") return "Onboarding incompleto";
  if (business.pendingPayout > 0) return "Liquidación pendiente";
  return "Pedidos acumulados";
};

export default function BusinessAttentionPanel({
  businesses,
  formatCurrency,
}: {
  businesses: IntermediatedBusiness[];
  formatCurrency: (value: number) => string;
}) {
  return (
    <section className="rounded-[24px] border border-[#DDE4D8] bg-[linear-gradient(145deg,#FFFFFF_0%,#FBFCF8_58%,#F1F7E9_100%)] p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#7D8B81]">Estado de la red</p>
          <h2 className="mt-1 text-lg font-semibold text-[#17231B]">Negocios con atención</h2>
          <p className="mt-1 text-[11px] leading-5 text-[#7B867E]">Señales que requieren seguimiento operativo.</p>
        </div>
        <Link to="/businesses" className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#287839]">
          Revisar <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-5 space-y-2.5">
        {businesses.map((business) => {
          const status = statusMap[business.status];
          return (
            <article key={business.id} className="flex items-center gap-3 rounded-[16px] border border-transparent bg-white/80 px-3.5 py-3 transition hover:border-[#E2E8DE]">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#EDF4E8] text-[#2E7439]">
                <Building2 className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-[#344039]">{business.name}</p>
                <p className="mt-0.5 text-[10px] text-[#87918A]">{getReason(business)}</p>
                <p className="mt-1 text-[10px] font-medium text-[#607064]">
                  {business.pendingOrders} pedidos · {formatCurrency(business.monthlySales)}
                </p>
              </div>
              <StatusBadge label={status.label} tone={status.tone} />
            </article>
          );
        })}
      </div>
    </section>
  );
}
