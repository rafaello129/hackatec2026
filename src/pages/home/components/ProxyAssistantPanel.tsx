import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import type { ProxyRecommendation } from "../hooks/useProxyHome";

interface ProxyAssistantPanelProps {
  recommendations: ProxyRecommendation[];
}

export default function ProxyAssistantPanel({ recommendations }: ProxyAssistantPanelProps) {
  return (
    <SectionCard
      title="Recomendaciones IA"
      actions={
        <Link to="/ai-assistant" className="inline-flex items-center gap-1 text-sm font-semibold text-[#4F7302] hover:text-[#3E5902]">
          Abrir
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      }
    >
      <div className="space-y-2">
        {recommendations.map((recommendation) => (
          <article key={recommendation.id} className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
            <div className="mb-1 flex items-center gap-2">
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#D6D979] text-[#3E5902]">
                <Sparkles className="h-4 w-4" />
              </span>
              <p className="text-sm font-semibold text-[#1a1c18]">{recommendation.title}</p>
            </div>
            <p className="line-clamp-2 text-xs leading-5 text-[#42493f]">{recommendation.description}</p>
            <p className="mt-2 text-xs font-semibold text-[#4F7302]">{recommendation.action}</p>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}
