import { ArrowUpRight, Sparkles } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import type { AssistantRecommendation } from "@/types/assistant.types";

const levelLabels: Record<AssistantRecommendation["priority"], string> = {
  low: "Baja",
  medium: "Media",
  high: "Alta",
};

const toneByPriority: Record<
  AssistantRecommendation["priority"],
  "neutral" | "success" | "warning" | "danger"
> = {
  low: "neutral",
  medium: "warning",
  high: "success",
};

export default function AssistantRecommendationPanel({
  recommendations,
}: {
  recommendations: AssistantRecommendation[];
}) {
  return (
    <section className="rounded-[24px] border border-[#E1E6DE] bg-white p-5">
      <div className="flex items-center gap-2.5">
        <span className="grid h-9 w-9 place-items-center rounded-[12px] bg-[#EAF4E6] text-[#135C2F]">
          <Sparkles className="h-4 w-4" />
        </span>
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#7A867E]">
            Sugerencias
          </p>
          <h2 className="mt-0.5 font-['Hanken_Grotesk'] text-[16px] font-semibold text-[#17231B]">
            Recomendaciones
          </h2>
        </div>
      </div>

      <div className="mt-4 space-y-2.5">
        {recommendations.slice(0, 3).map((recommendation) => (
          <article
            key={recommendation.id}
            className="group rounded-[17px] border border-[#E5E9E2] bg-[#F8FAF6] p-3.5 transition-all duration-200 hover:border-[#CBD8C6] hover:bg-white hover:shadow-[0_8px_20px_rgba(23,35,27,0.045)]"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-[11px] font-semibold leading-4 text-[#17231B]">
                  {recommendation.title}
                </p>
                <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-[#68736B]">
                  {recommendation.description}
                </p>
              </div>
              <StatusBadge
                label={`Prioridad ${levelLabels[recommendation.priority]}`}
                tone={toneByPriority[recommendation.priority]}
              />
            </div>

            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[9px] font-semibold uppercase tracking-[0.055em] text-[#718078]">
              <span>Impacto: {levelLabels[recommendation.impact]}</span>
              <span>Esfuerzo: {levelLabels[recommendation.effort]}</span>
            </div>

            <p className="mt-2 flex items-start gap-1.5 rounded-[11px] bg-white px-2.5 py-2 text-[9px] font-semibold leading-4 text-[#135C2F]">
              <ArrowUpRight className="mt-0.5 h-3 w-3 shrink-0" />
              {recommendation.suggestedAction}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
