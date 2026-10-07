import { Link } from "react-router-dom";
import { ArrowRight, Circle } from "lucide-react";
import type { HomeTimelineItem } from "../hooks/useProxyHome";

const sourceClass: Record<HomeTimelineItem["source"], string> = {
  Negocios: "bg-[#E6F3C8] text-[#42610A]",
  Pedidos: "bg-[#FFF0D8] text-[#8C6213]",
  Inventario: "bg-[#EEF2EA] text-[#607064]",
};

export default function HomeOperationsTimeline({
  items,
  formatDate,
}: {
  items: HomeTimelineItem[];
  formatDate: (dateISO: string) => string;
}) {
  return (
    <section className="rounded-[24px] border border-[#E2E6DF] bg-white p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-[#17231B]">Actividad reciente</h2>
          <p className="mt-1 text-[11px] text-[#87918A]">Movimientos recientes de negocios, pedidos e inventario.</p>
        </div>
        <Link to="/businesses" className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#287839]">
          Operación <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <ol className="mt-5 grid gap-x-8 md:grid-cols-2">
        {items.slice(0, 6).map((item) => (
          <li key={item.id} className="flex items-center gap-3 border-b border-[#EEF0EB] py-3.5 first:pt-0">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#EDF4E8] text-[#2E7439]">
              <Circle className="h-3 w-3 fill-current" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-xs font-semibold text-[#344039]">{item.title}</p>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold ${sourceClass[item.source]}`}>
                  {item.source}
                </span>
              </div>
              <p className="mt-0.5 line-clamp-1 text-[10.5px] text-[#838C86]">{item.description}</p>
              <p className="mt-1 text-[9.5px] text-[#919A94]">{formatDate(item.date)}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
