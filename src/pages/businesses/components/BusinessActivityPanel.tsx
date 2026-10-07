import { ClipboardList, PackageCheck, RefreshCw, WalletCards } from "lucide-react";
import type { BusinessActivity } from "@/types/business.types";

const iconMap: Record<BusinessActivity["type"], typeof ClipboardList> = {
  order_received: ClipboardList,
  inventory_updated: RefreshCw,
  payout_pending: WalletCards,
  onboarding_task: PackageCheck,
  needs_followup: RefreshCw,
  product_published: PackageCheck,
};

export default function BusinessActivityPanel({ activities }: { activities: BusinessActivity[] }) {
  return (
    <section className="rounded-[22px] border border-[#E3E7DF] bg-white p-5">
      <div>
        <h2 className="text-[15px] font-semibold text-[#172019]">Actividad reciente</h2>
        <p className="mt-1 text-[11px] text-[#7B867E]">Últimos movimientos del integrante seleccionado.</p>
      </div>

      <div className="mt-4 divide-y divide-[#EEF0EB]">
        {activities.slice(0, 4).map((activity) => {
          const Icon = iconMap[activity.type];
          return (
            <article key={activity.id} className="flex gap-3 py-3 first:pt-0 last:pb-0">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#E6F1E4] text-[#135C2F]">
                <Icon className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="line-clamp-1 text-[11px] font-semibold text-[#2B352F]">{activity.title}</p>
                  <span className="shrink-0 text-[9px] text-[#929C95]">{activity.date}</span>
                </div>
                <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-[#7B867E]">{activity.description}</p>
                <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.06em] text-[#929C95]">{activity.responsible}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
