import { Link } from "react-router-dom";
import { ArrowUpRight, Circle } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import type { HomeTimelineItem } from "../hooks/useProxyHome";

interface HomeOperationsTimelineProps {
  items: HomeTimelineItem[];
  formatDate: (dateISO: string) => string;
}

const sourceClass: Record<HomeTimelineItem["source"], string> = {
  Negocios: "bg-[#D6D979] text-[#3E5902]",
  Pedidos: "bg-[#fff2cc] text-[#7a5d00]",
  Inventario: "bg-[#e8e9e2] text-[#42493f]",
};

export default function HomeOperationsTimeline({ items, formatDate }: HomeOperationsTimelineProps) {
  return (
    <SectionCard
      title="Timeline operativo"
      actions={
        <Link to="/businesses" className="inline-flex items-center gap-1 text-sm font-semibold text-[#4F7302] hover:text-[#3E5902]">
          Operacion
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      }
    >
      <ol className="space-y-3">
        {items.map((item) => (
          <li key={item.id} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
            <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#f3f4ed] text-[#4F7302]">
              <Circle className="h-3 w-3 fill-current" />
            </span>
            <div className="min-w-0 rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
              <div className="mb-1 flex items-center justify-between gap-2">
                <p className="truncate text-sm font-semibold text-[#1a1c18]">{item.title}</p>
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${sourceClass[item.source]}`}>{item.source}</span>
              </div>
              <p className="line-clamp-2 text-xs leading-5 text-[#42493f]">{item.description}</p>
              <p className="mt-1 text-xs text-[#42493f]">{formatDate(item.date)}</p>
            </div>
          </li>
        ))}
      </ol>
    </SectionCard>
  );
}
