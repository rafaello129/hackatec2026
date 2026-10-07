import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import type { ProxyRecommendation } from "../hooks/useProxyHome";

export default function ProxyAssistantPanel({ recommendations }: { recommendations: ProxyRecommendation[] }) {
  return (
    <section className="rounded-[24px] border border-[#DDE4D8] bg-[linear-gradient(145deg,#FFFFFF_0%,#FBFCF8_58%,#F1F7E9_100%)] p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#7D8B81]">Asistente MÁAK</p>
          <h2 className="mt-1 text-lg font-semibold text-[#17231B]">Recomendaciones IA</h2>
          <p className="mt-1 text-[11px] leading-5 text-[#7B867E]">Prioridades sugeridas a partir de la operación simulada.</p>
        </div>
        <Link to="/ai-assistant" className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#287839]">
          Abrir <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-5 space-y-2.5">
        {recommendations.map((recommendation) => (
          <article key={recommendation.id} className="flex gap-3 rounded-[16px] border border-transparent bg-white/80 px-3.5 py-3 transition hover:border-[#E2E8DE]">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#E6F3C8] text-[#42610A]">
              <Sparkles className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#344039]">{recommendation.title}</p>
              <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-[#87918A]">{recommendation.description}</p>
              <p className="mt-1.5 text-[10px] font-semibold text-[#287839]">{recommendation.action}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
