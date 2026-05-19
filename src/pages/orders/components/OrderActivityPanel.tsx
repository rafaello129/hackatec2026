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
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Actividad reciente</h2>
        <span className="rounded-full bg-[#e8e9e2] px-2.5 py-1 text-xs font-semibold text-[#42493f]">{activities.length}</span>
      </div>
      <div className="space-y-2.5">
        {activities.map((activity) => {
          const Icon = iconMap[activity.type];
          return (
            <article key={activity.id} className="flex gap-3 rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-[#D6D979] text-[#3E5902]">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <p className="line-clamp-1 text-sm font-semibold text-[#1a1c18]">{activity.title}</p>
                  <span className="shrink-0 text-[11px] font-semibold text-[#73796e]">{activity.date}</span>
                </div>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#42493f]">{activity.description}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#73796e]">{activity.responsible}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
