import { AlertTriangle } from "lucide-react";
import type { AssistantRiskAlert } from "@/types/assistant.types";

const severityStyles: Record<AssistantRiskAlert["severity"], string> = {
  info: "border-[#E1E6DE] bg-white",
  success: "border-[#D7E7D2] bg-[#EAF4E6]",
  warning: "border-[#F0D992] bg-[#FFF4D8]",
  critical: "border-[#F0CFCB] bg-[#FDF0EE]",
};

const iconStyles: Record<AssistantRiskAlert["severity"], string> = {
  info: "bg-[#F0F2ED] text-[#667169]",
  success: "bg-white text-[#2F873A]",
  warning: "bg-white text-[#986900]",
  critical: "bg-white text-[#D9564D]",
};

const moduleLabels: Record<AssistantRiskAlert["module"], string> = {
  customers: "Clientes",
  inventory: "Inventario",
  cooperatives: "Cooperativos",
  finance: "Finanzas",
  general: "General",
};

export default function AssistantRiskPanel({ risks }: { risks: AssistantRiskAlert[] }) {
  return (
    <section className="rounded-[24px] border border-[#E1E6DE] bg-white p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#7A867E]">
            Atención
          </p>
          <h2 className="mt-1 font-['Hanken_Grotesk'] text-[16px] font-semibold text-[#17231B]">
            Riesgos detectados
          </h2>
        </div>
        <span className="rounded-full bg-[#F2F4F0] px-2.5 py-1 text-[9px] font-semibold text-[#667169]">
          {risks.length} señales
        </span>
      </div>

      <div className="space-y-2.5">
        {risks.slice(0, 2).map((risk) => (
          <article key={risk.id} className={`rounded-[17px] border p-3.5 ${severityStyles[risk.severity]}`}>
            <div className="flex items-start gap-3">
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-[11px] ${iconStyles[risk.severity]}`}>
                <AlertTriangle className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="line-clamp-2 text-[11px] font-semibold leading-4 text-[#17231B]">
                    {risk.title}
                  </p>
                  <span className="rounded-full bg-white/85 px-2 py-0.5 text-[9px] font-semibold text-[#135C2F]">
                    {moduleLabels[risk.module]}
                  </span>
                </div>
                <p className="mt-1.5 line-clamp-2 text-[10px] leading-4 text-[#637067]">
                  {risk.description}
                </p>
                <p className="mt-2 rounded-[11px] bg-white/80 px-2.5 py-2 text-[9px] font-semibold leading-4 text-[#496050]">
                  Recomendación: {risk.recommendation}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
