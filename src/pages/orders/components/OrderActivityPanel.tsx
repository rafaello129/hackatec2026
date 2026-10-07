import { AlertTriangle, CheckCircle2, ClipboardList, CreditCard, PackageCheck, Truck } from "lucide-react";
import type { OrderActivity } from "@/types/order.types";

const iconMap: Record<OrderActivity["type"], typeof ClipboardList> = {
  order_created: ClipboardList,
  payment_received: CreditCard,
  inventory_reserved: PackageCheck,
  status_changed: PackageCheck,
  delivery_assigned: Truck,
  issue_reported: AlertTriangle,
  delivered: CheckCircle2,
};

export default function OrderActivityPanel({ activities }: { activities: OrderActivity[] }) {
  return (
    <article className="rounded-[22px] border border-[#E3E7DF] bg-white p-5">
      <div>
        <h2 className="text-[15px] font-semibold text-[#172019]">Actividad reciente</h2>
        <p className="mt-1 text-[11px] text-[#7B867E]">Últimos movimientos del pedido o de la operación.</p>
      </div>

      <div className="mt-4 divide-y divide-[#EEF0EB]">
        {activities.slice(0, 5).map((activity) => {
          const Icon = iconMap[activity.type];
          const issue = activity.type === "issue_reported";
          return (
            <article key={activity.id} className="flex gap-3 py-3 first:pt-0 last:pb-0">
              <span className={issue ? "grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#FDE9E6] text-[#A54A42]" : "grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#E6F1E4] text-[#135C2F]"}>
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
    </article>
  );
}
